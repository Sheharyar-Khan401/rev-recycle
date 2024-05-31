import { apiSlice } from "redux/api/apiSlice";
import { QuantityUnit } from "redux/types/common/quantityUnit";

export const quantityUnitApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["QuantityUnit"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getQuantityUnits: builder.query<Array<QuantityUnit>, null>({
        query: () => ({ url: "/quantityUnit" }),
        providesTags: ["QuantityUnit"],
        transformResponse: (result: {
          payLoad: Array<QuantityUnit>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });
export const { useGetQuantityUnitsQuery } = quantityUnitApiSlice;
