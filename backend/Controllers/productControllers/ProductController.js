const Product = require("../../Models/productModels/products");
const mongoose = require("mongoose");
const ProductCategories = require("../../Models/productModels/productCategories");

exports.createProduct = async (req, res) => {
  try {
    const {
      productCode,
      productName,
      productDescription,
      categoryID,
      stock,
      taxSlab,
      hsnCode,
      price,
    } = req.body;

    if (!productCode || !productName || stock === undefined || !price) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    // below in the if condition add this

    if (!categoryID) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required.",
      });
    }

    // if (categoryID) {
    //   const categoryExists = await ProductCategories.findById(categoryID);
    //   if (!categoryExists) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Category not found.",
    //     });
    //   }
    // }

    const categoryExists = await ProductCategories.findById(categoryID);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Category not found.",
      });
    }

    const existingProduct = await Product.findOne({ productCode });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product code already exists.",
      });
    }

    const newProduct = new Product({
      productCode,
      productName,
      productDescription,
      categoryID: categoryID || null,
      stock,
      taxSlab,
      hsnCode,
      price,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error.message, error.stack);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the product.",
      error: error.message,
    });
  }
};

// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json({
//       success: true,
//       message: "Products fetched successfully.",
//       products,
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error.message, error.stack);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching the products.",
//       error: error.message,
//     });
//   }
// };
//previous working fine v1

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: "categoryID",
      select: "categoryName", // Fetch only the categoryName
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products.",
      error: error.message,
    });
  }
};
