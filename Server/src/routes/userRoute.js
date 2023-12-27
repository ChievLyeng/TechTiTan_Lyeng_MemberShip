const express = require('express')
const {
    registerUser,
    Login,
    requireSignIn,
    restrictTo,
    forgetPassword,
    resetPassword,
    updatePassword,
} = require('../controller/authController')
const {
    getAlluser,
    updateMe,
    deleteMe,
} = require('../controller/userController')
const router = express.Router()

//auth route
router.post('/register', registerUser)
router.post('/login', Login)
router.post('/forgotPassword', forgetPassword)
router.patch('/resetPassword/:token', resetPassword)
router.patch('/updateMyPassword', requireSignIn, updatePassword)
router.patch('/updateMe', requireSignIn, updateMe)
router.delete('/deleteMe', requireSignIn, deleteMe)

// user route
router.route('/').get(requireSignIn,getAlluser)

module.exports = router
