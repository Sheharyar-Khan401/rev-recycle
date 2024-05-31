import { apiSlice } from "redux/api/apiSlice";
import { DailyProductionProfit } from "redux/types/Sales/Reports/DailyProductionProfit";
import { PayloadType } from "redux/types/common/types";

export const productionProfitApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Reports"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProductionProfitReports: builder.query<
        PayloadType<DailyProductionProfit[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/dailyProduct/productionProfit?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["Reports"],
      }),
    }),
  });

export const { useLazyGetProductionProfitReportsQuery } =
  productionProfitApiSlice;
