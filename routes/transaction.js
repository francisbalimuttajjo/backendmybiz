const express = require("express");
const transactionController = require("../controllers/transaction");
const authController = require("../controllers/auth");
const router = express.Router();

router
  .route("/transactions/getAll")
  .post(authController.isAuthenticated, transactionController.getAll);
router.route("/transactions").post(transactionController.addOne);

module.exports = router;
