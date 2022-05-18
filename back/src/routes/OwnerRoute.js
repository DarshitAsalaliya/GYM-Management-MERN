const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Multer Middleware
const upload = require('../middleware/multer');

// Import From Controller
const OwnerController = require('../controllers/OwnerController');

// Owner Registration
router.post('/api/Owner/Registration', upload.single('image'), OwnerController.Registration);

// Login
router.post('/api/Owner/Login', OwnerController.Login);

// Logout
router.post('/api/Owner/Logout',auth, OwnerController.Logout);

// Get Profile
router.get('/api/Owner/me',auth, OwnerController.AdminProfile);

// Change Password
router.post('/api/Owner/ChangePassword',auth, OwnerController.ChangePassword);

// Forgot Password
router.post("/api/Owner/ForgotPasswordSendOtp", OwnerController.ForgotPasswordSendOtp);

// Change Password After Otp
router.patch("/api/Owner/ChangePasswordAfterOtp", OwnerController.ChangePasswordAfterOtp);

module.exports = router;