const express = require("express");
const userController = require("../controllers/user");
const authController = require("../controllers/auth");
const router = express.Router();



router.route("/users/register").post(userController.registerUser);
router
  .route("/users/profile")
  .patch(authController.isAuthenticated, userController.updateProfile);

router.route("/users/login").post(userController.loginUser);
router
  .route("/users/updatePassword")
  .post(authController.isAuthenticated, userController.updatePassword);

router.route("/users/auth/:token").post(authController.auth);

module.exports = router;
