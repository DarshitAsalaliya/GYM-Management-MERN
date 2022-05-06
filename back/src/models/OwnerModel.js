const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validator = require('validator');

const ownerSchema = new mongoose.Schema({
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
ownerSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token: token });
    await user.save();

    return token;
}

// Middleware Before Saving Data To Hash Password
ownerSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// Login Validation
ownerSchema.statics.findByCredentials = async (email, password) => {

    const user = await OwnerProfile.findOne({ email });

    if (!user) {
        throw new Error('Invalid User..');
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Invalid User..');
    }

    return user;
}

// Get Necessary Parameter
ownerSchema.methods.getPublicProfile = async function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

const OwnerProfile = mongoose.model('OwnerProfile', ownerSchema, 'OwnerProfile');

module.exports = OwnerProfile;