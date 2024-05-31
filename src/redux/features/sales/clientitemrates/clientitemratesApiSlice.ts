import { apiSlice } from "redux/api/apiSlice";
import {
  ClienItemRates,
  PriceComparisonReports,
} from "redux/types/Sales/ClientItemRates/clientitemsrates";
import { PayloadType } from "redux/types/common/types";
export const clientItemRatesApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["ClientItemRates"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getClientItemRates: builder.query<
        { payLoad: Array<ClienItemRates>; numberOfItems: number },
        {}
      >({
        query: (data) => ({
          url:
            `clientItemRates/ProductionPurchase?` +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["ClientItemRates"],
      }),
      getPriceComparisonReports: builder.query<
        PayloadType<PriceComparisonReports[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/clientItemRates/priceComparisonReport?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["ClientItemRates"],
      }),

      updateClientItemRates: builder.mutation({
        query: (rowData) => ({
          url: "clientItemRates/editClientItemRate",
          method: "PUT",
          body: rowData,
        }),
        invalidatesTags: ["ClientItemRates"],
      }),
      editClientItemRates: builder.mutation({
        query: (rowData) => ({
          url: "clientItemRates",
          method: "PUT",
          body: rowData,
        }),
        invalidatesTags: ["ClientItemRates"],
      }),
      deleteClientItemRates: builder.mutation({
        query: (id) => ({
          url:
            "clientItemRates/deleteClientItemRate?" +
            new URLSearchParams(id).toString(),
          method: "POST",
        }),
        invalidatesTags: ["ClientItemRates"],
      }),
    }),
  });
export const {
  useLazyGetClientItemRatesQuery,
  useUpdateClientItemRatesMutation,
  useEditClientItemRatesMutation,
  useLazyGetPriceComparisonReportsQuery,
  useDeleteClientItemRatesMutation,
} = clientItemRatesApiSlice;
