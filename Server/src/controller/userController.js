const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("../utils/asyncHandler")

const registerUser = async (req,res) => {
    try {
        
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

    } catch (error) {
        res.status(404).json({
            status: "fail",
            data: {
                error
            }
        })
    }

}

module.exports = {
    registerUser
}