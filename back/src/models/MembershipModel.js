const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validator = require('validator');

const membershipSchema = new mongoose.Schema({
    membershipname: {
        type: String,
        required: [true, 'Membership name is required..'],
        minlength: [3, 'Your membership name must be longer than 2 characters'],
        trim: true
    },
    duration: {
        type: Number,
        min: [1, 'Minimum required 1'],
        max: [12, 'Maximum required 12'],
    },
    amount: {
        type: Number
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    ownerprofileid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'OwnerProfile'
    },
}, { timestamps: true });

const Membership = mongoose.model('Membership', membershipSchema, 'Membership');

module.exports = Membership;