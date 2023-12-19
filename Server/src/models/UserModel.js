const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        require: [true, "username is require"]
    },
    email: {
        type: String,
        unique: true,
        require: [true, "email is require"]
    },
    birthDate: {
        type: Date,
        required: [true, "Birthdate is required."],
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: [true, "Gender is required."],
    },
    address: {
        city: {
            type: String,
            trim: true,
        },
        commune: {
            type: String,
            trim: true,
        },
        district: {
            type: String,
            trim: true,
        },
        village: {
            type: String,
            trim: true,
        },
        homeNumber: {
            type: Number,
            trim: true,
        },
        street: {
            type: String,
            trim: true,
        },
    },
    role: {
        type: String,
        enum: ["user", "supplier", "admin"],
        default: "user",
    },
    verified: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    lastLogin: {
        type: String,
        default: new Date().toLocaleString(),
    },
    password: {
        type: String,
        require: [true, "Password is require."]
    },
    confirmPassword: {
        type: String,
        require: [true, "Confirm password is require."]
    }
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema);
module.exports = User;