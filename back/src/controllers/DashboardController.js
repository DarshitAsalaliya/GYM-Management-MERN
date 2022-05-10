// Model
const MemberModel = require('../models/MemberModel');
const TrainerModel = require('../models/TrainerModel');
const MembershipModel = require('../models/MembershipModel');
const SupplementModel = require('../models/SupplementModel');
const InvoiceModel = require('../models/InvoiceModel');
const { mongoose } = require('mongoose');

// API Using Async Await

// Get Admin Dashboard Data
exports.GetAdminDashboardData = async (req, res) => {
    try {
        const totalMembers = await MemberModel.find();
        const totalTrainers = await TrainerModel.find();
        const totalMemberships = await MembershipModel.find();
        const totalSupplements = await SupplementModel.find({ status: true });
        const totalInvoices = await InvoiceModel.find();

        return res.status(200).send({ totalMembers, totalTrainers, totalMemberships, totalSupplements, totalInvoices });
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

exports.GetTrainerDashboardData = async (req, res) => {
    try {
        const totalMembers = await MemberModel.find({ trainerprofileid: mongoose.Types.ObjectId(req.user.id) }).count();

        return res.status(200).send({ totalMembers });
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

exports.GetMemberDashboardData = async (req, res) => {
    try {
        const totalInvoices = await InvoiceModel.find({ memberprofileid: mongoose.Types.ObjectId(req.user.id) }).count();
        return res.status(200).send({ totalInvoices });
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}