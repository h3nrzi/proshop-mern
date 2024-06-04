import { combineReducers } from "@reduxjs/toolkit";
import api from "../api/api";
import cart from "./cart";

const reducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [cart.name]: cart.reducer,
});

export default reducer;
