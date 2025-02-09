const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ["Vegetables", "Fruits", "Dairy", "Livestock"]
    },
    pricePerUnit: {
        type: Number,
        required: true,
        min: 0
    },
    unitType: {
        type: String,
        required: true,
        enum: ["kg", "g", "L", "mL", "unit"]
    },
    quantityAvailable: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Available", "Sold Out", "Expired"]
    },
    expiresAt: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        default: ""
    }
},{
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);