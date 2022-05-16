// Model
const NotificationModel = require('../models/NotificationModel');

// API Using Async Await

// Get All Lead
exports.GetNotificationList = async (req, res) => {
    try {
        const notificationList = await NotificationModel.find().sort({createdAt:-1});

        // Check Lead Length
        if (notificationList.length === 0) {
            return res.status(404).send({ error: "Notification not found.." });
        }

        return res.status(200).send(notificationList);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}
