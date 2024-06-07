import { combineReducers } from "@reduxjs/toolkit";
import apiSlice from "../api/api-slice";
import cartSlice from "./cart-slice";
import authSlice from "./auth-slice";

const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

export default reducer;
