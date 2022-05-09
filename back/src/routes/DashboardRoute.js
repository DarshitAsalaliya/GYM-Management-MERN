const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Import From Controller
const DashboardController = require('../controllers/DashboardController');

// Get Admin Dashboard
router.get('/api/Dashboard/GetAdminDashboardData', auth, DashboardController.GetAdminDashboardData);

// Get Trainer Dashboard
router.get('/api/Dashboard/GetTrainerDashboardData', auth, DashboardController.GetTrainerDashboardData);

// Get Member Dashboard
router.get('/api/Dashboard/GetMemberDashboardData', auth, DashboardController.GetMemberDashboardData);

module.exports = router;