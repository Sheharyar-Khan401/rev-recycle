import { apiSlice } from "redux/api/apiSlice";
import { SaleOrderItems } from "redux/types/Orders/saleOrders";
import {
  BasicSaleGPEditRequest,
  DetailedOutwardGatePassReport,
  GatePassesResponse,
} from "redux/types/Sales/gatepasses";
import { PayloadType } from "redux/types/common/types";
export const gatePassespiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["GatePasses"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSalesGatePasses: builder.query<
        { payLoad: Array<GatePassesResponse>; numberOfItems: number },
        {}
      >({
        query: (params) => ({
          url: `/saleGatePass?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["GatePasses"],
      }),
      getDetailedOutwardGatePassReports: builder.query<
        PayloadType<DetailedOutwardGatePassReport[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/saleGatePass/detailedOutwardGatePassReport?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["GatePasses"],
      }),
      getDetailedOutwardGatePass2Reports: builder.query<
        PayloadType<DetailedOutwardGatePassReport[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/saleGatePass/DetailedOutwardGatePassReportII?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["GatePasses"],
      }),
      getSaleOrderItems: builder.query<Array<SaleOrderItems>, {}>({
        query: (params) => ({
          url: `/saleOrderItem/saleOrderbyItem?${new URLSearchParams(
            params
          ).toString()}`,
        }),
        providesTags: ["GatePasses"],
        transformResponse: (result: { payLoad: SaleOrderItems[] }) => {
          return result.payLoad;
        },
      }),
      deleteSalesGatePasses: builder.mutation({
        query: (id: number) => ({
          url: `/saleGatePass/del?saleGatePassId=${id}`,
          method: "POST",
        }),
        invalidatesTags: ["GatePasses"],
      }),
      deleteByItemId: builder.mutation({
        query: (id: number) => ({
          url: `/saleOrderItem/del?saleOrderItemId=${id}`,
          method: "POST",
        }),
        invalidatesTags: ["GatePasses"],
      }),
      getSalesGatePassesById: builder.query<GatePassesResponse, number>({
        query: (codeId: number) => ({
          url: `/saleGatePass/${codeId}`,
        }),
        providesTags: ["GatePasses"],
        transformResponse: (result: { payLoad: GatePassesResponse }) => {
          return result.payLoad;
        },
      }),
      updateGPModifyStatus: builder.mutation({
        query: (data) => ({
          url:
            `/saleGatePass/modifyPosted?` +
            new URLSearchParams(data).toString(),
          method: "PUT",
        }),
        invalidatesTags: ["GatePasses"],
      }),
      addCodeInGatePass: builder.mutation({
        query: (data) => ({
          url: `saleGatePass/editItems?` + new URLSearchParams(data).toString(),
          method: "PUT",
        }),
        invalidatesTags: ["GatePasses"],
      }),
      editSalesGatePasses: builder.mutation({
        query: (data: BasicSaleGPEditRequest) => ({
          url: "/saleGatePass",
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["GatePasses"],
      }),
      getsaleOrderItemsById: builder.query<
        { payLoad: Array<SaleOrderItems>; numberOfItems: number },
        {}
      >({
        query: (params) => ({
          url: `saleGatePass/getItem?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["GatePasses"],
      }),
    }),
  });

export const {
  useLazyGetSalesGatePassesQuery,
  useDeleteSalesGatePassesMutation,
  useLazyGetSalesGatePassesByIdQuery,
  useEditSalesGatePassesMutation,
  useLazyGetSaleOrderItemsQuery,
  useDeleteByItemIdMutation,
  useLazyGetsaleOrderItemsByIdQuery,
  useLazyGetDetailedOutwardGatePassReportsQuery,
  useLazyGetDetailedOutwardGatePass2ReportsQuery,
  useUpdateGPModifyStatusMutation,
  useAddCodeInGatePassMutation,
} = gatePassespiSlice;
