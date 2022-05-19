const express = require("express");
const salesController = require("../controllers/sale");
const authController = require("../controllers/auth");
const router = express.Router();

router
  .route("/sales/getAll")
  .post(authController.isAuthenticated, salesController.getSales);
router
  .route("/sales")
  .post(authController.isAuthenticated, salesController.addSale);
router
  .route("/sales/:id")
  .delete(authController.isAuthenticated, salesController.deleteSale);
router
  .route("/sales/reverse/:id")
  .delete(authController.isAuthenticated, salesController.reverseSale);

module.exports = router;
