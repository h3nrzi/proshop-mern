import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cart from "../entities/Cart";
import Product from "../entities/Product";
import { updateCart } from "../utils/cart-utils";

const initialCartState: Cart = {
  cartItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  shippingAddress: null,
  paymentMethod: "PayPal",
};

const persistedCartState: Cart | null = JSON.parse(localStorage.getItem("cart")!);
const initialState: Cart = persistedCartState || initialCartState;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (cart, action: PayloadAction<Product>): void => {
      const existingItem = cart.cartItems.find((item) => item._id === action.payload._id);

      if (existingItem) {
        cart.cartItems = cart.cartItems.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      } else {
        cart.cartItems.push(action.payload);
      }

      cart = updateCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    },

    removeFromCart: (cart, action: PayloadAction<{ _id: string }>) => {
      cart.cartItems = cart.cartItems.filter((item) => item._id !== action.payload._id);

      cart = updateCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    },

    saveShippingAddress: (cart, action) => {
      cart.shippingAddress = action.payload;

      cart = updateCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions;
export default cartSlice;
