import { RequestHandler } from "express";
import CreateOrderDto from "../Dto/createOrderDto";
import Order from "../models/order";

// @desc    Get All Orders
// @route   GET /api/orders
// @access  Private - > Admin
export const getAllOrder: RequestHandler = async (req, res, next) => {
  res.status(200).send("get all orders");
};

// @desc    Get Order by ID
// @route   GET /api/orders/:id
// @access  Private -> Admin
export const getOneOrder: RequestHandler = async (req, res, next) => {
  res.status(200).send("get order");
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder: RequestHandler = async (req, res, next) => {
  const {
    orderItems,
    itemsPrice,
    paymentMethod,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body as CreateOrderDto;

  if (!orderItems || orderItems.length === 0) {
    res.status(404);
    throw new Error("No order items");
  }

  new Order({
    orderItems: orderItems.map((orderItem) => ({ ...orderItem, product: orderItem._id })),
    itemsPrice,
    paymentMethod,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalPrice,
  });

  res.status(200).send("add order items");
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders: RequestHandler = async (req, res, next) => {
  res.status(200).send("get my orders");
};

// @desc    Update order to paid
// @route   PATCH /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid: RequestHandler = async (req, res, next) => {
  res.status(200).send("update order to paid");
};

// @desc    Update order to delivered
// @route   PATCH /api/orders/:id/deliver
// @access  Private -> Admin
export const updateOrderToDeliver: RequestHandler = async (req, res, next) => {
  res.status(200).send("update order to delivered");
};
