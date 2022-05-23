var fs = require('fs');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

// Model
const MemberModel = require('../models/MemberModel');
const OtpModel = require('../models/OtpModel');
const NotificationModel = require('../models/NotificationModel');

// Util
const { checkParameters, sendCredentialMail, sendOtpMail } = require('../middleware/utils');

// API Using Async Await

// Registration
exports.Registration = async (req, res) => {
    try {

        // Check File
        if (req.file) {

            // Upload Image To Cloudinary
            const uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'memberimages',
                public_id: req.file.filename,
                crop: "fit",
                allowedFormats: ['jpg', 'jpeg', 'png']
            }, (e) => {
                if (e) {
                    throw new Error(e.message);
                }
            });

            // Save Member with Image
            newMemberObj = new MemberModel({ ...req.body, ownerprofileid: req.user.id, image: { public_id: uploadResult.public_id, image_url: uploadResult.secure_url } });
        }
        else {
            // Save Member
            newMemberObj = new MemberModel({ ...req.body, ownerprofileid: req.user.id });
        }

        const newMember = newMemberObj;
        await newMember.save();
        const token = await newMember.generateAuthToken();
        sendCredentialMail(req.body.email, req.body.password);

        // Add Notification
        const newNotification = new NotificationModel({ notificationcontent: req.body.name + ' has joined the GYM.', ownerprofileid: req.user.id });
        newNotification.save();

        return res.status(201).send({ newMember, token });

    } catch (e) {

        try {
            if (req.file) {

                // Delete Uploaded File
                fs.unlink('./public/images/' + req.file.filename, (err) => {
                    if (err) {
                        throw new Error(err.message);
                    }
                });

                // Delete Uploaded File From Cloudinary
                await cloudinary.v2.uploader.destroy('memberimages/' + req.file.filename);

                return res.status(400).send({ error: e.message });
            }
        }
        catch (er) {
            return res.status(400).send({ error: er.message });
        }
        return res.status(400).send({ error: e.message });
    }
}

