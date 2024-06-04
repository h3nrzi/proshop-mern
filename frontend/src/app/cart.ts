import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = localStorage.getItem("cart")
  ? { cartItems: JSON.parse(localStorage.getItem("cart") as string) }
  : { cartItems: [] };

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cart;
