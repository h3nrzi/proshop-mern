import Product from "./Product";
import ShippingAddress from "./ShippingAddress";

interface OrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string | Product[];
}

interface PaymentResult {
  id?: string;
  status?: string;
  update_time?: string;
  email_address?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

export default interface Order {
  user: string | User;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}
