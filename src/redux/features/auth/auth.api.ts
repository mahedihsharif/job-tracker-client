import type { IResponse } from "@/types";
import type {
  ILogin,
  IRegister,
  IUser,
  IUserResponse,
} from "@/types/auth.types";
import { baseApi } from "../../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Register a new user
    register: builder.mutation<IResponse<IUserResponse>, IRegister>({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["AUTH"],
    }),
    // Login a user
    login: builder.mutation<IResponse<IUserResponse>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["AUTH"],
    }),
    // Logout the current user
    logout: builder.mutation<IResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["AUTH"],
    }),
    // Get the current authenticated user's info
    getMe: builder.query<IResponse<IUser>, undefined>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["AUTH"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApi;
