const express = require("express");
const stockItemController = require("../controllers/stockItem");
const authController = require("../controllers/auth");
const router = express.Router();

router
  .route("/stockItems")
  .get(authController.isAuthenticated, stockItemController.getStockItems)
  .post(authController.isAuthenticated, stockItemController.addStockItem);
router
  .route("/stockItems/:id")
  .put(authController.isAuthenticated, stockItemController.updateStockItem)
  .delete(authController.isAuthenticated, stockItemController.deleteStockItem);

module.exports = router;
