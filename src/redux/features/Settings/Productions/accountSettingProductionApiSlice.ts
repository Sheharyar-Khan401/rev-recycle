import { apiSlice } from "redux/api/apiSlice";
import { AccountSettingProduction } from "redux/types/Settings/Productions/accountsettingproduction";

export const accountsettingproductionApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["AccountSettingProduction"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAccountSettingProduction: builder.query<
        AccountSettingProduction,
        null
      >({
        query: () => ({ url: "accountSettingsProduction" }),
        providesTags: ["AccountSettingProduction"],
        transformResponse: (result: {
          payLoad: AccountSettingProduction;
          message: string;
        }) => {
          return result.payLoad ?? {};
        },
      }),
      addAccountSettingProduction: builder.mutation({
        query: (body) => ({
          url: "/accountSettingsProduction",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["AccountSettingProduction"],
      }),
    }),
  });
export const {
  useAddAccountSettingProductionMutation,
  useGetAccountSettingProductionQuery,
} = accountsettingproductionApiSlice;
