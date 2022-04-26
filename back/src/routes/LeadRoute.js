const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Import From Controller
const LeadController = require('../controllers/LeadController');

// Create Lead
router.post('/api/Lead/CreateLead', LeadController.CreateLead);

// Get All Lead
router.get('/api/Lead/GetAllLead', LeadController.GetAllLead);

module.exports = router;