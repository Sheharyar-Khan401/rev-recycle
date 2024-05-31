import { apiSlice } from "redux/api/apiSlice";
import {
  Account,
  AccountRequest,
} from "redux/types/Finance/PrimaryData/account";
import { PayloadType } from "redux/types/common/types";

export const accountApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Account"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAccounts: builder.query<PayloadType<Account[]>, {}>({
        query: (data) => ({
          url: "/account?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Account"],
      }),
      getAllAccounts: builder.query<Array<Account>, null>({
        query: () => ({ url: "/account" }),
        providesTags: ["Account"],
        transformResponse: (result: {
          payLoad: Array<Account>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      addAccount: builder.mutation({
        query: (body: AccountRequest) => ({
          url: "/account",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Account"],
      }),
      deleteAccount: builder.mutation({
        query: (id: number) => ({
          url: "/account/" + id,
          method: "DELETE",
        }),

        invalidatesTags: ["Account"],
      }),
      editAccount: builder.mutation({
        query: (data: AccountRequest) => ({
          url: "/account",
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Account"],
      }),
      getByIdAccount: builder.query<Account, string>({
        query: (id) => ({ url: "account/" + id }),
        providesTags: ["Account"],
        transformResponse: (result: { payLoad: Account; message: string }) => {
          return result.payLoad;
        },
      }),
    }),
  });

export const {
  useAddAccountMutation,
  useGetAccountsQuery,
  useLazyGetAccountsQuery,
  useDeleteAccountMutation,
  useLazyGetByIdAccountQuery,
  useEditAccountMutation,
  useGetAllAccountsQuery,
} = accountApiSlice;
