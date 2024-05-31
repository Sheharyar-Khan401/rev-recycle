import { apiSlice } from "redux/api/apiSlice";
import { ChargeType } from "redux/types/Settings/Purchase/chargetype";

export const chargetypeApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["ChargeType"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getChargeType: builder.query<Array<ChargeType>, null>({
        query: () => ({ url: "/chargeType" }),
        providesTags: ["ChargeType"],
        transformResponse: (result: {
          payLoad: Array<ChargeType>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      addChargeType: builder.mutation({
        query: (body) => ({
          url: "/chargeType",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["ChargeType"],
      }),
    }),
  });

export const { useAddChargeTypeMutation, useGetChargeTypeQuery } =
  chargetypeApiSlice;
