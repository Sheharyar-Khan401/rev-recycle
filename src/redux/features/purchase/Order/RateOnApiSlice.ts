import { apiSlice } from "redux/api/apiSlice";
import { RateOn } from "redux/types/common/rateOn";

export const rateOnApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["RateOn"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRateOn: builder.query<RateOn[], null>({
        query: () => ({
          url: "/rateOn",
        }),
        providesTags: ["RateOn"],
        transformResponse: (result: { payLoad: RateOn[] }) => {
          return result.payLoad;
        },
      }),
    }),
  });
export const { useGetRateOnQuery } = rateOnApiSlice;
