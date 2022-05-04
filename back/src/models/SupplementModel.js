const mongoose = require('mongoose');

const supplementSchema = new mongoose.Schema({
    supplementname: {
        type: String,
        required: [true, 'Supplement name is required..'],
        minlength: [3, 'Your Supplement name must be longer than 2 characters'],
        trim: true
    },
    image:
    {
        public_id: {
            type: String
        },
        image_url: {
            type: String
        }
    },
    price: {
        type: Number,
        default: 0
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
    }
}, { timestamps: true });

const Supplement = mongoose.model('Supplement', supplementSchema, 'Supplement');

module.exports = Supplement;