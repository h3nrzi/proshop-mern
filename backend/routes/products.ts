import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  getTopProducts,
} from "../controllers/product";
import auth from "../middlewares/auth";
import catchAsync from "../middlewares/catchAsync";
const router = express.Router();

router.get("/", catchAsync(getAllProducts));
router.get("/top", catchAsync(getTopProducts));
router.get("/:id", catchAsync(getProduct));

/////////////////// Private
router.use(catchAsync(auth.protect));
router.post("/:id/review", catchAsync(createProductReview));

/////////////////// Admin
router.use(catchAsync(auth.admin));
router.post("/", catchAsync(createProduct));
router.route("/:id").patch(catchAsync(updateProduct)).delete(catchAsync(deleteProduct));

export default router;
