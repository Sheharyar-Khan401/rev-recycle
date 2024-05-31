import { apiSlice } from "redux/api/apiSlice";
import { TransferSaleOrderUnits } from "redux/types/Productions/Reports/TransferSaleOrderUnits";
import { PayloadType } from "redux/types/common/types";

export const transferSaleOrderUnitsReportsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Reports"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTransferSaleOrderUnitsReports: builder.query<
        PayloadType<TransferSaleOrderUnits[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/transferredSaleOrderLog/transferSaleOrderReport?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Reports"],
      }),
    }),
  });

export const { useLazyGetTransferSaleOrderUnitsReportsQuery } =
  transferSaleOrderUnitsReportsApiSlice;
