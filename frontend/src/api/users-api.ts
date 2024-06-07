import { USERS_URL } from "../constants";
import UserInfo from "../entities/UserInfo";
import apiSlice from "./api-slice";

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserInfo, { email: string; password: string }>({
      query: (data) => ({
        url: USERS_URL + "/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<{ message: "Logged out successfully!" }, void>({
      query: () => ({
        url: USERS_URL + "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = usersApi;
