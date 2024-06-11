import { model, Schema, Types, Document } from "mongoose";

interface OrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: Types.ObjectId;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  payer: { email_address: string };
}

interface IOrder extends Document {
  user: Types.ObjectId;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: number;
  isDelivered: boolean;
  deliveredAt?: number;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },

    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, require: true },
        image: { type: String, require: true },
        price: { type: Number, require: true },
        product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
      },
    ],

    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      payer: { email_address: { type: String } },
    },

    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },

    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },

    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
