import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const api = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"] as const,
  endpoints: () => ({}),
});

export default api;
