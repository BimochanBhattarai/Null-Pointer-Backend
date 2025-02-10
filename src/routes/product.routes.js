import { Router } from "express";
import { 
    createProduct,
    getAllProducts,
    getProductById,
    updateProductImage,
    updateProductDetails,
    deleteProduct
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.route("/")
    .get(getAllProducts);

router.post(
    "/",
    // verifyJWT,
    upload.single("productImage"),
    createProduct
);

router.route("/:productId")
    .get(getProductById);

// Protected routes (require authentication)
router.use(verifyJWT); // Applies JWT verification to all following routes

router.route("/")
    .post(upload.single("productImage"), createProduct);

router.route("/:productId")
    .patch(updateProductDetails)
    .delete(deleteProduct);

router.route("/:productId/image")
    .patch(upload.single("productImage"), updateProductImage);

export default router;