const express = require('express');
const router = new express.Router();

// Auth Middleware
const auth = require('../middleware/auth');

// Import From Controller
const InvoiceController = require('../controllers/InvoiceController');

// Create Topic
router.post('/api/Invoice/CreateInvoice', auth, InvoiceController.CreateInvoice);

// Get All Topic
router.get('/api/Invoice/GetInvoiceList', auth, InvoiceController.GetInvoiceList);

// Update Invoice
router.patch('/api/Invoice/UpdateInvoice/:id', auth, InvoiceController.UpdateInvoice);

// Delete Invoice  
router.delete('/api/Invoice/DeleteInvoice/:id', auth, InvoiceController.DeleteInvoice);

module.exports = router;