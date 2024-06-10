import { ORDER_URL } from "../constants";
import Order from "../entities/Order";
import apiSlice from "./api-slice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, Order>({
      query: (data) => ({
        url: ORDER_URL,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
