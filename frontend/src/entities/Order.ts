import Product from "./Product";

export interface PaymentResult {
  id?: string;
  status?: string;
  update_time?: string;
  email_address?: string;
}

interface ShippingAddress {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

interface User {
  _id: string;
  email: string;
  name: string;
}

interface OrderItem {
  _id: string;
  image: string;
  name: string;
  price: number;
  product: Product | string;
  qty: number;
}

export default interface Order {
  __v: number;
  _id: string;
  createdAt: string;
  deliveredAt?: string;
  isDelivered: boolean;
  isPaid: boolean;
  itemsPrice: number;
  orderItems: OrderItem[];
  paidAt?: string;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  shippingAddress: ShippingAddress;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  updatedAt: string;
  user: User;
}
