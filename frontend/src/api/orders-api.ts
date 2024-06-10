import { ORDER_URL } from "../constants";
import Cart from "../entities/Cart";
import Order from "../entities/Order";
import apiSlice from "./api-slice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, Cart>({
      query: (data: Cart) => ({
        url: ORDER_URL,
        method: "POST",
        body: { ...data },
      }),
    }),

    getOrderDetails: builder.query<Order, string>({
      query: (orderId: string) => ({
        url: ORDER_URL + "/" + orderId,
        method: "GET",
      }),
      keepUnusedDataFor: 5, // 5s
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = orderApi;
