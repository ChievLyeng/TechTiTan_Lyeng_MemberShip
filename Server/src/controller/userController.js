const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("../utils/asyncHandler")

const registerUser = asyncHandler( async (req,res) => {

    const {userName,email,birthDate,gender} = req.body

    const newUser = await User.create({
        userName,
        email,
        birthDate,
        gender,
        ...req.body
    })

    const token = jwt.sign({ id: newUser._id },process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({
        status: "Success",
        token,
        data: {
            user:newUser,
        }
    })

});


module.exports = {
    registerUser
}