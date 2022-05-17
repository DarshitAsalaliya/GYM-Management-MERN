const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validator = require('validator');

const trainerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required..'],
        unique: [true, 'Email must be unique..'],
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email..');
            }
        },
    },
    password: {
        type: String
    },
    image: {
        public_id: {
            type: String
        },
        image_url: {
            type: String

        }
    },
    status: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: [true, 'Trainer name is required..'],
        minlength: [3, 'Your trainer name must be longer than 2 characters'],
        trim: true
    },
    salary: {
        type: Number,
        default:0
    },
    gender: {
        type: String,
        required:[true, 'Trainer gender is required..']
    },
    dob: {
        type: Date,
        required:[true, 'Trainer date of birth is required..']
    },
    doj: {
        type: Date,
        required:[true, 'Trainer date of join is required..']
    },
    height: {
        type: Number,
        default:0,
        required:[true, 'Trainer height is required..']
    },
    weight: {
        type: Number,
        default:0,
        required:[true, 'Trainer weight is required..']
    },
    bloodgroup:{
        type:String
    },
    phone:{
        type:String,
        unique: [true, 'Phone number must be unique..'],
        required:[true, 'Trainer phone number is required..']
    },
    address:{
        type:String,
        default:''
    },
    ownerprofileid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'OwnerProfile'
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true });

// Generate AuthToken And Save Methods
trainerSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token: token });
    await user.save();

    return token;
}

// Middleware Before Saving Data To Hash Password
trainerSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// Login Validation
trainerSchema.statics.findByCredentials = async (email, password) => {

    const user = await TrainerProfile.findOne({ email });

    if (!user) {
        throw new Error('Unable to login..');
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login..');
    }

    return user;
}

// Get Necessary Parameter
trainerSchema.methods.getPublicProfile = async function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

const TrainerProfile = mongoose.model('TrainerProfile', trainerSchema, 'TrainerProfile');

module.exports = TrainerProfile;