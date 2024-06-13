import express from "express";
import { getProduct, getProducts } from "../controllers/product";
import catchAsync from "../middlewares/catchAsync";
import auth from "../middlewares/auth";
const router = express.Router();

router.route("/").get(catchAsync(getProducts));
router.route("/:id").get(catchAsync(getProduct));

/////////////////// Admin
router.use(catchAsync(auth.protect), catchAsync(auth.admin));

export default router;
