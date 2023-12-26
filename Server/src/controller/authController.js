const { promisify } = require('util')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncHandler')
const AppError = require('../utils/appError')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const registerUser = asyncHandler(async (req, res) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        ...req.body,
    })

    // createSendToken(newUser, 201, res);

    const token = generateToken(newUser._id)

    res.status(200).json({
        status: 'Success',
        token,
        user: newUser,
    })
})

const Login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400))
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401))
    }

    const token = generateToken(user._id)
    res.status(200).json({
        status: 'success',
        token,
        data: {
            user,
        },
    })
})

const requireSignIn = asyncHandler(async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(
            new AppError(
                'Your are not logged In! Please Log In to get access.',
                401
            )
        )
    }

    // verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // check if the user that logged in still exist
    const currentUser = await User.findById(decoded.id)

    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.'
            )
        )
    }

    // check if user change password after token was issued
    if (currentUser.ChangePasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                'User recently changed password! Please Log In again.',
                401
            )
        )
    }

    // grant access to protected route
    req.user = currentUser
    next()
})

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    'You do not have permission to perform this action.',
                    403
                )
            )
        }

        next()
    }
}

const forgetPassword = asyncHandler(async (req, res, next) => {
    // 1. get user based on posted email
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new AppError('There is no user with email address.', 404))
    }

    // 2. generate the random reset token
    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    // 3. send it to user's email

})

const resetPassword = () => {}

module.exports = {
    registerUser,
    Login,
    requireSignIn,
    restrictTo,
    forgetPassword,
    resetPassword,
}
