import { apiSlice } from "redux/api/apiSlice";
import { QuantityUnit } from "redux/types/common/quantityUnit";
export const QuantityUnitApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["QuantityUnits"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getQuantityUnits: builder.query<Array<QuantityUnit>, null>({
        query: () => ({ url: "/quantityUnit" }),
        providesTags: ["QuantityUnits"],
        transformResponse: (result: {
          payLoad: Array<QuantityUnit>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),

    }),
  });

export const {useLazyGetQuantityUnitsQuery} =
  QuantityUnitApiSlice;
