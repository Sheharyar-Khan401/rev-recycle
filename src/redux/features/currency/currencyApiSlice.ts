import { apiSlice } from "redux/api/apiSlice";

import {
  BusinessCurrency,
  CurrencyRequest,
} from "redux/types/Settings/Finance/currency";

export const currencyApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Currency"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCurrrency: builder.query<Array<CurrencyRequest>, null>({
        query: () => ({ url: "currency" }),
        providesTags: ["Currency"],
        transformResponse: (result: {
          payLoad: Array<CurrencyRequest>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),

      getBusinessCurrrency: builder.query<Array<BusinessCurrency>, null>({
        query: () => ({ url: "businessCurrency" }),
        providesTags: ["Currency"],
        transformResponse: (result: {
          payLoad: Array<BusinessCurrency>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),

      addCurrency: builder.mutation({
        query: (data) => ({
          url: "/currency",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Currency"],
      }),

      addBusinessCurrency: builder.mutation({
        query: (data) => ({
          url: "/businessCurrency",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Currency"],
      }),
    }),
  });

export const {
  useAddCurrencyMutation,
  useGetCurrrencyQuery,
  useGetBusinessCurrrencyQuery,
  useAddBusinessCurrencyMutation,
} = currencyApiSlice;
