import { apiSlice } from "redux/api/apiSlice";
import { CostGroupRequest } from "redux/types/Finance/PrimaryData/costgroup";

export const costgrouptypeApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["CostGroupType"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCostGroupType: builder.query<Array<CostGroupRequest>, null>({
        query: () => ({ url: "/costgrouptype" }),
        providesTags: ["CostGroupType"],
        transformResponse: (result: {
          payLoad: Array<CostGroupRequest>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });
export const { useGetCostGroupTypeQuery } = costgrouptypeApiSlice;
