import apiSlice from "./apiSlice";
import { PRODUCT_URL } from "../constants";
import Product from "../entities/Product";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({ url: PRODUCT_URL }),
      keepUnusedDataFor: 5, // 5 seconds
    }),

    getProduct: builder.query<Product, string>({
      query: (productId) => ({ url: PRODUCT_URL + "/" + productId }),
      keepUnusedDataFor: 5, // 5 seconds
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;
