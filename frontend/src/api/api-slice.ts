import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"] as const,
  endpoints: () => ({}),
});

export default apiSlice;
