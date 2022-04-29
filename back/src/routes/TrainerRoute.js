const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Multer Middleware
const upload = require('../middleware/multer');

// Import From Controller
const TrainerController = require('../controllers/TrainerController');

// Create GenerateToken
router.post('/api/Trainer/Registration', [auth,upload.single('image')], TrainerController.Registration);

// Login
router.post('/api/Trainer/Login', TrainerController.Login);

// Get
router.get('/api/Trainer/GetTrainerList', auth, TrainerController.GetAllTrainer);

module.exports = router;