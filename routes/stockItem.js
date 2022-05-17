const express = require("express");
const stockItemController = require("../controllers/stockItem");
const authController = require("../controllers/auth");
const router = express.Router();

router
  .route("/stockItems")
  .get(authController.isAuthenticated, stockItemController.getAll)
  .post(authController.isAuthenticated, stockItemController.addOne);
router
  .route("/stockItems/:id")
  .put(authController.isAuthenticated, stockItemController.updateOne)
  .delete(authController.isAuthenticated, stockItemController.deleteOne);

module.exports = router;
