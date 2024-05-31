import { apiSlice } from "redux/api/apiSlice";
import {
  IssuanceGraph,
  IssuanceResponse,
  IssuedMaterialReports,
  dailyProductionItem,
  issuanceRequest,
} from "redux/types/Productions/issuance";
import { PayloadType } from "redux/types/common/types";

export const issuanceApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Issuance"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getIssuance: builder.query<
        { payLoad: Array<IssuanceResponse>; numberOfItems: number },
        {}
      >({
        query: (params) => ({
          url: `/productionIssuance?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["Issuance"],
      }),
      getIssuedMaterialReports: builder.query<
        PayloadType<IssuedMaterialReports[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/productionIssuance/issuedMaterialReport?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["Issuance"],
      }),
      getIssuanceById: builder.query<IssuanceResponse, number>({
        query: (id) => ({
          url: `/productionIssuance/${id}`,
        }),
        providesTags: ["Issuance"],
        transformResponse: (result: { payLoad: IssuanceResponse }) => {
          return result.payLoad;
        },
      }),
      addIssuance: builder.mutation({
        query: (data: issuanceRequest) => {
          return {
            url: "/productionIssuance",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["Issuance"],
      }),
      editIssuance: builder.mutation({
        query: (body) => {
          return {
            url: "/productionIssuance",
            method: "PUT",
            body: body,
          };
        },
        invalidatesTags: ["Issuance"],
      }),
      deleteIssuance: builder.mutation({
        query: (id) => ({
          url: "/productionIssuance/" + id,
          method: "POST",
        }),
        invalidatesTags: ["Issuance"],
      }),
      getIssuanceCodesOnItemId: builder.query<
        dailyProductionItem[],
        { itemId: number; id: number }
      >({
        query: (data) => ({
          url: `/productionIssuance/issuanceItems?itemId=${data.itemId}&productionIssuanceId=${data.id}`,
        }),
        providesTags: ["Issuance"],
        transformResponse: (result: { payLoad: dailyProductionItem[] }) => {
          return result.payLoad;
        },
      }),
      deleteCodeOfItem: builder.mutation({
        query: (id) => ({
          url: `/productionIssuance?productionIssuanceItemId=${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Issuance"],
      }),
      updateLbsOfCode: builder.mutation({
        query: ({ id, quantity }) => ({
          url: `/productionIssuance/updateItem?issuanceItemId=${id}&manualLBS=${quantity}`,
          method: "PUT",
        }),
        invalidatesTags: ["Issuance"],
      }),
      getIssuanceGraph: builder.query<PayloadType<IssuanceGraph[]>, {}>({
        query: (data) => ({
          url:
            "/productionIssuance/issuanceGraph?" +
            new URLSearchParams(data).toString(),
        }),
      }),
    }),
  });
export const {
  useLazyGetIssuanceQuery,
  useDeleteIssuanceMutation,
  useLazyGetIssuanceGraphQuery,
  useAddIssuanceMutation,
  useLazyGetIssuanceByIdQuery,
  useEditIssuanceMutation,
  useLazyGetIssuanceCodesOnItemIdQuery,
  useDeleteCodeOfItemMutation,
  useUpdateLbsOfCodeMutation,
  useLazyGetIssuedMaterialReportsQuery,
} = issuanceApiSlice;
