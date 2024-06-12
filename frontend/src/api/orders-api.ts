import { ORDER_URL, PAYPAL_URL } from "../constants";
import Cart from "../entities/Cart";
import Order from "../entities/Order";
import apiSlice from "./api-slice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => ({ url: ORDER_URL }),
      keepUnusedDataFor: 5,
    }),

    getOrder: builder.query<Order, string>({
      query: (orderId: string) => ({ url: ORDER_URL + "/" + orderId }),
      keepUnusedDataFor: 5,
    }),

    getPayPalClientId: builder.query<{ clientId: string }, void>({
      query: () => ({ url: PAYPAL_URL }),
      keepUnusedDataFor: 5,
    }),

    getMyOrders: builder.query<Order[], void>({
      query: () => ({ url: ORDER_URL + "/myorders" }),
      keepUnusedDataFor: 5,
    }),

    createOrder: builder.mutation<Order, Cart>({
      query: (data: Cart) => ({
        url: ORDER_URL,
        method: "POST",
        body: { ...data },
      }),
    }),

    updateOrderToPaid: builder.mutation<Order, { orderId: string; details: any }>({
      query: ({ orderId, details }) => ({
        url: ORDER_URL + "/" + orderId + "/pay",
        method: "PATCH",
        body: { ...details },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderQuery,
  useGetOrdersQuery,
  useGetPayPalClientIdQuery,
  useUpdateOrderToPaidMutation,
} = orderApi;
