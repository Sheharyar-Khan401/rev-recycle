import { apiSlice } from "redux/api/apiSlice";
import {
  CostGroup,
  CostGroupRequest,
} from "redux/types/Finance/PrimaryData/costgroup";
import { PayloadType } from "redux/types/common/types";

export const costgroupApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["CostGroup"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCostGroup: builder.query<PayloadType<CostGroup[]>, {}>({
        query: (data) => ({
          url: "/costgroup?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["CostGroup"],
        transformResponse: (result: PayloadType<CostGroup[]>) => {
          return result;
        },
      }),
      getAllCostGroup: builder.query<CostGroup[], null>({
        query: () => ({
          url: "/costgroup",
        }),
        providesTags: ["CostGroup"],
        transformResponse: (result: {
          payLoad: Array<CostGroup>;
          message: string;
        }) => {
          return result?.payLoad;
        },
      }),
      addCostGroup: builder.mutation({
        query: (body) => ({
          url: "/costgroup",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["CostGroup"],
      }),
      deleteCostGroup: builder.mutation({
        query: (id: number) => ({
          url: "/costgroup/" + id,
          method: "DELETE",
        }),

        invalidatesTags: ["CostGroup"],
      }),
      getByIdCostGroup: builder.query<CostGroupRequest, string>({
        query: (id) => ({ url: "costgroup/" + id }),
        providesTags: ["CostGroup"],
        transformResponse: (result: {
          payLoad: CostGroupRequest;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      editCostGroup: builder.mutation({
        query: (data: CostGroupRequest) => ({
          url: "/costgroup",
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["CostGroup"],
      }),
    }),
  });
export const {
  useGetCostGroupQuery,
  useLazyGetCostGroupQuery,
  useGetAllCostGroupQuery,
  useAddCostGroupMutation,
  useDeleteCostGroupMutation,
  useLazyGetByIdCostGroupQuery,
  useEditCostGroupMutation,
} = costgroupApiSlice;
