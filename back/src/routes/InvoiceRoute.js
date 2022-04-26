const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Import From Controller
const InvoiceController = require('../controllers/InvoiceController');

// Create Topic
router.post('/api/Invoice/CreateInvoice', auth, InvoiceController.CreateInvoice);

// Get All Topic
router.get('/api/Invoice/GetAllInvoice', auth, InvoiceController.GetAllInvoice);

module.exports = router;