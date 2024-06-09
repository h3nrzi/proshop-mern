import express from "express";
import {
  createOrder,
  getAllOrder,
  getMyOrders,
  getOneOrder,
  updateOrderToDeliver,
  updateOrderToPaid,
} from "../controllers/order";
import * as auth from "../middlewares/auth";
import catchAsync from "../middlewares/catchAsync";
const router = express.Router();

////////// Private
router.use(catchAsync(auth.protect));
router.get("/myorders", catchAsync(getMyOrders));
router.post("/", catchAsync(createOrder));
router.patch("/:id/pay", catchAsync(updateOrderToPaid));

////////// Admin
router.use(catchAsync(auth.admin));
router.get("/", catchAsync(getAllOrder));
router.get("/:id", catchAsync(getOneOrder));
router.patch("/:id/deliver", catchAsync(updateOrderToDeliver));

export default router;
