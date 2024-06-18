import { Request } from "express";
import { RequestHandler } from "express";
import Product from "../models/product";
import UpdateProductDto from "../Dto/Order/UpdateProductDto";
import CreateProductReview from "../Dto/Product/CreateProductReview";
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

// @desc    Update a product
// @route   PATCH /api/products/:id
// @access  Private/admin
export const updateProduct: RequestHandler = async (req, res, next) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body as UpdateProductDto;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();

  return res.json(updatedProduct);
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/admin
export const deleteProduct: RequestHandler = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Product.deleteOne({ _id: product._id });

  return res.status(200).json({ message: "Product deleted successfully" });
};

// @desc    Upload product image
// @route   PATCH /api/products/:id
// @access  Private/Admin
export const uploadProductImage: RequestHandler = (req, res, next) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
  }

  return res.send({
    message: "Image Uploaded",
    image: "/" + req.file.path,
  });
};

// @desc    Create a new review
// @route   POST /api/products/:id/review
// @access  Private/Admin
export const createProductReview: RequestHandler = async (req: CustomRequest, res, next) => {
  const { comment, rating } = req.body as CreateProductReview;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Product already reviewed");
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating,
    comment,
  };

  await product.addReview(review);
  await product.save();

  res.status(201).json({ message: "Review Added" });
};
