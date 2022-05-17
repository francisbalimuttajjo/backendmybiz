const express = require("express");
const salesController = require("../controllers/sale");
// const authController = require("../controllers/auth");
const router = express.Router();

router.route("/sales").get(salesController.getAll);

module.exports = router;
