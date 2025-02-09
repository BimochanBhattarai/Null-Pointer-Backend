require("dotenv").config();
const mongoose = require("mongoose");

const DB = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log("Database Connected");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1); // Exit on failure
    }
};

module.exports = connectDB;
