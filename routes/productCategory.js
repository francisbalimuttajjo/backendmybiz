const express = require("express");
const productCategoryController = require("../controllers/productCategory");
const authController = require("../controllers/auth");
const router = express.Router();

router.route("/productCategories").post(productCategoryController.addOne);
router.route("/productCategories/getAll").post(
  //authController.isAuthenticated,
  productCategoryController.getAll
);
router
  .route("/productCategories/:id")
  .patch(authController.isAuthenticated, productCategoryController.updateOne);

module.exports = router;
