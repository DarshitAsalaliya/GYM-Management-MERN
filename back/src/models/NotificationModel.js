const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notificationcontent: {
        type: String,
        required: [true, 'Notification is required..'],
        trim:true,
    },
    ownerprofileid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'OwnerProfile'
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema, 'Notification');

module.exports = Notification;