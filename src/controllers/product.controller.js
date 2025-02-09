import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().populate("sellerId", "username email");
    return res
        .status(200)
        .json(new ApiResponse(200, products, "Products retrieved successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate("sellerId", "username email");
    
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    
    return res
        .status(200)
        .json(new ApiResponse(200, product, "Product retrieved successfully"));
});

const createProduct = asyncHandler(async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const { productName, productDetails, minBidAmount, maxBidAmount, biddingEndDate, category, quantity, location } = req.body;
    
    if (
        [productName, productDetails, minBidAmount, biddingEndDate, category, quantity, location].some(
            field => !field || field.toString().trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const productImageLocalPath = req.file?.path;
    if (!productImageLocalPath) {
        throw new ApiError(400, "Product image is required");
    }

    const productImage = await uploadOnCloudinary(productImageLocalPath);
    if (!productImage?.url) {
        throw new ApiError(400, "Product image upload failed");
    }

    const product = await Product.create({
        productName,
        productDetails,
        productImage: productImage.url,
        minBidAmount,
        maxBidAmount: maxBidAmount || null,
        biddingEndDate,
        category,
        sellerId: req.user._id,
        quantity,
        location
    });

    return res
        .status(201)
        .json(new ApiResponse(201, product, "Product created successfully"));
});

const updateProductImage = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    
    if (!req.file?.path) {
        throw new ApiError(400, "Product image file is required");
    }

    const productImage = await uploadOnCloudinary(req.file.path);
    if (!productImage?.url) {
        throw new ApiError(400, "Failed to upload product image");
    }

    const updatedProduct = await Product.findOneAndUpdate(
        {
            _id: productId,
            sellerId: req.user._id
        },
        {
            $set: { productImage: productImage.url }
        },
        { new: true }
    );

    if (!updatedProduct) {
        throw new ApiError(404, "Product not found or unauthorized");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedProduct, "Product image updated"));
});

const updateProductDetails = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const updateData = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
        {
            _id: productId,
            sellerId: req.user._id
        },
        updateData,
        { new: true }
    );

    if (!updatedProduct) {
        throw new ApiError(404, "Product not found or unauthorized");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedProduct, "Product updated"));
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findOneAndDelete({
        _id: productId,
        sellerId: req.user._id
    });

    if (!product) {
        throw new ApiError(404, "Product not found or unauthorized");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Product deleted successfully"));
});

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductImage,
    updateProductDetails,
    deleteProduct
};