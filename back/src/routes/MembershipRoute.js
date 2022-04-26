const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Import From Controller
const MembershipController = require('../controllers/MembershipController');

// Create Topic
router.post('/api/Membership/CreateMembership', auth, MembershipController.CreateMembership);

// Get All Topic
router.get('/api/Membership/GetAllMembership', auth, MembershipController.GetAllMembership);

module.exports = router;