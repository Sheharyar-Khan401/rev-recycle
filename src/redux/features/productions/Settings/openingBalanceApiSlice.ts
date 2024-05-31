import { apiSlice } from "redux/api/apiSlice";
import { OpeningBalanceData } from "redux/types/Productions/Settings";

export const openingBalanceApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["OpeningBalance"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProductionOpeningBalance: builder.query<OpeningBalanceData, null>({
        query: () => ({
          url: `/openingBalance`,
        }),
        providesTags: ["OpeningBalance"],
        transformResponse: (result: { payLoad: OpeningBalanceData }) => {
          return result.payLoad;
        },
      }),
      editProductionOpeningBalance: builder.mutation({
        query: (data) => {
          return {
            url: "/openingBalance",
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["OpeningBalance"],
      }),
    }),
  });
export const {
  useLazyGetProductionOpeningBalanceQuery,
  useGetProductionOpeningBalanceQuery,
  useEditProductionOpeningBalanceMutation,
} = openingBalanceApiSlice;
