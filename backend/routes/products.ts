import express, { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import Product from "../models/product";
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find();

    return res.json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

    if (product) return res.status(200).json(product);

    return res.status(404).json({ message: "Product not found" });
  })
);

export default router;
