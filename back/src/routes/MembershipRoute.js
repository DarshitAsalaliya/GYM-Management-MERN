const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Import From Controller
const MembershipController = require('../controllers/MembershipController');

// Create Membership
router.post('/api/Membership/CreateMembership', auth, MembershipController.CreateMembership);

// Get All Membership
router.get('/api/Membership/GetMembershipList', auth, MembershipController.GetMembershipList);

// Update Membership
router.patch('/api/Membership/UpdateMembership/:id', auth, MembershipController.UpdateMembership);

// Delete Membership
router.delete('/api/Membership/DeleteMembership/:id', auth, MembershipController.DeleteMembership);

module.exports = router;