import express from "express";
import { createProductReview } from "../controllers/product";
import authMiddleware from "../middlewares/auth";
import catchAsync from "../middlewares/catchAsync";
import uploadMiddleware from "../middlewares/upload";
const router = express.Router();

router.use(authMiddleware.protect, authMiddleware.admin);
router.post("/", uploadMiddleware.single("image"), catchAsync(createProductReview));

export default router;
