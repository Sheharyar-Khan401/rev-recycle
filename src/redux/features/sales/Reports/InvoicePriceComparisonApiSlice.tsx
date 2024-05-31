import { apiSlice } from "redux/api/apiSlice";
import { InvoicePriceComparison } from "redux/types/Sales/Reports/InvoicePriceComparison";
import { PayloadType } from "redux/types/common/types";

export const invoicePriceComparisonApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Reports"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getInvoicePriceComparison: builder.query<
        PayloadType<InvoicePriceComparison>,
        {}
      >({
        query: (data) => ({
          url:
            "/invoice/invoicePriceComparison?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Reports"],
      }),
    }),
  });

export const { useLazyGetInvoicePriceComparisonQuery } =
  invoicePriceComparisonApiSlice;
