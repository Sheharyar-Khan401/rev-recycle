import { apiSlice } from "redux/api/apiSlice";
import {
  BankAccount,
} from "redux/types/Finance/PrimaryData/bankAccount";
import { PayloadType } from "redux/types/common/types";

export const bankAccountApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Account"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getbankAccounts: builder.query<PayloadType<BankAccount[]>, {}>({
        query: () => ({ url: "/bankAccount" }),
        providesTags: ["Account"],
      }),
      getAllbankAccounts: builder.query<BankAccount[], {}>({
        query: () => ({ url: "/bankAccount" }),
        providesTags: ["Account"],
        transformResponse: (result: {
          payLoad: BankAccount[];
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      addbankAccounts: builder.mutation({
        query: (body: BankAccount) => ({
          url: "/bankAccount",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Account"],
      }),
      deletebankAccount: builder.mutation({
        query: (id: number) => ({
          url: "/bankAccount/" + id,
          method: "DELETE",
        }),

        invalidatesTags: ["Account"],
      }),

      editBankAccount: builder.mutation({
        query: (data: BankAccount) => ({
          url: `/bankAccount/${data?.bankAccountId}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Account"],
      }),
      getbyByIdbankAccount: builder.query<BankAccount, string>({
        query: (id) => ({ url: "bankAccount/" + id }),
        providesTags: ["Account"],
        transformResponse: (result: {
          payLoad: BankAccount;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });

export const {
  useGetbankAccountsQuery,
  useGetAllbankAccountsQuery,
  useLazyGetbankAccountsQuery,
  useAddbankAccountsMutation,
  useDeletebankAccountMutation,
  useLazyGetbyByIdbankAccountQuery,
  useEditBankAccountMutation,
} = bankAccountApiSlice;
