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
        // Pagination
        let { page, size } = req.query;

        if (!page)
            page = 1;
        if (!size)
            size = 5;

        const limit = parseInt(size);
        const skip = (page - 1) * size;

        const invoiceList = await InvoiceModel.aggregate([
            {
                $lookup: {
                    from: "MemberProfile",
                    localField: "memberprofileid",
                    foreignField: "_id",
                    as: "member",
                },
            }
        ]).sort({ createdAt: -1 }).skip(skip).limit(limit);

        const totalRecord = await InvoiceModel.find().count();

        // Check Invoice Length
        if (invoiceList.length === 0) {
            return res.status(404).send({ error: "Invoice not found.." });
        }

        return res.status(200).send({ invoiceList, totalRecord });
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
}

// Get Invoice By Member
exports.GetInvoiceListByMember = async (req, res) => {
    try {

        // Pagination
        let { page, size } = req.query;

        if (!page)
            page = 1;
        if (!size)
            size = 5;

        const limit = parseInt(size);
        const skip = (page - 1) * size;

        if (req.params.memberprofileid) {
            id = req.params.memberprofileid
        }
        else {
            id = req.user._id
        }

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
        ]).sort({ createdAt: -1 }).skip(skip).limit(limit);

        const totalRecord = await InvoiceModel.find({ memberprofileid: id }).count();

        // Check Invoice Length
        if (invoiceList.length === 0) {
            return res.status(404).send({ error: "Invoice not found.." });
        }

        return res.status(200).send({ invoiceList, totalRecord });
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