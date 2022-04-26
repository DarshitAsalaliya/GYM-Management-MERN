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
exports.GetAllMembership = async (req, res) => {
    try {
        const membershipList = await MembershipModel.find({ status: true });

        // Check Membership Length
        if (membershipList.length === 0) {
            return res.status(404).send({ error: "Membership not found.." });
        }

        return res.status(200).send(membershipList);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}
