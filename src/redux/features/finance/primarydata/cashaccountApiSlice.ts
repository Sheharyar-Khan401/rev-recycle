import { apiSlice } from "redux/api/apiSlice";
import {
  CashAccount
} from "redux/types/Finance/PrimaryData/cashaccount";

export const cashAccountApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["CashAccount"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCashAccount: builder.query<Array<CashAccount>, null|undefined>({
        query: () => ({ url: "cashAccount" }),
        providesTags: ["CashAccount"],
        transformResponse: (result: {
          payLoad: Array<CashAccount>;
          message: string;
        }) => {
          return result.payLoad ? result.payLoad : [];
        },
      }),
      addCashAccount: builder.mutation({
        query: (body: { rowDat: CashAccount[] }) => ({
          url: "/cashAccount",
          method: "POST",
          body: body.rowDat,
        }),
        invalidatesTags: ["CashAccount"],
      }),
    }),
  });
export const { useAddCashAccountMutation, useGetCashAccountQuery } =
  cashAccountApiSlice;
