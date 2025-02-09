import express from "express";
import { upload } from "../middlewares/multer.middleware.js"; // Multer middleware
import { uploadFile } from "../controllers/file.controller.js"; // Controller

const router = express.Router();

// Route to handle file uploads
router.post("/upload", upload.single("file"), uploadFile);

export default router;
