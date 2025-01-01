const express = require("express");
const router = express.Router();
const productCategoryController = require("../../Controllers/productControllers/ProductCategoryController");

router.post("/", productCategoryController.addProductCategory);
router.get("/", productCategoryController.getAllProductCategories);

module.exports = router;
