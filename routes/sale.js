const express = require("express");
const salesController = require("../controllers/sale");
const authController = require("../controllers/auth");
const router = express.Router();

router
  .route("/sales/getAll")
  .post(authController.isAuthenticated, salesController.getAll);
router
  .route("/sales")
  .post(authController.isAuthenticated, salesController.addOne);
router
  .route("/sales/:id")
  .delete(authController.isAuthenticated, salesController.deleteOne);
router
  .route("/sales/reverse/:id")
  .delete(authController.isAuthenticated, salesController.reverseSale);

module.exports = router;
