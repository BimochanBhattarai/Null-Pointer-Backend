import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [5, "Product name must be at least 5 characters"],
        maxlength: [100, "Product name cannot exceed 100 characters"]
    },
    productDetails: {
        type: String,
        required: [true, "Product details are required"],
        trim: true,
        minlength: [20, "Product details must be at least 20 characters"]
    },
    productImage: {
        type: String,
        required: [true, "Product image URL is required"],
        validate: {
            validator: v => v.startsWith("http://") || v.startsWith("https://"),
            message: "Image URL must start with http:// or https://"
        }
    },
    minBidAmount: {
        type: Number,
        required: [true, "Minimum bid amount is required"],
        min: [1, "Minimum bid must be at least 1"]
    },
    maxBidAmount: {
        type: Number,
        min: [1, "Maximum bid must be at least 1"],
        validate: {
            validator: function(v) {
                return v > this.minBidAmount;
            },
            message: "Maximum bid must be greater than minimum bid"
        }
    },
    lastBidAmount: {
        type: Number,
        default: 0,
        min: [0, "Bid amount cannot be negative"]
    },
    biddingEndDate: {
        type: Date,
        required: [true, "Bidding end date is required"],
        validate: {
            validator: v => v > Date.now(),
            message: "Bidding end date must be in the future"
        }
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["Plastic", "Organic", "Paper", "Metal", "Glass"]
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
        match: [/^\d+\s*[a-zA-Z]+$/, 'Use format like "10 kg" or "50units"']
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,
        minlength: [5, "Location must be at least 5 characters"]
    }
});

export const Product = mongoose.model("Product", productSchema);