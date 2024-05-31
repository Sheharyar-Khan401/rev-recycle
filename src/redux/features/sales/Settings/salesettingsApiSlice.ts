import { apiSlice } from "redux/api/apiSlice";
import { BasicData } from "redux/types/Sales/setting/basic";
export const salesettingsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Settings"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBasicSetting: builder.query<BasicData, null>({
        query: () => ({
          url: `/salesSetting/getBasic`,
        }),
        providesTags: ["Settings"],
        transformResponse: (result: {
          payLoad: BasicData;
          message: string;
        }) => {
          return result.payLoad ?? {};
        },
      }),

      addSalesSettings: builder.mutation({
        query: (data) => ({
          url: "/salesSetting",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Settings"],
      }),
    }),
  });
export const { useGetBasicSettingQuery, useAddSalesSettingsMutation } =
  salesettingsApiSlice;
