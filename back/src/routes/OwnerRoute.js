const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Multer Middleware
const upload = require('../middleware/multer');

// Import From Controller
const OwnerController = require('../controllers/OwnerController');

// Create GenerateToken
router.post('/api/Owner/Registration', upload.single('image'), OwnerController.Registration);

// Login
router.post('/api/Owner/Login', OwnerController.Login);

module.exports = router;