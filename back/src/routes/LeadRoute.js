const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Import From Controller
const LeadController = require('../controllers/LeadController');

// Create Lead
router.post('/api/Lead/CreateLead', LeadController.CreateLead);

// Get All Lead
router.get('/api/Lead/GetLeadList', auth, LeadController.GetLeadList);

// Update Lead
router.patch('/api/Lead/UpdateLead/:id', auth, LeadController.UpdateLead);

// Delete Lead  
router.delete('/api/Lead/DeleteLead/:id', auth, LeadController.DeleteLead);

module.exports = router;