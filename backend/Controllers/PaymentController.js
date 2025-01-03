const mongoose = require("mongoose");
const Payment = require("../Models/payments");
const Order = require("../Models/orders");

exports.createPayments = async (req, res) => {
  try {
    const payments = req.body;

    const isValidDate = (date) => !isNaN(new Date(date).getTime());

    const createdPayments = [];
    for (const paymentData of payments) {
      const {
        orderId,
        paymentType,
        paymentDate,
        paymentMethod,
        amountReceived,
        notes,
      } = paymentData;

      if (
        !orderId ||
        !paymentType ||
        !paymentDate ||
        !isValidDate(paymentDate) ||
        !amountReceived
      ) {
        return res.status(400).json({
          message: "Missing or invalid required fields in payment entry.",
          details: {
            orderId: !orderId ? "Order ID is required" : undefined,
            paymentType: !paymentType ? "Payment Type is required" : undefined,
            paymentDate: !isValidDate(paymentDate)
              ? "Invalid Payment Date"
              : undefined,
            amountReceived: !amountReceived
              ? "Amount Received is required"
              : undefined,
          },
        });
      }
      //find the matching order
      const order = await Order.findOne({ orderId: orderId });

      if (!order) {
        return res
          .status(400)
          .json({ message: `Order with ID ${orderId} not found.` });
      }

      const newPayment = new Payment({
        orderId: order._id,
        paymentType,
        paymentDate: new Date(paymentDate),
        paymentMethod,
        amountReceived,
        notes,
      });

      const savedPayment = await newPayment.save();
      createdPayments.push(savedPayment);
    }

    res.status(201).json(createdPayments);
  } catch (err) {
    console.error("Error creating payments:", err);
    res
      .status(500)
      .json({ message: "Error creating payments", error: err.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("orderId");
    res.status(200).json(payments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching payments", error: err.message });
  }
};

exports.getPaymentByOrderId = async (req, res) => {
  const orderId = req.params.orderId;
  const isObjectId = mongoose.Types.ObjectId.isValid(orderId);

  try {
    const payments = await Payment.find(
      isObjectId
        ? { orderId: new mongoose.Types.ObjectId(orderId) }
        : { orderId: orderId }
    );

    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res
      .status(500)
      .json({ message: "Error fetching payments", error: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      orderId,
      paymentType,
      paymentDate,
      paymentMethod,
      amountReceived,
      notes,
    } = req.body;

    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      {
        orderId,
        paymentType,
        paymentDate,
        paymentMethod,
        amountReceived,
        notes,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(updatedPayment);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating payment", error: err.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res
      .status(200)
      .json({ message: "Payment deleted successfully", deletedPayment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting payment", error: err.message });
  }
};
