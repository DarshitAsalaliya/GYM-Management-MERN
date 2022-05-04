// Model
const MembershipModel = require('../models/MembershipModel');

// API Using Async Await

// Create New Membership
exports.CreateMembership = async (req, res) => {
    try {
        const newMembership = new MembershipModel({ ...req.body, ownerprofileid: req.user._id });
        await newMembership.save();
        return res.status(201).send(newMembership);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Get All Membership
exports.GetMembershipList = async (req, res) => {
    try {
        const membershipList = await MembershipModel.find();

        // Check Membership Length
        if (membershipList.length === 0) {
            return res.status(404).send({ error: "Membership not found.." });
        }

        return res.status(200).send(membershipList);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Update Membership
exports.UpdateMembership = async (req, res) => {
    try {

        const _id = req.params.id;

        //Find Membership For Update
        const data = await MembershipModel.findById(_id);

        if (!data)
            return res.status(404).send({ error: "Not Found.." });

        Object.keys(req.body).forEach((update) => {
            data[update] = req.body[update];
        });

        await data.save();

        return res.status(200).send(data);

    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Delete Membership
exports.DeleteMembership = async (req, res) => {
    try {
        const data = await MembershipModel.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).send({ error: "Membership Not Found.." });
        }

        return res.status(200).send(data);
    }
    catch (e) {
        return res.status(400).send({ error: e.message });
    }
}