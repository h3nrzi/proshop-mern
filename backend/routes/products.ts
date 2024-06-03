import express, { NextFunction, Request, Response } from "express";
import catchAsync from "../middlewares/catchAsync";
import Product from "../models/product";
const router = express.Router();

router.get(
  "/",
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find();

    return res.json(products);
  })
);

router.get(
  "/:id",
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    return res.status(200).json(product);
  })
);

export default router;
