const express = require("express");
const {
  registerUser,
  Login,
  requireSignIn,
  restrictTo,
  forgetPassword,
  resetPassword,
} = require("../controller/authController");
const { getAlluser } = require("../controller/userController");
const router = express.Router();

//auth route
router.post("/register", registerUser);
router.post("/login", Login);
router.post("/forgotPassword", forgetPassword);
router.post("/resetPassword", resetPassword);

// user route
router.route("/").get(requireSignIn, restrictTo("admin", "user"), getAlluser);

module.exports = router;
