import { apiSlice } from "redux/api/apiSlice";
import { FiscalYearResponse } from "redux/types/Finance/PrimaryData/fiscalyear";

export const cashPaymentVoucherApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["CashPaymentVoucher"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCashPaymentVoucher: builder.query<Array<FiscalYearResponse>, null>({
        query: () => ({ url: "/fiscalyear" }),
        providesTags: ["CashPaymentVoucher"],
        transformResponse: (result: {
          payLoad: Array<FiscalYearResponse>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      addCashPaymentVoucher: builder.mutation({
        query: (body) => ({
          url: "/fiscalyear",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["CashPaymentVoucher"],
      }),
      deleteCashPaymentVoucher: builder.mutation({
        query: (id: number) => ({
          url: "/fiscalyear/" + id,
          method: "DELETE",
        }),

        invalidatesTags: ["CashPaymentVoucher"],
      }),
      editCashPaymentVoucher: builder.mutation({
        query: (data) => ({
          url: "/fiscalyear",
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["CashPaymentVoucher"],
      }),
      getByIdCashPaymentVoucher: builder.query<FiscalYearResponse, string>({
        query: (id) => ({ url: "fiscalyear/" + id }),
        providesTags: ["CashPaymentVoucher"],
        transformResponse: (result: {
          payLoad: FiscalYearResponse;
          message: string;
        }) => {
          return result?.payLoad;
        },
      }),
    }),
  });

export const {
  useAddCashPaymentVoucherMutation,
  useGetCashPaymentVoucherQuery,
  useDeleteCashPaymentVoucherMutation,
  useLazyGetByIdCashPaymentVoucherQuery,
  useEditCashPaymentVoucherMutation,
} = cashPaymentVoucherApiSlice;
