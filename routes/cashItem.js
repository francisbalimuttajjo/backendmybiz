const express = require("express");
const cashItemController = require("../controllers/cashItem");
const authController = require("../controllers/auth");
const router = express.Router();

router
  .route("/cashItem")
  .post(authController.isAuthenticated, cashItemController.addCashItem);

router
  .route("/cashItem/getAll")
  .post(authController.isAuthenticated, cashItemController.getCashItems);

router
  .route("/cashItem/:id")
  .delete(authController.isAuthenticated, cashItemController.deleteCashItem)
  .put(authController.isAuthenticated, cashItemController.updateCashItem);

module.exports = router;
