import Product from "./Product";
import ShippingAddress from "./ShippingAddress";

export default interface Cart {
  orderItems: Product[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAddress: ShippingAddress | null;
  paymentMethod: string | null;
}
