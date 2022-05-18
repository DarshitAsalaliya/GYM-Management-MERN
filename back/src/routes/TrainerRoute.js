const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Multer Middleware
const upload = require('../middleware/multer');

// Import From Controller
const TrainerController = require('../controllers/TrainerController');

// Trainer Registration
router.post('/api/Trainer/Registration', [auth,upload.single('image')], TrainerController.Registration);

// Login
router.post('/api/Trainer/Login', TrainerController.Login);

// Get Trainer List
router.get('/api/Trainer/GetTrainerList', auth, TrainerController.GetAllTrainer);

// Get Active Trainer
router.get('/api/Trainer/GetActiveTrainerList', auth, TrainerController.GetAllActiveTrainer);

// Update
router.patch('/api/Trainer/UpdateTrainer/:id', [auth, upload.single('image')], TrainerController.UpdateTrainer);

// Delete
router.delete('/api/Trainer/DeleteTrainer/:id', auth, TrainerController.DeleteTrainer);

// Get Profile

// Logout
router.post('/api/Trainer/Logout',auth, TrainerController.Logout);

// Get Profile
router.get('/api/Trainer/me',auth, TrainerController.TrainerProfile);

// Change Password
router.post('/api/Trainer/ChangePassword',auth, TrainerController.ChangePassword);

// Forgot Password
router.post("/api/Trainer/ForgotPasswordSendOtp", TrainerController.ForgotPasswordSendOtp);

// Change Password After Otp
router.patch("/api/Trainer/ChangePasswordAfterOtp", TrainerController.ChangePasswordAfterOtp);

module.exports = router;