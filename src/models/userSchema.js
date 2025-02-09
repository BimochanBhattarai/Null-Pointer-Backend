const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keysecret = process.env.JWT_SECRET || "defaultsecretkey";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isMobilePhone(value, "any")) {
                throw new Error("Invalid phone number format");
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email format");
            }
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    verifyToken: {
        type: String,
    }
},
{
    timestamps: true
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// Token generation method
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, keysecret, { expiresIn: "1d" });
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (error) {
        throw new Error("Token generation failed");
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
