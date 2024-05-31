import { apiSlice } from "redux/api/apiSlice";
import { AccountSettingPurchase } from "redux/types/Settings/Productions/accountsettingpurchase";
export const accountSettingPurchaseApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["AccountSettingPurchase"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAccountSettingPurchase: builder.query<AccountSettingPurchase, null>({
        query: () => ({ url: "accountSettingPurchase" }),
        providesTags: ["AccountSettingPurchase"],
        transformResponse: (result: {
          payLoad: AccountSettingPurchase;
          message: string;
        }) => {
          return result.payLoad ?? {};
        },
      }),
      addAccountSettingPurchase: builder.mutation({
        query: (body: AccountSettingPurchase) => ({
          url: "/accountSettingPurchase",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["AccountSettingPurchase"],
      }),
    }),
  });
export const {
  useAddAccountSettingPurchaseMutation,
  useGetAccountSettingPurchaseQuery,
} = accountSettingPurchaseApiSlice;
