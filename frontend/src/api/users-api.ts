import { USERS_URL } from "../constants";
import UserInfo from "../entities/UserInfo";
import apiSlice from "./api-slice";

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserInfo, { email: string; password: string }>({
      query: (data) => ({
        url: USERS_URL + "/auth",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApi;
