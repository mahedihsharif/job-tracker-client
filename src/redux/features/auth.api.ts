import type { IResponse } from "@/types";
import type { ILogin, IRegister, IUserResponse } from "@/types/auth.types";
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IResponse<IUserResponse>, IRegister>({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["AUTH"],
    }),
    login: builder.mutation<IResponse<IUserResponse>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["AUTH"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
