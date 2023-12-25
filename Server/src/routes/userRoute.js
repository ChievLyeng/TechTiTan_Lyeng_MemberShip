const express = require("express")
const {
    registerUser,
    Login,
    requireSignIn
} = require("../controller/authController")
const { getAlluser } = require("../controller/userController")
const router = express.Router();


//auth route
router.post("/register", registerUser)
router.post("/login", Login)

// user route
router.route("/")
    .get(requireSignIn,getAlluser)


module.exports = router