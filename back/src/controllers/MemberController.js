var fs = require('fs');
const cloudinary = require('cloudinary');

// Model
const MemberModel = require('../models/MemberModel');

// Util
const { checkParameters } = require('../middleware/utils');

// API Using Async Await

// Registration
exports.Registration = async (req, res) => {
    try {
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

        // Save Member
        const newMember = new MemberModel({ ...req.body, ownerprofileid: req.user.id, image: { public_id: uploadResult.public_id, image_url: uploadResult.secure_url } });
        await newMember.save();
        const token = await newMember.generateAuthToken();

        return res.status(201).send({ newMember, token });
    } catch (e) {

        try {
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
                $match:
                {
                    'status': true
                }
            },
            {
                $lookup: {
                    from: "TrainerProfile",
                    localField: "trainerprofileid",
                    foreignField: "_id",
                    as: "trainer",
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