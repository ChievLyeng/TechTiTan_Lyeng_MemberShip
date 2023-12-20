const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        require: [true, "username is require"],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        require: [true, "email is require"],
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    birthDate: {
        type: Date,
        required: [true, "Birthdate is required."],
    },
    gender: {
        type: String,
        enum: {
            values: ["Male", "Female", "Other"],
            message: 'Gender can only have Male, Female, Other'
        },
        required: [true, "Gender is required."],
    },
    phoneNumber : {
        type: Number, 
    },
    profile: String,
    role: {
        type: String,
        enum: {
            values: ["user", "admin"],
            message: 'User type either user, admin'
        },
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
        require: [true, "Password is require."],
        validate: [validator.isStrongPassword, "Password must contain character, number and symbol."]
    },
    confirmPassword: {
        type: String,
        require: [true, "Confirm password is require."],
        // This only work with create and save
        validate: {
            validator: function(el) {
                return el === this.password
            }
        }
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
    }
}, {
    timestamps: true,
});

userSchema.pre('save', async function(next) {
    // only run if password modified
    if(!this.isModified('password')){
        return next()
    }
    
    // hash password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // delete confirmpassword when compared
    this.confirmPassword = undefined;
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;