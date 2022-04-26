// Model
const InvoiceModel = require('../models/InvoiceModel');

// API Using Async Await

// Create New Invoice
exports.CreateInvoice = async (req, res) => {
    try {
        const newInvoice = new InvoiceModel({ ...req.body, ownerprofileid: req.user._id });
        await newInvoice.save();
        return res.status(201).send(newInvoice);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Get All Invoice
exports.GetAllInvoice = async (req, res) => {
    try {
        const invoiceList = await InvoiceModel.find();

        // Check Invoice Length
        if (invoiceList.length === 0) {
            return res.status(404).send({ error: "Invoice not found.." });
        }

        return res.status(200).send(invoiceList);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}
