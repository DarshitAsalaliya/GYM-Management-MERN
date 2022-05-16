const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Import From Controller
const NotificationController = require('../controllers/NotificationController');

// Get All Notification
router.get('/api/Notification/GetNotificationList', auth, NotificationController.GetNotificationList);

module.exports = router;