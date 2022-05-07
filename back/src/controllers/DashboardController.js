// Model
const MemberModel = require('../models/MemberModel');
const TrainerModel = require('../models/TrainerModel');
const MembershipModel = require('../models/MembershipModel');
const SupplementModel = require('../models/SupplementModel');
const InvoiceModel = require('../models/InvoiceModel');

// API Using Async Await

// Get Admin Dashboard Data
exports.GetAdminDashboardData = async (req, res) => {
    try {
        const totalMembers = await MemberModel.find().count();
        const totalTrainers = await TrainerModel.find().count();
        const totalMemberships = await MembershipModel.find().count();
        const totalSupplements = await SupplementModel.find({status:true}).count();
        const totalInvoices = await InvoiceModel.find().count();
        
        return res.status(200).send({totalMembers,totalTrainers,totalMemberships,totalSupplements,totalInvoices});
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}
