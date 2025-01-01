const express = require("express");
const router = express.Router();
const productController = require("../../Controllers/productControllers/ProductController");

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);

module.exports = router;
