import express from "express";
import { createProduct, getProduct, getProducts, updateProduct } from "../controllers/product";
import auth from "../middlewares/auth";
import catchAsync from "../middlewares/catchAsync";
const router = express.Router();

router.route("/").get(catchAsync(getProducts));
router.route("/:id").get(catchAsync(getProduct));

/////////////////// Admin
router.use(catchAsync(auth.protect), catchAsync(auth.admin));
router.route("/").post(catchAsync(createProduct));
router.route("/:id").patch(catchAsync(updateProduct));

export default router;
