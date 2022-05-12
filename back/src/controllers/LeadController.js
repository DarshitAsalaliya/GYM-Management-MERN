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
exports.GetLeadList = async (req, res) => {
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

// Update Lead
exports.UpdateLead = async (req, res) => {
    try {

        const _id = req.params.id;

        //Find Lead For Update
        const data = await LeadModel.findById(_id);

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

// Delete Lead
exports.DeleteLead = async (req, res) => {
    try {
        const data = await LeadModel.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).send({ error: "Lead Not Found.." });
        }

        return res.status(200).send(data);
    }
    catch (e) {
        return res.status(400).send({ error: e.message });
    }
}