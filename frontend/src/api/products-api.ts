import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import Product from "../entities/Product";
import apiSlice from "./api-slice";

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

    uploadProductImage: builder.mutation<{ message: string; image: string }, FormData>({
      query: (formData) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} = productApi;
