const mongoose = require("mongoose"); // Add this line
const Invoice = require("../Models/invoices");
const Order = require("../Models/orders");
const { v4: uuidv4 } = require("uuid");

exports.createInvoice = async (req, res) => {
  try {
    const invoices = req.body; //arrray of invocie objs

    if (!Array.isArray(invoices)) {
      return res.status(400).json({ message: "Expected an array of invoices" });
    }

    const createdInvoices = [];

    for (const invoiceData of invoices) {
      const { orderId, invoiceId, invoiceNumber, invoiceDate } = invoiceData;

      //check for missing fields
      if (!orderId || !invoiceNumber || !invoiceDate) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      const order = await Order.findOne({ orderId: orderId });

      if (!order) {
        return res
          .status(400)
          .json({ message: `Order with ID ${orderId} not found.` });
      }

      const newInvoice = new Invoice({
        orderId: order._id,
        invoiceId: invoiceId || uuidv4(),
        invoiceNumber,
        invoiceDate: new Date(invoiceDate),
      });

      const savedInvoice = await newInvoice.save();
      createdInvoices.push(savedInvoice);
    }

    // Respond with the created invoices
    res.status(201).json(createdInvoices);
  } catch (err) {
    console.error("Error creating invoice:", err);
    res
      .status(500)
      .json({ message: "Error creating invoice", error: err.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const { orderId, invoiceId, invoiceNumber } = req.query;

    const query = {};
    if (orderId) query.orderId = orderId;
    if (invoiceId) query.invoiceId = invoiceId;
    if (invoiceNumber) query.invoiceNumber = invoiceNumber;

    const invoices = await Invoice.find(query).populate("orderId");

    if (!invoices || invoices.length === 0) {
      return res.status(404).json({ message: "No invoices found." });
    }

    res.status(200).json(invoices);
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res
      .status(500)
      .json({ message: "Error fetching invoices", error: err.message });
  }
};

exports.getInvoiceByOrderId = async (req, res) => {
  const orderId = req.params.orderId;
  const isObjectId = mongoose.Types.ObjectId.isValid(orderId);

  try {
    const invoices = await Invoice.find(
      isObjectId
        ? { orderId: new mongoose.Types.ObjectId(orderId) }
        : { orderId: orderId }
    );

    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderId, invoiceId, invoiceNumber, invoiceDate } = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { orderId, invoiceId, invoiceNumber, invoiceDate },
      { new: true, runValidators: true } //givesus the  updated document and validates
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(updatedInvoice);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating invoice", error: err.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvoice = await Invoice.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res
      .status(200)
      .json({ message: "Invoice deleted successfully", deletedInvoice });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting invoice", error: err.message });
  }
};
