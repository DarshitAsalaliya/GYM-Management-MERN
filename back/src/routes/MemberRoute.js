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
router.get('/api/Member/GetMemberList/', auth, MemberController.GetAllMember);

// Get
router.get('/api/Member/GetMemberListByTrainer/:trainerprofileid?', auth, MemberController.GetMemberListByTrainer);

// Update
router.patch('/api/Member/UpdateMember/:id', [auth, upload.single('image')], MemberController.UpdateMember);

// Delete
router.delete('/api/Member/DeleteMember/:id', auth, MemberController.DeleteMember);

// Logout
router.post('/api/Member/Logout',auth, MemberController.Logout);

// Get Profile
router.get('/api/Member/me',auth, MemberController.MemberProfile);

// Change Password
router.post('/api/Member/ChangePassword',auth, MemberController.ChangePassword);

module.exports = router;