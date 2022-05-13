const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
    },
    createdAt: { type: Date, expires: '2m', default: Date.now },
});

const Otp = mongoose.model('Otp', otpSchema, 'Otp');

module.exports = Otp;