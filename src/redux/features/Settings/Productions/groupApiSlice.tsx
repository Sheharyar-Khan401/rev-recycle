import { apiSlice } from "redux/api/apiSlice";
import { Group } from "redux/types/common/group";
export const GroupApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Group"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getGroups: builder.query<Array<Group>, null>({
        query: () => ({ url: "/itemgroup" }),
        providesTags: ["Group"],
        transformResponse: (result: { payLoad: Array<Group> }) => {
          return result?.payLoad ? result.payLoad : [];
        },
      }),
    }),
  });

export const { useLazyGetGroupsQuery, useGetGroupsQuery } = GroupApiSlice;
