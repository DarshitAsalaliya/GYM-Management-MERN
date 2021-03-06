const jwt = require("jsonwebtoken");

// Model
const OwnerModel = require('../models/OwnerModel');
const TrainerModel = require('../models/TrainerModel');
const MemberModel = require('../models/MemberModel');

const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check User
        user = await OwnerModel.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            user = await TrainerModel.findOne({ _id: decoded._id, 'tokens.token': token });
            if (!user) {
                user = await MemberModel.findOne({ _id: decoded._id, 'tokens.token': token });
                if (!user) {
                    throw new Error();
                }
            }
        }

        // Set Parameters
        req.token = token;
        req.user = user;
    }
    catch (e) {
        res.status(401).send({ 'error': 'Please Authenticate..' });
    }

    next();
}

module.exports = auth;