const express = require("express")
const {
    registerUser,
    Login
} = require("../controller/authController")
const { getAlluser } = require("../controller/userController")
const router = express.Router();


//auth route
router.post("/register", registerUser)
router.post("/login", Login)

// user route
router.route("/")
    .get(getAlluser)


module.exports = router