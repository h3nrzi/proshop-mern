import api from "./api";
import { PRODUCT_URL } from "../constants";
import Product from "../src/entities/Product";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({ url: PRODUCT_URL }),
      keepUnusedDataFor: 5, // 5 seconds
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
