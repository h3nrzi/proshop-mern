import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import Product from "../entities/Product";
import apiSlice from "./api-slice";

interface ProductResponses {
  GetAll: {
    products: Product[];
    page: number;
    pages: number;
  };
  GetOne: Product;
  Create: Product;
  Update: Product;
  Delete: {
    message: string;
  };
  UploadImage: {
    message: string;
    image: string;
  };
  CreateReview: {
    message: string;
  };
}

const PRODUCT_TAG = "Product";
const KEEP_UNUSED_DATA_FOR = 5 * 60 * 1000; // 5 minutes

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query<ProductResponses["GetAll"], { pageNumber?: number }>({
      query: ({ pageNumber }) => ({
        url: PRODUCT_URL,
        params: { pageNumber },
      }),
      keepUnusedDataFor: KEEP_UNUSED_DATA_FOR,
      providesTags: [PRODUCT_TAG],
    }),

    getProduct: builder.query<ProductResponses["GetOne"], { productId: string }>({
      query: ({ productId }) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: KEEP_UNUSED_DATA_FOR,
    }),

    createProduct: builder.mutation<ProductResponses["Create"], void>({
      query: () => ({
        url: PRODUCT_URL,
        method: "POST",
      }),
      invalidatesTags: [PRODUCT_TAG],
    }),

    updateProduct: builder.mutation<
      ProductResponses["Update"],
      { productId: string; data: Product }
    >({
      query: ({ productId, data }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [PRODUCT_TAG],
    }),

    deleteProduct: builder.mutation<ProductResponses["Delete"], { productId: string }>({
      query: ({ productId }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [PRODUCT_TAG],
    }),

    uploadProductImage: builder.mutation<ProductResponses["UploadImage"], FormData>({
      query: (formData) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [PRODUCT_TAG],
    }),

    createProductReview: builder.mutation<
      ProductResponses["CreateReview"],
      { comment: string; rating: number; productId: string }
    >({
      query: ({ comment, rating, productId }) => ({
        url: `${PRODUCT_URL}/${productId}/review`,
        method: "POST",
        body: { comment, rating, productId },
      }),
      invalidatesTags: [PRODUCT_TAG],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImageMutation,
  useCreateProductReviewMutation,
} = productApi;

export default productApi;
