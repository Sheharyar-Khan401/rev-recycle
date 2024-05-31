import { apiSlice } from "redux/api/apiSlice";
import { UnitOfMeasurement } from "redux/types/common/uom";

export const uomApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["unit"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getuom: builder.query<Array<UnitOfMeasurement>, null>({
        query: () => ({ url: "/unit" }),
        // providesTags: ["unit"],
        transformResponse: (response: { payLoad: UnitOfMeasurement[] }) => {
          return response?.payLoad ? response?.payLoad : [];
        },
      }),
    }),
  });
export const { useGetuomQuery, useLazyGetuomQuery } = uomApiSlice;
