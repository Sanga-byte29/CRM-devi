const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productCode: { type: String, required: true },
    productName: { type: String, required: true },
    productDescription: { type: String },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    productCategory: { type: String },
    stock: { type: Number, default: 0 },
    taxSlab: { type: Number },
    hsnCode: { type: String },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
