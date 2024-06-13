import { RequestHandler } from "express";
import Product from "../models/product";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts: RequestHandler = async (req, res, next) => {
  const products = await Product.find();
  return res.json(products);
};

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
export const getProduct: RequestHandler = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  return res.status(200).json(product);
};
