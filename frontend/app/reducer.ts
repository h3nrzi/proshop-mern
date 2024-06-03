import { combineReducers } from "@reduxjs/toolkit";
import api from "../api/api";

const reducer = combineReducers({
  [api.reducerPath]: api.reducer,
});

export default reducer;
