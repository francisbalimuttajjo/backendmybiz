const express = require("express");
const productCategoryController = require("../controllers/productCategory");
const authController = require("../controllers/auth");
const router = express.Router();

router
  .route("/productCategories")
  .post(productCategoryController.addProductCategory);
router
  .route("/productCategories/getAll")
  .post(
    authController.isAuthenticated,
    productCategoryController.getProductCategories
  );
router
  .route("/productCategories/:id")
  .patch(
    authController.isAuthenticated,
    productCategoryController.updateProductCategory
  )
  .delete(
    authController.isAuthenticated,
    productCategoryController.deleteProductCategory
  );

module.exports = router;
