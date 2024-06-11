import { ORDER_URL, PAYPAL_URL } from "../constants";
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

    getOrder: builder.query<Order, string>({
      query: (orderId: string) => ({ url: ORDER_URL + "/" + orderId }),
      keepUnusedDataFor: 5, // 5s
    }),

    payOrder: builder.mutation<Order, { orderId: string; details: any }>({
      query: ({ orderId, details }) => ({
        url: ORDER_URL + "/" + orderId + "/pay",
        method: "PATCH",
        body: { ...details },
      }),
    }),

    getPayPalClientId: builder.query<{ clientId: string }, void>({
      query: () => ({ url: PAYPAL_URL }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} = orderApi;
