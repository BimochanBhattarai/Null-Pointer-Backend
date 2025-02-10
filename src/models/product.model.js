import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [2, "Product name must be at least 2 characters"],
        maxlength: [100, "Product name cannot exceed 100 characters"]
    },
    productDetails: {
        type: String,
        required: [true, "Product details are required"],
        trim: true,
        minlength: [5, "Product details must be at least 5 characters"]
    },
    productImage: {
        type: String,
        required: [true, "Product image URL is required"],
    },
    minBidAmount: {
        type: Number,
        required: [true, "Minimum bid amount is required"],
        min: [1, "Minimum bid must be at least 1"]
    },
    maxBidAmount: {
        type: Number,
        min: [1, "Maximum bid must be at least 1"],
    },
    lastBidAmount: {
        type: Number,
        default: 0,
        min: [0, "Bid amount cannot be negative"]
    },
    biddingEndDate: {
        type: String,
        required: [true, "Bidding end date is required"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Seller ID is required"],
        index: true
    },
    quantity: {
        type: String,
        required: [true, "Quantity is required"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,
        minlength: [5, "Location must be at least 5 characters"]
    }
});

export const Product = mongoose.model("Product", productSchema);