import { ORDER_URL, PAYPAL_URL } from "../constants";
import Cart from "../entities/Cart";
import Order from "../entities/Order";
import apiSlice from "./api-slice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => ({ url: ORDER_URL }),
      keepUnusedDataFor: 1,
    }),

    getOrder: builder.query<Order, string>({
      query: (orderId: string) => ({ url: ORDER_URL + "/" + orderId }),
      keepUnusedDataFor: 1,
    }),

    getPayPalClientId: builder.query<{ clientId: string }, void>({
      query: () => ({ url: PAYPAL_URL }),
      keepUnusedDataFor: 1,
    }),

    getMyOrders: builder.query<Order[], void>({
      query: () => ({ url: ORDER_URL + "/myorders" }),
      keepUnusedDataFor: 1,
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

    updateOrderToDeliver: builder.mutation<Order, string>({
      query: (orderId) => ({
        url: ORDER_URL + "/" + orderId + "/deliver",
        method: "PATCH",
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
  useUpdateOrderToDeliverMutation,
  useUpdateOrderToPaidMutation,
} = orderApi;
