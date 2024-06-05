import Product from "./Product";

export default interface Cart {
  cartItems: Product[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}
