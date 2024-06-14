import apiSlice from "./api-slice";
import { PRODUCT_URL } from "../constants";
import Product from "../entities/Product";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({ url: PRODUCT_URL }),
      keepUnusedDataFor: 10, // 10 seconds
      providesTags: ["Product"],
    }),

    getProduct: builder.query<Product, string>({
      query: (productId) => ({ url: PRODUCT_URL + "/" + productId }),
      keepUnusedDataFor: 10, // 10 seconds
    }),

    createProduct: builder.mutation<Product, void>({
      query: () => ({
        url: PRODUCT_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<Product, { productId: string; data: Product }>({
      query: ({ productId, data }) => ({
        url: PRODUCT_URL + "/" + productId,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productApi;
