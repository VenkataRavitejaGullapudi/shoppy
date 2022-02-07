const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jwt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [40, "Name should be under 40 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        validate: [validator.isEmail, "Please enter email in correct format"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "password should be atleast 6 char"],
        select: false,
    },
    role: {
        type: String,
        default: "user",
    },
    photo: {
        id: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// Encrypt password before save - Hooks
userSchema.pre('save', async function () {
    if (!this.isModified("password"))
        return next()
    this.password = await bcrypt.hash(this.password, 10)
})

// Validate the password with user entered password
userSchema.methods.isValidPassword = async (userEnteredPassword) => {
    return bcrypt.compare(userEnteredPassword, this.password)
}

// Create and return a JWT token
userSchema.methods.getJwtToken = async () => {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
}

module.exports = mongoose.model("User", userSchema)