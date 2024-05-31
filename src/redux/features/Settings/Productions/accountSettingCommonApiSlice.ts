import { apiSlice } from "redux/api/apiSlice";
import { AccountSettingCommon } from "redux/types/Settings/Productions/accountsettingcommon";

export const accountsettingcommonApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["AccountSettingCommon"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAccountSettingCommon: builder.query<AccountSettingCommon, null>({
        query: () => ({ url: "accountSettingsCommon" }),
        providesTags: ["AccountSettingCommon"],
        transformResponse: (result: {
          payLoad: AccountSettingCommon;
          message: string;
        }) => {
          return result.payLoad ?? {};
        },
      }),
      addAccountSettingCommon: builder.mutation({
        query: (body) => ({
          url: "/accountSettingsCommon",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["AccountSettingCommon"],
      }),
    }),
  });
export const {
  useAddAccountSettingCommonMutation,
  useGetAccountSettingCommonQuery,
} = accountsettingcommonApiSlice;
