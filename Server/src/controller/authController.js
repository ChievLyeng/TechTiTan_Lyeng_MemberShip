const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const registerUser = asyncHandler( async (req,res) => {

    const {userName,email,birthDate,gender} = req.body

    const newUser = await User.create({
        userName,
        email,
        birthDate,
        gender,
        ...req.body
    })
    console.log("newuserid",newUser._id)

    const token = generateToken(newUser._id);

    res.status(200).json({
        status: "Success",
        token,
        data: {
            user:newUser,
        }
    })

});


const Login = asyncHandler( async(req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new AppError("Please provide email and password!", 400));
    }

    const user = await User.findOne({ email });
if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
}
// Authentication successful, proceed with generating a token or other actions.


    const token = generateToken(user._id);
    res.status(200).json({
        status: "success",
        token,
        data: {
            user
        }
    })

});




module.exports = {
    registerUser,
    Login
}