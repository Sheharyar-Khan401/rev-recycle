import { apiSlice } from "redux/api/apiSlice";
import { QuantityUnit } from "redux/types/common/quantityUnit";

export const quantityunitApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["quantity unit"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getquantityunit: builder.query<Array<QuantityUnit>, null>({
        query: () => ({ url: "/quantityUnit?pageNumber=0&pageSize=0" }),
        providesTags: ["quantity unit"],
        transformResponse: (result: {
          payLoad: Array<QuantityUnit>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });
export const { useGetquantityunitQuery } = quantityunitApiSlice;
