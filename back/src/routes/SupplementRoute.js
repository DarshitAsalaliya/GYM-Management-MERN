const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Multer Middleware
const upload = require('../middleware/multer');

// Import From Controller
const SupplementController = require('../controllers/SupplementController');

// Create Supplement
router.post('/api/Supplement/CreateSupplement', [auth,upload.array('image')], SupplementController.CreateSupplement);

// Delete Supplement
router.delete('/api/Supplement/DeleteSupplement/:id', auth, SupplementController.DeleteSupplement);

module.exports = router;