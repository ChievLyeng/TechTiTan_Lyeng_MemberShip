const User = require("../models/UserModel")

const registerUser = async (req,res) => {
    try {
        const newUser = await User.create(req.body)

        res.status(201).json({
            data: {
                status: "Success",
                newUser
            }
        })

    } catch (error) {
        res.status(404).json({
            data: {
                status: "fail",
                error
            }
        })
    }

}

module.exports = {
    registerUser
}