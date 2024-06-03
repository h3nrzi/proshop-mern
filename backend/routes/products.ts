import express from "express";
import * as productController from "../controllers/product";
import catchAsync from "../middlewares/catchAsync";
const router = express.Router();

router.route("/").get(catchAsync(productController.getAll));
router.route("/:id").get(catchAsync(productController.getOne));

export default router;
