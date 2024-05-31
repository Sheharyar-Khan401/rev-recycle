import { apiSlice } from "redux/api/apiSlice";
import { ShippingLineData } from "redux/types/Invoices/shippingLine";

export const shippingLineApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["ShippingLine"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getShippingLine: builder.query<ShippingLineData[], null>({
        query: (data) => ({
          url: `shippingLine`,
        }),
        providesTags: ["ShippingLine"],
        transformResponse: (result: { payLoad: ShippingLineData[] }) => {
          return result.payLoad;
        },
      }),
    }),
  });
export const { useGetShippingLineQuery } = shippingLineApiSlice;
