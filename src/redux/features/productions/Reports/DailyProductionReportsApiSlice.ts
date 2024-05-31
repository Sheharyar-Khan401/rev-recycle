import { apiSlice } from "redux/api/apiSlice";
import { DailyProduction } from "redux/types/Productions/Reports/DailyProduction";
import { PayloadType } from "redux/types/common/types";

export const dailyProductionReportsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Reports"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getDailyProductionReports: builder.query<
        PayloadType<DailyProduction[]>,
        {}
      >({
        query: (data) => ({ url: "/dailyProduct/dailyProductionReport?"+new URLSearchParams(data).toString() }),
        providesTags: ["Reports"],
      }),
    }),
  });

export const { useLazyGetDailyProductionReportsQuery } =
  dailyProductionReportsApiSlice;
