import express from "express";
import {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
} from "../controllers/product";
import auth from "../middlewares/auth";
import catchAsync from "../middlewares/catchAsync";
const router = express.Router();

router.route("/").get(catchAsync(getAllProducts));
router.route("/:id").get(catchAsync(getProduct));

/////////////////// Private
router.use(catchAsync(auth.protect));
router.post("/:id/review", catchAsync(createProductReview));

/////////////////// Admin
router.use(catchAsync(auth.admin));
router.route("/").post(catchAsync(createProduct));
router.route("/:id").patch(catchAsync(updateProduct)).delete(catchAsync(deleteProduct));

export default router;
