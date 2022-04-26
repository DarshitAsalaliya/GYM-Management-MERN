const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required..'],
        minlength: [3, 'Your Name must be longer than 2 characters'],
        trim: true
    },
    description: {
        type: String
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required..']
    },
    status: {
        type: String,
        default: 'Pending'
    }
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema, 'Lead');

module.exports = Lead;