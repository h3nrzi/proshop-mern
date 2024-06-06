import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cart from "../entities/Cart";
import Product from "../entities/Product";
import { updateCart } from "../utils/cart-utils";

// Initialize the cart state
const initialCartState: Cart = {
  cartItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

// Retrieve cart state from local storage or use initial state if not available
const persistedCartState: Cart | null = JSON.parse(localStorage.getItem("cart")!);
const initialState: Cart = persistedCartState || initialCartState;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Reducer to handle adding items to the cart
    addToCart: (cart, action: PayloadAction<Product>): void => {
      // Check if the item being added already exists in the cart
      const existingItem = cart.cartItems.find((item) => item._id === action.payload._id);

      // If the item exists, update its quantity, otherwise add it to the cart
      if (existingItem) {
        cart.cartItems = cart.cartItems.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      } else {
        cart.cartItems.push(action.payload);
      }

      // Recalculate items price + shipping price + tax price + total price
      cart = updateCart(cart);

      // Persist the updated cart state in local storage
      localStorage.setItem("cart", JSON.stringify(cart));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice;
