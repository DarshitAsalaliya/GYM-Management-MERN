var fs = require('fs');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

// Model
const MemberModel = require('../models/MemberModel');

// Util
const { checkParameters } = require('../middleware/utils');

// API Using Async Await

// Registration
exports.Registration = async (req, res) => {
    try {

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
        return res.status(201).send({ newMember, token });

    } catch (e) {

        try {
            if (req.file) {

                // Delete Uploaded File
                fs.unlink('./public/memberimages/' + req.file.filename, (err) => {
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
        ])

        // Check Topic Length
        if (memberList.length === 0) {
            return res.status(404).send({ error: "Member not found.." });
        }

        return res.status(200).send(memberList);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Get All Member
exports.GetMemberListByTrainer = async (req, res) => {
    try {

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
        ])

        // Check Topic Length
        if (memberList.length === 0) {
            return res.status(404).send({ error: "Member not found.." });
        }

        return res.status(200).send(memberList);
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
            data.image.public_id && await cloudinary.v2.uploader.destroy(data.image.public_id);

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
                fs.unlink('./public/memberimages/' + req.file.filename, (err) => {
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
        await cloudinary.v2.uploader.destroy('memberimages/' + data.image);

        // Delete Uploaded Files From Local Folder
        fs.unlink('./public/memberimages/' + data.image, (err) => { });

        return res.status(200).send(data);
    }
    catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Profile

exports.MemberProfile = async (req, res) => {
    const _id = req.user.id;

    try {
        const data = await MemberModel.findById(_id);

        if (!data) {
            return res.status(404).send('Not Found..');
        }

        const newObject = data.toObject();

        delete newObject.password;
        delete newObject.tokens;

        res.status(200).send(newObject);
    } catch (e) {
        res.status(500).send({ error: e.message });
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