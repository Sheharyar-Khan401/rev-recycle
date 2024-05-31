import { apiSlice } from "redux/api/apiSlice";
import { Settings } from "redux/types/Settings/Finance/setting";

export const currencyApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Currency"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSettings: builder.query<Settings, null>({
        query: () => ({ url: "financeSetting" }),
        providesTags: ["Currency"],
        transformResponse: (result: { payLoad: Settings; message: string }) => {
          return result.payLoad ?? {};
        },
      }),
      updateSetting: builder.mutation({
        query: (body) => ({
          url: "/financeSetting",
          method: "PUT",
          body: body,
        }),
        invalidatesTags: ["Currency"],
      }),
    }),
  });
export const { useUpdateSettingMutation, useGetSettingsQuery } =
  currencyApiSlice;
