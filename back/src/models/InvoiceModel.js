const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validator = require('validator');

const invoiceSchema = new mongoose.Schema({
    memberprofileid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'MemberProfile'
    },
    membershipid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'MemberShip'
    },
    startdate: {
        type: Date,
        required: [true, 'Start date is required..']
    },
    enddate: {
        type: Date,
        required: [true, 'End date is required..']
    },
    totalamount: {
        type: Number,
        default:0
    },
    paidamount: {
        type: Number,
        default:0
    },
    paymentmode: {
        type: String
    },
    status: {
        type: String
    },
    ownerprofileid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'OwnerProfile'
    },
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema, 'Invoice');

module.exports = Invoice;