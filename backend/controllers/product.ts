import { Request } from "express";
import { RequestHandler } from "express";
import Product from "../models/product";
// import CreateProductDto from "../Dto/CreateProductDto";

export interface CustomRequest extends Request {
  user?: any;
}

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

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct: RequestHandler = async (req: CustomRequest, res, next) => {
  // const { name, price, image, brand, category, countInStock, numReviews, description } =
  //   req.body as CreateProductDto;

  const product = new Product({
    user: req.user._id,
    name: "Sample name",
    price: 0,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
};
