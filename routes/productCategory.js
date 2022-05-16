const express = require("express");
const productCategoryController = require("../controllers/productCategory");
// const authController = require("../controllers/auth");
const router = express.Router();

router.route("/productCategories").get(productCategoryController.getAll);

module.exports = router;
