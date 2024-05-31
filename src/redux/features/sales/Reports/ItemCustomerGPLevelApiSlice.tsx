import { apiSlice } from "redux/api/apiSlice";
import { ItemCustomerGPLevel } from "redux/types/Sales/Reports/ItemCustomerGPLevel";
import { PayloadType } from "redux/types/common/types";

export const itemCustomerGPLevelApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Reports"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getItemCustomerGPLevelReports: builder.query<
        PayloadType<ItemCustomerGPLevel[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/saleGatePass/itemCutomerGatePassLeveled?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["Reports"],
      }),
    }),
  });

export const { useLazyGetItemCustomerGPLevelReportsQuery } =
  itemCustomerGPLevelApiSlice;
