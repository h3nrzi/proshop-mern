import { Request, RequestHandler } from "express";
import CreateOrderDto from "../Dto/CreateOrderDto";
import UpdateOrderToPaidDto from "../Dto/UpdateOrderToPaidDto";
import Order from "../models/order";

export interface CustomRequest extends Request {
  user?: any;
}

// @desc    Get All Orders
// @route   GET /api/orders
// @access  Private - > Admin
export const getOrders: RequestHandler = async (req, res, next) => {
  const orders = await Order.find().populate("user", "_id name");
  res.status(200).send(orders);
};

// @desc    Get Order by ID
// @route   GET /api/orders/:id
// @access  Private -> Admin
export const getOrder: RequestHandler = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (!order) {
    res.status(404);
    throw new Error("Order not found!");
  }

  return res.json(order);
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder: RequestHandler = async (req: CustomRequest, res, next) => {
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

  const createdOrder = new Order({
    orderItems: orderItems.map((orderItem) => ({
      ...orderItem,
      product: orderItem._id,
      _id: undefined,
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  await createdOrder.save();

  res.status(201).json(createdOrder);
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders: RequestHandler = async (req: CustomRequest, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).send(orders);
};

// @desc    Update order to paid
// @route   PATCH /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid: RequestHandler = async (req, res, next) => {
  const { id, status, update_time, payer } = req.body as UpdateOrderToPaidDto;

  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found!");
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id,
    status,
    update_time,
    payer: { ...payer, email_address: payer.email_address },
  };
  await order.save();

  return res.status(200).json(order);
};

// @desc    Update order to delivered
// @route   PATCH /api/orders/:id/deliver
// @access  Private -> Admin
export const updateOrderToDeliver: RequestHandler = async (req, res, next) => {
  res.status(200).send("update order to delivered");
};
