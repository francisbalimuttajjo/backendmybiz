const express = require("express");
const salesController = require("../controllers/sale");
// const authController = require("../controllers/auth");
const router = express.Router();

router.route("/sales").get(salesController.getAll);
router.route("/sales").post(salesController.addOne);

module.exports = router;
