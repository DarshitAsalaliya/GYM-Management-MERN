// Model
const LeadModel = require('../models/LeadModel');

// API Using Async Await

// Create New Lead
exports.CreateLead = async (req, res) => {
    try {
        const newLead = new LeadModel({ ...req.body });
        await newLead.save();
        return res.status(201).send(newLead);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Get All Lead
exports.GetAllLead = async (req, res) => {
    try {
        const leadList = await LeadModel.find();

        // Check Lead Length
        if (leadList.length === 0) {
            return res.status(404).send({ error: "Lead not found.." });
        }

        return res.status(200).send(leadList);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}
