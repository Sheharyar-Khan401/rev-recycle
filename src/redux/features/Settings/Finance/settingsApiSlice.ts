import { apiSlice } from "redux/api/apiSlice";
import { Settings } from "redux/types/Settings/Finance/setting";

export const settingsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Settings"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSettings: builder.query<Settings, null>({
        query: () => ({ url: "financeSetting" }),
        providesTags: ["Settings"],
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
        invalidatesTags: ["Settings"],
      }),
    }),
  });
export const { useUpdateSettingMutation, useGetSettingsQuery } =
  settingsApiSlice;
