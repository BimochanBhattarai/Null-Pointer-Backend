import { uploadOnClaudinary } from "../utils/cloudinary.js";
import { File } from "../models/file.model.js";

/**
 * @desc Upload file to Cloudinary and save metadata in MongoDB
 * @route POST /api/upload
 * @access Public
 */
export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Upload file to Cloudinary
        const cloudinaryResponse = await uploadOnClaudinary(req.file.path);

        if (!cloudinaryResponse) {
            return res.status(500).json({ error: "Failed to upload file to Cloudinary" });
        }

        // Save file metadata to MongoDB
        const newFile = new File({
            filename: req.file.originalname,
            fileUrl: cloudinaryResponse.secure_url, // Cloudinary's secure URL
        });

        await newFile.save();

        res.status(201).json({
            message: "File uploaded successfully",
            file: newFile
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Server error during file upload" });
    }
};
