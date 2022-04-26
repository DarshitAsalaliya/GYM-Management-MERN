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

        // Save Trainer
        const newTrainer = new TrainerModel({ ...req.body, ownerprofileid: req.user.id, image: { public_id: uploadResult.public_id, image_url: uploadResult.secure_url } });
        await newTrainer.save();
        const token = await newTrainer.generateAuthToken();

        return res.status(201).send({ newTrainer, token });
    } catch (e) {
        // Delete Uploaded File
        fs.unlink('./public/trainerimages/' + req.file.filename, (err) => { });

        // Delete Uploaded File From Cloudinary
        await cloudinary.v2.uploader.destroy('trainerimages/' + req.file.filename);

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