import { combineReducers } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";
import cartSlice from "./cartSlice";

const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
});

export default reducer;
