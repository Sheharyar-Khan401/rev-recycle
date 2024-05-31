import { apiSlice } from "redux/api/apiSlice";
import { WeightUnit } from "redux/types/common/weightUnit";
export const weightUnitApiSlice= apiSlice
  .enhanceEndpoints({ addTagTypes: ["Group"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getWeightUnit: builder.query<Array<WeightUnit>, null>({
        query: () => ({ url: "/weightUnit" }),
        providesTags: ["Group"],
        transformResponse: (result: {
            payLoad: Array<WeightUnit>;
            message: string;
          }) => {
            return result.payLoad;
          },
      }),

    }),
  });

export const {useLazyGetWeightUnitQuery} =
  weightUnitApiSlice;
