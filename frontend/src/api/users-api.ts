import { USERS_URL } from "../constants";
import { UserInfo } from "../entities/Auth";
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
    getUsers: builder.query<UserInfo[], void>({
      query: () => ({ url: USERS_URL }),
      providesTags: ["User"],
      keepUnusedDataFor: 10,
    }),

    getUser: builder.query<UserInfo, string>({
      query: (userId) => ({ url: USERS_URL + "/" + userId }),
      keepUnusedDataFor: 10,
    }),

    deleteUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: USERS_URL + "/" + userId,
        method: "DELETE",
      }),
    }),

    updateUser: builder.mutation<UserInfo, { userId: string; data: UserInfo }>({
      query: ({ userId, data }) => ({
        url: USERS_URL + "/" + userId,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

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
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useUpdateUserMutation,
} = usersApi;
