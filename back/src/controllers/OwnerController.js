var fs = require('fs');
const cloudinary = require('cloudinary');

// Model
const OwnerModel = require('../models/OwnerModel');

// Util
const { checkParameters } = require('../middleware/utils');

// API Using Async Await

// Registration
exports.Registration = async (req, res) => {
    try {

        // Upload Image To Cloudinary
        const uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'ownerimages',
            public_id: req.file.filename,
            crop: "fit",
            allowedFormats: ['jpg', 'jpeg', 'png']
        }, (e) => {
            if (e) {
                throw new Error(e.message);
            }
        });

        // Save User
        const newOwner = new OwnerModel({ ...req.body, image: { public_id: uploadResult.public_id, image_url: uploadResult.secure_url } });
        await newOwner.save();
        const token = await newOwner.generateAuthToken();

        return res.status(201).send({ newOwner, token });
    } catch (e) {
        // Delete Uploaded File
        fs.unlink('./public/memberimages/' + req.file.filename, (err) => { });

        // Delete Uploaded File From Cloudinary
        await cloudinary.v2.uploader.destroy('ownerimages/' + req.file.filename);

        return res.status(400).send({ error: e.message });
    }
}

// Login GenerateToken
exports.Login = async (req, res) => {
    try {

        if (!checkParameters(req.body, ['email', 'password'])) {
            return res.status(400).send({ error: 'Invalid Parameters..' });
        }

        const user = await OwnerModel.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        return res.status(200).send({ user: await user.getPublicProfile(), token });
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

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

exports.AdminProfile = async (req, res) => {
    const _id = req.user.id;
    try {
        const data = await OwnerModel.findById(_id);

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

// Change Password
exports.ChangePassword = async (req, res) => {
    try {
        const user = await OwnerModel.findByCredentials(req.body.email, req.body.password);
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