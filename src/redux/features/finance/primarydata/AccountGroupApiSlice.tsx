import { apiSlice } from "redux/api/apiSlice";
import { AccountGroup } from "redux/types/common/accountGroup";
export const accountGroupApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["AccountGroup"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAccountsGroups: builder.query<Array<AccountGroup>, null>({
        query: () => ({ url: "/accountgroup" }),
        providesTags: ["AccountGroup"],
        transformResponse: (result: {
          payLoad: Array<AccountGroup>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });
export const { useGetAccountsGroupsQuery } = accountGroupApiSlice;
