var fs = require('fs');
const cloudinary = require('cloudinary');

// Model
const TrainerModel = require('../models/TrainerModel');
const OtpModel = require('../models/OtpModel');

// Util
const { checkParameters, sendCredentialMail, sendOtpMail } = require('../middleware/utils');

// API Using Async Await

// Registration
exports.Registration = async (req, res) => {
    try {
        if (req.file) {
            // Upload Image To Cloudinary
            const uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'trainerimages',
                public_id: req.file.filename,
                crop: "fit",
                allowedFormats: ['jpg', 'jpeg', 'png']
            }, (e) => {
                if (e) {
                    throw new Error(e.message);
                }
            });
            // Save Trainer with Image
            newTrainerObj = new TrainerModel({ ...req.body, ownerprofileid: req.user.id, image: { public_id: uploadResult.public_id, image_url: uploadResult.secure_url } });
        }
        else {
            // Save Trainer
            newTrainerObj = new TrainerModel({ ...req.body, ownerprofileid: req.user.id });
        }

        // Save Trainer
        const newTrainer = newTrainerObj;
        await newTrainer.save();
        const token = await newTrainer.generateAuthToken();
        sendCredentialMail(req.body.email,req.body.password);
        return res.status(201).send({ newTrainer, token });

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
                await cloudinary.v2.uploader.destroy('trainerimages/' + req.file.filename);

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

        const user = await TrainerModel.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        return res.send({ user: await user.getPublicProfile(), token });
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Get All Trainer
exports.GetAllTrainer = async (req, res) => {
    try {
        const trainerList = await TrainerModel.find();

        // Check Topic Length
        if (trainerList.length === 0) {
            return res.status(404).send({ error: "Trainer not found.." });
        }

        return res.status(200).send(trainerList);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Get All Active Trainer
exports.GetAllActiveTrainer = async (req, res) => {
    try {
        const trainerList = await TrainerModel.find({ status: true });

        // Check Topic Length
        if (trainerList.length === 0) {
            return res.status(404).send({ error: "Trainer not found.." });
        }

        return res.status(200).send(trainerList);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Update Trainer
exports.UpdateTrainer = async (req, res) => {
    try {
        const _id = req.params.id;

        //Find Post For Update
        const data = await TrainerModel.findById(_id);

        if (!data)
            return res.status(404).send({ error: "Not Found.." });

        if (req.file) {

            // Delete Existing Image From Cloudinary
            data.image.public_id && await cloudinary.v2.uploader.destroy(data.image.public_id);

            // Upload New Image To Cloudinary
            const uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'trainerimages',
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
                await cloudinary.v2.uploader.destroy('trainerimages/' + req.file.filename);

                return res.status(400).send({ error: e.message });
            }
        }
        catch (er) {
            return res.status(400).send({ error: er.message });
        }
    }
}

// Delete Trainer
exports.DeleteTrainer = async (req, res) => {
    try {
        const data = await TrainerModel.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).send({ error: "Trainer Not Found.." });
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

exports.TrainerProfile = async (req, res) => {

    try {
        const _id = req.user.id;
        const data = await TrainerModel.findById(_id);

        if (!data) {
            return res.status(404).send('Not Found..');
        }

        const newObject = data.toObject();

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
        const user = await TrainerModel.findByCredentials(req.body.email, req.body.password);
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

exports.ForgotPasswordSendOtp = async (req, res) => {
    try {
        const user = await TrainerModel.find({ email: req.body.email });
        if (user.length === 0) {
            throw new Error("Trainer is not register with this email.");
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

exports.ChangePasswordAfterOtp = async (req, res) => {
    const data = await OtpModel.find({ otp: req.body.otp, email: req.body.email });
    if (data.length === 0) {
        res.status(400).send({ error: "Invalid OTP, Sorry.." });
    } else {
        const userData = await TrainerModel.findOne({ email: req.body.email });

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

        sendCredentialMail(req.body.email, newpassword);

        res.status(200).send({ data: "New password sent to your email.." });
    }
};