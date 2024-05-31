import { apiSlice } from "redux/api/apiSlice";
import { AccountSettingSale } from "redux/types/Settings/Productions/accountsettingsale";

export const accountsettingsaleApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["AccountSettingSale"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAccountSettingSale: builder.query<AccountSettingSale, null>({
        query: () => ({ url: "accountSettingSale" }),
        providesTags: ["AccountSettingSale"],
        transformResponse: (result: {
          payLoad: AccountSettingSale;
          message: string;
        }) => {
          return result.payLoad ?? {};
        },
      }),
      addAccountSettingSale: builder.mutation({
        query: (body) => ({
          url: "/accountSettingSale",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["AccountSettingSale"],
      }),
    }),
  });
export const {
  useAddAccountSettingSaleMutation,
  useGetAccountSettingSaleQuery,
} = accountsettingsaleApiSlice;
