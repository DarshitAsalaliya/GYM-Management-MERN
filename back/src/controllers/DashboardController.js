// Model
const MemberModel = require('../models/MemberModel');
const TrainerModel = require('../models/TrainerModel');
const MembershipModel = require('../models/MembershipModel');
const SupplementModel = require('../models/SupplementModel');
const InvoiceModel = require('../models/InvoiceModel');
const LeadModel = require('../models/LeadModel');
const { mongoose } = require('mongoose');

// API Using Async Await

// Get Admin Dashboard Data
exports.GetAdminDashboardData = async (req, res) => {
    try {

        const totalMembers = await MemberModel.aggregate([
            {
                $lookup: {
                    from: "TrainerProfile",
                    localField: "trainerprofileid",
                    foreignField: "_id",
                    as: "trainer",
                },
            },
            {
                $lookup: {
                    from: "Invoice",
                    localField: "_id",
                    foreignField: "memberprofileid",
                    as: "invoices",
                },
            }
        ])
    
        const totalTrainers = await TrainerModel.find();
        const totalMemberships = await MembershipModel.find();
        const totalSupplements = await SupplementModel.find();
        const totalInvoices = await InvoiceModel.find();
        const totalLeads = await LeadModel.find();

        return res.status(200).send({ totalMembers, totalTrainers, totalMemberships, totalSupplements, totalInvoices, totalLeads });
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

exports.GetTrainerDashboardData = async (req, res) => {
    try {
        //const totalMembers = await MemberModel.find({}).count();

        const totalMembers = await MemberModel.aggregate([
            // {
            //     $match: {
            //         trainerprofileid: mongoose.Types.ObjectId(req.user.id)
            //     }
            // },
            {
                $match:
                {
                    trainerprofileid: mongoose.Types.ObjectId(req.user.id)
                }
            },
            {
                $lookup: {
                    from: "TrainerProfile",
                    localField: "trainerprofileid",
                    foreignField: "_id",
                    as: "trainer",
                },
            },
            {
                $lookup: {
                    from: "Invoice",
                    localField: "_id",
                    foreignField: "memberprofileid",
                    as: "invoices",
                },
            }
        ])

        return res.status(200).send({ totalMembers });
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

exports.GetMemberDashboardData = async (req, res) => {
    try {
        const totalInvoices = await InvoiceModel.find({ memberprofileid: mongoose.Types.ObjectId(req.user.id) }).sort({createdAt:-1});
        return res.status(200).send({ totalInvoices });
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}