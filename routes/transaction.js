const express = require("express");
const transactionController = require("../controllers/transaction");
// const authController = require("../controllers/auth");
const router = express.Router();

router.route("/transactions").get(transactionController.getAll);

module.exports = router;
