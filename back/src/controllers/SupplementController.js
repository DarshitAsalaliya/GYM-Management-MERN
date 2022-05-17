var fs = require('fs');
const cloudinary = require('cloudinary');

// Model
const SupplementModel = require('../models/SupplementModel');

// Util
const { checkParameters } = require('../middleware/utils');

// API Using Async Await

// Create New Supplement
exports.CreateSupplement = async (req, res) => {
    try {
       
        if (req.file) {
           
            // Upload Image To Cloudinary
            const uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'supplementimages',
                public_id: req.file.filename,
                crop: "fit",
                allowedFormats: ['jpg', 'jpeg', 'png']
            }, (e) => {
                if (e) {
                    throw new Error(e.message);
                }
            });
            // Save Member with Image
            newSupplementObj = new SupplementModel({ ...req.body, ownerprofileid: req.user.id, image: { public_id: uploadResult.public_id, image_url: uploadResult.secure_url } });
        }
        else {
            // Save Member
            newSupplementObj = new SupplementModel({ ...req.body, ownerprofileid: req.user.id });
        }

        const newSupplement = newSupplementObj;
        await newSupplement.save();

        return res.status(201).send(newSupplement);

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
                await cloudinary.v2.uploader.destroy('supplementimages/' + req.file.filename);

                return res.status(400).send({ error: e.message });
            }
        }
        catch (er) {
            return res.status(400).send({ error: er.message });
        }
    }
}

// Update Supplement
exports.UpdateSupplement = async (req, res) => {
    try {
        const _id = req.params.id;

        //Find Post For Update
        const data = await SupplementModel.findById(_id);

        if (!data)
            return res.status(404).send({ error: "Not Found.." });

        if (req.file) {

            // Delete Existing Image From Cloudinary
            data.image.public_id && await cloudinary.v2.uploader.destroy(data.image.public_id);

            // Upload New Image To Cloudinary
            const uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'supplementimages',
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
                await cloudinary.v2.uploader.destroy('supplementimages/' + req.file.filename);

                return res.status(400).send({ error: e.message });
            }
        }
        catch (er) {
            return res.status(400).send({ error: er.message });
        }
    }
}

// Delete Supplement
exports.DeleteSupplement = async (req, res) => {
    try {
        const data = await SupplementModel.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).send({ error: "Supplement Not Found.." });
        }

        // Delete Uploaded File From Cloudinary
        await cloudinary.v2.uploader.destroy('supplementimages/' + data.image);

        // Delete Uploaded Files From Local Folder
        fs.unlink('./public/images/' + data.image, (err) => { });

        return res.status(200).send(data);
    }
    catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Get All Supplements
exports.GetSupplementList = async (req, res) => {
    try {
        const SupplementList = await SupplementModel.find();

        // Check Supplement Length
        if (SupplementList.length === 0) {
            return res.status(404).send({ error: "Supplement not found.." });
        }

        return res.status(200).send(SupplementList);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}