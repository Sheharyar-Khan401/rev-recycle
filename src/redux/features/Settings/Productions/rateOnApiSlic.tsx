import { apiSlice } from "redux/api/apiSlice";
import { RateOn } from "redux/types/common/rateOn";
export const rateOnApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Stockrooms"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRatoOn: builder.query<Array<RateOn>, null>({
        query: () => ({ url: "rateOn" }),
        providesTags: ["Stockrooms"],
        transformResponse: (result: {
          payLoad: Array<RateOn>;
          message: string;
        }) => {
          return result.payLoad ? result.payLoad : [];
        },
      }),
     
    }),
  });
export const {useGetRatoOnQuery } =
  rateOnApiSlice;
