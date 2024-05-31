import { apiSlice } from "redux/api/apiSlice";
import { DailyProductionProfit } from "redux/types/Sales/Reports/DailyProductionProfit";
import { PayloadType } from "redux/types/common/types";

export const dailyProductionProfitApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Reports"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getDailyProductionProfitReports: builder.query<
        PayloadType<DailyProductionProfit[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/dailyProduct/dailyProductionProfit?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["Reports"],
      }),
    }),
  });

export const { useLazyGetDailyProductionProfitReportsQuery } =
  dailyProductionProfitApiSlice;
