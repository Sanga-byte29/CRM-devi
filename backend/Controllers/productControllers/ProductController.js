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

    if (!categoryID) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required.",
      });
    }

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

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: "categoryID",
      select: "categoryName",
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

exports.getProductById = async (req, res) => {
  try {
    console.log("Request Params:", req.params);

    const { productId } = req.params;
    console.log("Incoming Product ID:", productId);

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      console.log("Invalid Product ID format:", productId);
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format.",
      });
    }

    // Find product by ID
    const product = await Product.findById(productId).populate({
      path: "categoryID",
      select: "categoryName",
    });

    if (!product) {
      console.log("Product not found for ID:", productId);
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product by ID.",
      error: error.message,
    });
  }
};

//v2
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
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

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    if (categoryID) {
      const categoryExists = await ProductCategories.findById(categoryID);
      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID.",
        });
      }
    }

    const updatedFields = {
      productCode: productCode || product.productCode,
      productName: productName || product.productName,
      productDescription: productDescription || product.productDescription,
      categoryID: categoryID || product.categoryID,
      stock: stock !== undefined ? stock : product.stock,
      taxSlab: taxSlab || product.taxSlab,
      hsnCode: hsnCode || product.hsnCode,
      price: price || product.price,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true }
    ).populate({
      path: "categoryID",
      select: "categoryName",
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the product.",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format.",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product.",
      error: error.message,
    });
  }
};
