import { apiSlice } from "redux/api/apiSlice";
import { ProductionFOHValues } from "redux/types/Productions/Settings";
import { PayloadType } from "redux/types/common/types";

export const fohValuesApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["ProductionFOHValues"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProductionFOHValues: builder.query<PayloadType<ProductionFOHValues[]>, null>({
        query: (params) => ({
          url: `/fohValues`,
        }),
        providesTags: ["ProductionFOHValues"],
      }),
      addProductionFOHValues: builder.mutation({
        query: (body) => {
          return {
            url: "/fohValues",
            method: "POST",
            body: body,
          };
        },
        invalidatesTags: ["ProductionFOHValues"],
      }),
    }),
  });
export const {
  useGetProductionFOHValuesQuery,
  useAddProductionFOHValuesMutation,
} = fohValuesApiSlice;
