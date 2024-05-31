import { apiSlice } from "redux/api/apiSlice";
import {
  ShippingLineData,
  ShippingLineRequest,
} from "redux/types/Settings/Purchase/shippingLine";
export const shippingLineApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["ShippingLine"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getShippingLine: builder.query<Array<ShippingLineData>, null>({
        query: () => ({ url: "shippingLine" }),
        providesTags: ["ShippingLine"],
        transformResponse: (result: {
          payLoad: Array<ShippingLineData>;
          message: string;
        }) => {
          return result.payLoad ? result.payLoad : [];
        },
      }),
      addShippingLine: builder.mutation({
        query: (body: ShippingLineRequest[]) => ({
          url: "/shippingLine",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["ShippingLine"],
      }),
    }),
  });
export const { useAddShippingLineMutation, useGetShippingLineQuery } =
  shippingLineApiSlice;