// Login GenerateToken
exports.Login = async (req, res) => {
    try {

        if (!checkParameters(req.body, ['email', 'password'])) {
            return res.status(400).send({ error: 'Invalid Parameters..' });
        }

        const user = await MemberModel.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        return res.send({ user: await user.getPublicProfile(), token });
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Get All Member
exports.GetAllMember = async (req, res) => {
    try {

        // Pagination
        let { page, size } = req.query;

        if (!page)
            page = 1;
        if (!size)
            size = 5;

        const limit = parseInt(size);
        const skip = (page - 1) * size;

        const memberList = await MemberModel.aggregate([
            {
                $lookup: {
                    from: "TrainerProfile",
                    localField: "trainerprofileid",
                    foreignField: "_id",
                    as: "trainer",
                },

            },
            {
                $lookup: {
                    from: "Invoice",
                    localField: "_id",
                    foreignField: "memberprofileid",
                    as: "invoices",
                },
            }
        ]).skip(skip).limit(limit);

        // Check Topic Length
        if (memberList.length === 0) {
            return res.status(404).send({ error: "Member not found.." });
        }

        const totalRecord = await MemberModel.find().count();

        return res.status(200).send({ memberList, totalRecord });
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Get Members By Trainer
exports.GetMemberListByTrainer = async (req, res) => {
    try {

        // Pagination
        let { page, size } = req.query;

        if (!page)
            page = 1;
        if (!size)
            size = 5;

        const limit = parseInt(size);
        const skip = (page - 1) * size;

        if (req.params.trainerprofileid) {
            id = req.params.trainerprofileid
        }
        else {
            id = req.user._id
        }

        const memberList = await MemberModel.aggregate([
            {
                $match:
                {
                    trainerprofileid: id
                }
            },
            {
                $lookup: {
                    from: "TrainerProfile",
                    localField: "trainerprofileid",
                    foreignField: "_id",
                    as: "trainer",
                },

            },
            {
                $lookup: {
                    from: "Invoice",
                    localField: "_id",
                    foreignField: "memberprofileid",
                    as: "invoices",
                },
            }
        ]).skip(skip).limit(limit);

        // Check Topic Length
        if (memberList.length === 0) {
            return res.status(404).send({ error: "Member not found.." });
        }
        const totalRecord = await MemberModel.find({ trainerprofileid: id }).count();

        return res.status(200).send({ memberList, totalRecord });
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Update Member
exports.UpdateMember = async (req, res) => {
    try {
        const _id = req.params.id;

        //Find Post For Update
        const data = await MemberModel.findById(_id);

        if (!data)
            return res.status(404).send({ error: "Not Found.." });

        if (req.file) {

            // Delete Existing Image From Cloudinary
            data.image.public_id && await cloudinary.v2.uploader.destroy(data.image?.public_id);

            // Upload New Image To Cloudinary
            const uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'memberimages',
                public_id: req.file.filename,
                crop: "fit",
                allowedFormats: ['jpg', 'jpeg', 'png']
            }, (e) => {
                if (e) {
                    throw new Error(e.message);
                }
            });

            data.image = { public_id: uploadResult.public_id, image_url: uploadResult.secure_url };
        }

        Object.keys(req.body).forEach((update) => {
            data[update] = req.body[update];
        });

        await data.save();

        return res.status(200).send(data);

    } catch (e) {

        try {
            if (req.file) {

                // Delete Uploaded File
                fs.unlink('./public/images/' + req.file.filename, (err) => {
                    if (err) {
                        throw new Error(err.message);
                    }
                });

                // Delete Uploaded File From Cloudinary
                await cloudinary.v2.uploader.destroy('memberimages/' + req.file.filename);

                return res.status(400).send({ error: e.message });
            }
        }
        catch (er) {
            return res.status(400).send({ error: er.message });
        }
    }
}

// Delete Member
exports.DeleteMember = async (req, res) => {
    try {
        const data = await MemberModel.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).send({ error: "Member Not Found.." });
        }

        // Delete Uploaded File From Cloudinary
        await cloudinary.v2.uploader.destroy(data.image?.public_id);

        // Delete Uploaded Files From Local Folder
        fs.unlink('./public/images/' + data.image?.public_id.split('/')[1], (err) => { });

        // Add Notification
        const newNotification = new NotificationModel({ notificationcontent: data.name + ' has left the GYM.', ownerprofileid: req.user.id });
        newNotification.save();

        return res.status(200).send(data);
    }
    catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Profile

exports.MemberProfile = async (req, res) => {
    try {
        const _id = req.user.id;
        const data = await MemberModel.findById(_id);

        if (!data) {
            return res.status(404).send('Not Found..');
        }

        const newObject = data.toObject();

        newObject.type = 'Member';

        delete newObject.password;
        delete newObject.tokens;

        return res.status(200).send(newObject);
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
};

// Logout
exports.Logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((obj) => {
            return obj.token !== req.token;
        });

        await req.user.save();
        return res.status(200).send();
    }
    catch (e) {
        return res.status(500).send({ error: e.message });
    }
}

// Change Password
exports.ChangePassword = async (req, res) => {
    try {
        const user = await MemberModel.findByCredentials(req.body.email, req.body.password);
        user.password = req.body.newpassword;
        await user.save();
        return res.status(200).send({ data: "Password changed.." });
    } catch (e) {

        if (e.message = "Invalid User..") {
            return res.status(401).send({ error: 'Old Password is Wrong..' });
        }

        return res.status(400).send({ error: e.message });
    }
}

// Forgot Password
exports.ForgotPasswordSendOtp = async (req, res) => {
    try {
        const user = await MemberModel.find({ email: req.body.email });
        if (user.length === 0) {
            throw new Error("No result found! Please try again with other email.");
        }

        // Generate OTP
        var digits = "0123456789";
        let otp = "";
        for (let i = 0; i < 4; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }

        const newOtp = new OtpModel({ ...req.body, otp });
        sendOtpMail(req.body.email, otp);
        await newOtp.save();
        res.status(200).send({ data: newOtp.email });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
};

// Verify OTP & Change Password
exports.ChangePasswordAfterOtp = async (req, res) => {
    const data = await OtpModel.find({ otp: req.body.otp, email: req.body.email });

    // Check OTP
    if (data.length === 0) {
        res.status(400).send({ error: "Invalid OTP, Sorry.." });
    } else {
        const userData = await MemberModel.findOne({ email: req.body.email });

        // Generate Password
        var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var passwordLength = 6;
        var newpassword = "";

        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            newpassword += chars.substring(randomNumber, randomNumber + 1);
        }

        userData.password = newpassword;
        await userData.save();

        // Send Mail
        sendCredentialMail(req.body.email, newpassword);

        res.status(200).send({ data: "New password sent to your email.." });
    }
};