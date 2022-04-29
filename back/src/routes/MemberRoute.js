const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Multer Middleware
const upload = require('../middleware/multer');

// Import From Controller
const MemberController = require('../controllers/MemberController');

// Create GenerateToken
router.post('/api/Member/Registration', [auth, upload.single('image')], MemberController.Registration);

// Login
router.post('/api/Member/Login', MemberController.Login);

// Get
router.get('/api/Member/GetMemberList', auth, MemberController.GetAllMember);

// Delete
router.delete('/api/Member/DeleteMember/:id', auth, MemberController.DeleteMember);

module.exports = router;