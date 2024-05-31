import { apiSlice } from "redux/api/apiSlice";
import { store } from "redux/store";
import { UserData } from "redux/types/Settings/user";
import { setUser } from "redux/features/auth/authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
      transformResponse: (result: { payLoad: UserData }) => {
        store.dispatch(setUser(result.payLoad));
        return result.payLoad;
      },
    }),
    signup: builder.mutation({
      query: (credentials: {
        email: string;
        phone: string;
        password: string;
      }) => ({
        url: "/auth/registeradmin",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    forgetPassword: builder.mutation({
      query: (body: { email: string }) => ({
        url: "/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body: { code: string; newPassword: string }) => ({
        url: "/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;
