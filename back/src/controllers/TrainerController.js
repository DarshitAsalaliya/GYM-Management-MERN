var fs = require('fs');
const cloudinary = require('cloudinary');

// Model
const TrainerModel = require('../models/TrainerModel');

// Util
const { checkParameters } = require('../middleware/utils');

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