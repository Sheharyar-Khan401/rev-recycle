import { apiSlice } from "redux/api/apiSlice";
import { SurplusData } from "redux/types/Sales/setting/surplus";
export const surplusApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Settings"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSurplus: builder.query<SurplusData[], null>({
        query: () => ({
          url: `salesSetting/getSurplusAccount`,
        }),
        providesTags: ["Settings"],
        transformResponse: (result: {
          payLoad: SurplusData[];
          message: string;
        }) => {
          return result.payLoad ? result?.payLoad : [];
        },
      }),

      addSurplus: builder.mutation({
        query: (data) => ({
          url: "/salesSetting/addSurplus",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Settings"],
      }),
    }),
  });
export const { useGetSurplusQuery, useAddSurplusMutation } =
  surplusApiSlice;
