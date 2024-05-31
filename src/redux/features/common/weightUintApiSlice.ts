import { apiSlice } from "redux/api/apiSlice";
import { WeightUnit } from "redux/types/common/weightUnit";

export const weightUnitApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["WeightUnit"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getWeightUnits: builder.query<Array<WeightUnit>, null>({
        query: () => ({ url: "/weightUnit" }),
        providesTags: ["WeightUnit"],
        transformResponse: (result: {
          payLoad: Array<WeightUnit>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });
export const { useGetWeightUnitsQuery } = weightUnitApiSlice;
