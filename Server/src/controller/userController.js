const User = require("../models/UserModel");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler")

const getAlluser = asyncHandler(async (req, res, next) => {
    const users = await User.find();
    const result = await User.countDocuments();

    if(!users){
        return next( new AppError("User not found!",404));
    }

    res.status(200).json({
        status: "Success",
        result,
        data:{
            users
        }
    })
});


module.exports = {
    getAlluser
}