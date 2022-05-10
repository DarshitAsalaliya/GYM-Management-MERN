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
exports.GetInvoiceList = async (req, res) => {
    try {
        //const invoiceList = await InvoiceModel.find();

        const invoiceList = await InvoiceModel.aggregate([
            {
                $lookup: {
                    from: "MemberProfile",
                    localField: "memberprofileid",
                    foreignField: "_id",
                    as: "member",
                },
            }
        ])

        // Check Invoice Length
        if (invoiceList.length === 0) {
            return res.status(404).send({ error: "Invoice not found.." });
        }

        return res.status(200).send(invoiceList);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Get All Invoice
exports.GetInvoiceListByMember = async (req, res) => {
    try {

        if (req.params.memberprofileid) {
            id = req.params.memberprofileid
        }
        else {
            id = req.user._id
        }

        //const invoiceList = await InvoiceModel.find({ memberprofileid: id });

        const invoiceList = await InvoiceModel.aggregate([
            {
                $match:
                {
                    memberprofileid: id
                }
            },
            {
                $lookup: {
                    from: "MemberProfile",
                    localField: "memberprofileid",
                    foreignField: "_id",
                    as: "member",
                },
            }
        ]);

        // Check Invoice Length
        if (invoiceList.length === 0) {
            return res.status(404).send({ error: "Invoice not found.." });
        }

        return res.status(200).send(invoiceList);
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Update Invoice
exports.UpdateInvoice = async (req, res) => {
    try {

        const _id = req.params.id;

        //Find Invoice For Update
        const data = await InvoiceModel.findById(_id);

        if (!data)
            return res.status(404).send({ error: "Not Found.." });

        Object.keys(req.body).forEach((update) => {
            data[update] = req.body[update];
        });

        await data.save();

        return res.status(200).send(data);

    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Delete Invoice
exports.DeleteInvoice = async (req, res) => {
    try {
        const data = await InvoiceModel.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).send({ error: "Invoice Not Found.." });
        }

        return res.status(200).send(data);
    }
    catch (e) {
        return res.status(400).send({ error: e.message });
    }
}