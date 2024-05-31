import { apiSlice } from "redux/api/apiSlice";
import { ItemSupplierInwardGP } from "redux/types/GatePasses/gatePasses";
import { PayloadType } from "redux/types/common/types";

export const itemSupplierInwardGPApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Reports"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getItemSupplierInwardGPReports: builder.query<
        PayloadType<ItemSupplierInwardGP[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/gatepass/itemSupplierInwardGatePassReport?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["Reports"],
      }),
    }),
  });

export const { useLazyGetItemSupplierInwardGPReportsQuery } =
  itemSupplierInwardGPApiSlice;
