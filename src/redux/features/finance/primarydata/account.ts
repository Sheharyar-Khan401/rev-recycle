import { apiSlice } from "redux/api/apiSlice";
import {
  Account,
  AccountRequest,
} from "redux/types/Finance/PrimaryData/account";

export const accountApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Account"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAccounts: builder.query<Array<Account>, null>({
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
  useDeleteAccountMutation,
  useLazyGetByIdAccountQuery,
  useEditAccountMutation,
} = accountApiSlice;
