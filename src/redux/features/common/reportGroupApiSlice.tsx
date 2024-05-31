import { apiSlice } from "redux/api/apiSlice";
import { ReportGroup } from "redux/types/common/reportGroup";
export const reportGroupApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["ReportGroup"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getReportsGroups: builder.query<Array<ReportGroup>, null>({
        query: () => ({ url: "/reportGroup" }),
        providesTags: ["ReportGroup"],
        transformResponse: (result: {
          payLoad: Array<ReportGroup>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });
export const { useGetReportsGroupsQuery } = reportGroupApiSlice;
