import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "../entities/Product";

// Define a utility function to round numbers to two decimal places
function roundToTwoDecimals(num: number): number {
  return +(Math.round(num * 100) / 100).toFixed(2);
}

// Define the structure of the cart state
interface Cart {
  cartItems: Product[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

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

// Define the cart slice using createSlice from Redux Toolkit
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Reducer to handle adding items to the cart
    cartAdded: (cart, action: PayloadAction<Product>) => {
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

      // Calculate items price by summing up the prices of all items in the cart
      const subtotal = cart.cartItems.reduce((acc, item) => (acc + item.price) * item.qty, 0);
      cart.itemsPrice = roundToTwoDecimals(subtotal);

      // Calculate shipping price (free if order is over $100, otherwise $10 shipping)
      cart.shippingPrice = roundToTwoDecimals(subtotal >= 100 ? 0 : 10);

      // Calculate tax price (15% tax)
      cart.taxPrice = roundToTwoDecimals(+(subtotal * 0.15).toFixed(2));

      // Calculate total price by adding items price, shipping price, and tax price
      cart.totalPrice = +(cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2);

      // Persist the updated cart state in local storage
      localStorage.setItem("cart", JSON.stringify(cart));
    },
  },
});

// Export the cartAdded action creator and the default reducer from the cart slice
export const { cartAdded } = cartSlice.actions;
export default cartSlice;
