import { apiSlice } from "redux/api/apiSlice";
import { AccountType } from "redux/types/common/accountType";

export const accountTypeApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["AccountType"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAccountType: builder.query<Array<AccountType>, null>({
        query: () => ({ url: "/accountType" }),
        providesTags: ["AccountType"],
        transformResponse: (result: {
          payLoad: Array<AccountType>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });

export const { useGetAccountTypeQuery } = accountTypeApiSlice;
