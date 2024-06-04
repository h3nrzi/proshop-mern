import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function addDecimals(num: number): number {
  return +(Math.round(num * 100) / 100).toFixed(2);
}

interface CartItem {
  _id: number;
  name: string;
  price: number;
  qty: number;
}

interface Cart {
  cartItems: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

const cart: Cart = {
  cartItems: JSON.parse(localStorage.getItem("cart") || "[]"),
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cart,
  reducers: {
    cartAdded: (cart, action: PayloadAction<CartItem>) => {
      const existingItem = cart.cartItems.find((item) => item._id === action.payload._id);

      if (existingItem) {
        cart.cartItems = cart.cartItems.map((item) =>
          item._id === action.payload._id ? existingItem : item
        );
      } else {
        cart.cartItems.push(action.payload);
      }

      // Calculate items price
      const subtotal = cart.cartItems.reduce((acc, item) => (acc + item.price) * item.qty, 0);
      cart.itemsPrice = addDecimals(subtotal);

      // Calculate shipping price
      // (if order is over $100 then free, else $10 shipping)
      cart.shippingPrice = addDecimals(subtotal >= 100 ? 0 : 10);

      // Calculate tax price (15% tax)
      cart.taxPrice = addDecimals(+(subtotal * 0.15).toFixed(2));

      // Calculate total Price
      cart.totalPrice = +(cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(cart));
    },
  },
});

export const { cartAdded } = cartSlice.actions;
export default cartSlice;
