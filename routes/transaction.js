const express = require("express");
const transactionController = require("../controllers/transaction");
const authController = require("../controllers/auth");
const router = express.Router();

router
  .route("/transactions/getAll")
  .post(authController.isAuthenticated, transactionController.getTransactions);

router.route("/transactions").post(transactionController.createTransaction);
router
  .route("/transactions/:id")
  .delete(transactionController.deleteTransaction);

module.exports = router;
