import { USERS_URL } from "../constants";
import UserInfo from "../entities/UserInfo";
import apiSlice from "./api-slice";

interface UpdateProfileData {
  _id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserInfo, LoginData>({
      query: (data) => ({
        url: USERS_URL + "/login",
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation<UserInfo, RegisterData>({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: USERS_URL + "/logout",
        method: "POST",
      }),
    }),

    updateProfile: builder.mutation<UserInfo, UpdateProfileData>({
      query: (data) => ({
        url: USERS_URL + "/profile",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
} = usersApi;
