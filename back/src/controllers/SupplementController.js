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
        //Map through images and create a promise array using cloudinary upload function
        let multiplePicturePromise = req.files.map((data) => {
            return cloudinary.v2.uploader.upload(data.path, {
                folder: 'supplementimages',
                public_id: data.filename,
                crop: "fit",
                allowedFormats: ['jpg', 'jpeg', 'png']
            }, (err) => {
                if (err) {
                    throw new Error(err.message);
                }
            });
        }
        );

        // Await all the cloudinary upload functions in promise.all
        let imageResponses = await Promise.all(multiplePicturePromise);

        const newSupplement = new SupplementModel({ ...req.body, ownerprofileid: req.user._id, images: imageResponses.map((data) => { return { public_id: data.public_id, image_url: data.secure_url } }) });
        await newSupplement.save();

        return res.status(201).send(newSupplement);

    } catch (e) {

        // Delete Uploaded Files
        req.files.forEach((data) => {
            fs.unlink('./public/supplementimages/' + data.filename, (err) => { });
        });

        // Delete Uploaded File From Cloudinary        
        //Map through images and create a promise array using cloudinary upload function
        let deleteMultiplePicturePromise = req.files.map((data) => {
            return cloudinary.v2.uploader.destroy('supplementimages/' + data.filename);
        }
        );

        // Await all the cloudinary upload functions in promise.all
        let imageResponses = await Promise.all(deleteMultiplePicturePromise);

        return res.status(400).send({ error: e.message });
    }
}

// Delete Supplement
exports.DeleteSupplement = async (req, res) => {
    try {
        const data = await SupplementModel.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).send({ error: "Supplement Not Found.." });
        }

        //Map through images and create a promise array using cloudinary upload function
        let multiplePicturePromise = data.images.map((d) => {
            return cloudinary.v2.uploader.destroy(d.public_id);
        }
        );

        // Await all the cloudinary upload functions in promise.all
        let imageResponses = await Promise.all(multiplePicturePromise);

        // Delete Uploaded Files From Local Folder
        data.images.forEach((d) => {
            fs.unlink('./public/' + d.public_id, (err) => { });
        });

        return res.status(200).send(data);
    }
    catch (e) {
        return res.status(400).send({ error: e.message });
    }
}