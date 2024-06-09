import { ORDER_URL } from "../constants";
import Cart from "../entities/Cart";
import Order from "../entities/Order";
import apiSlice from "./api-slice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, Cart>({
      query: (data) => ({
        url: ORDER_URL,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
