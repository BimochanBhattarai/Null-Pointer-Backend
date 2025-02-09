// require("dotenv").config();
const mongoose = require("mongoose");

// const DB = process.env.MONGO_URI;

// const connectDB = async () => {
//     try {
//         await mongoose.connect(DB);
//         console.log("Database Connected");
//     } catch (err) {
//         console.error("Database connection error:", err);
//         process.exit(1); // Exit on failure
//     }
// };

// module.exports = connectDB;

// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

module.exports = connectDB;