import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,  // Cloudinary URL
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

export const File = mongoose.model("File", fileSchema);
