import { combineReducers } from "@reduxjs/toolkit";
import api from "./api";

const reducer = combineReducers({
  api: api.reducer,
});

export default reducer;
