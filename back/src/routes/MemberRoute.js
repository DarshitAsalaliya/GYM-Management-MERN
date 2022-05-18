const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Multer Middleware
const upload = require('../middleware/multer');

// Import From Controller
const MemberController = require('../controllers/MemberController');

// Member Registration
router.post('/api/Member/Registration', [auth, upload.single('image')], MemberController.Registration);

// Login
router.post('/api/Member/Login', MemberController.Login);

// Get Member List
router.get('/api/Member/GetMemberList/', auth, MemberController.GetAllMember);

// Get Member By Trainer
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

// Forgot Password
router.post("/api/Member/ForgotPasswordSendOtp", MemberController.ForgotPasswordSendOtp);

// Change Password After Otp
router.patch("/api/Member/ChangePasswordAfterOtp", MemberController.ChangePasswordAfterOtp);

module.exports = router;