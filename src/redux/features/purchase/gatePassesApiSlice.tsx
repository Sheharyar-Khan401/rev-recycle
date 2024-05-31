import { apiSlice } from "redux/api/apiSlice";
import {
  PurchaseGatePassesReponse,
  PurchaseReports,
  QualityReportItemsResponse,
  overViewGatePasses,
  purchaseOrderItemsResponse,
} from "redux/types/GatePasses/gatePasses";
import { PurchaseFinancialEntries } from "redux/types/Invoices/Invoices";
import { PayloadType } from "redux/types/common/types";
export const gatePassespiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["GatePasses", "QualityReport"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getGatePasses: builder.query<
        { payLoad: Array<PurchaseGatePassesReponse>; numberOfItems: number },
        {}
      >({
        query: (params) => ({
          url: `/gatepass?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["GatePasses"],
      }),
      GetReports: builder.query<
        { payLoad: Array<PurchaseReports>; numberOfItems: number },
        {}
      >({
        query: (params) => ({
          url: `gatepass/detailedInwardGatePassReport?${new URLSearchParams(
            params
          ).toString()}`,
        }),
        providesTags: ["GatePasses"],
      }),
      getGatePassesItems: builder.query<
        { payLoad: Array<purchaseOrderItemsResponse>; numberOfItems: number },
        { purchaseOrderId: number; pageNumber: number; pageSize: number }
      >({
        query: (params) => ({
          url: `purchaseOrder/getItems/${params?.purchaseOrderId}?&pageNumber = ${params?.pageNumber}&pageSize=${params?.pageSize}`,
        }),
        providesTags: ["GatePasses"],
      }),
      getFinancialEntriesByGatePassId: builder.query<
        PayloadType<PurchaseFinancialEntries>,
        {}
      >({
        query: (data: { invoiceId: number }) => ({
          url: "/invoice/getInvoiceFinancialEntries/" + data?.invoiceId,
        }),
      }),
      deleteGatePasses: builder.mutation({
        query: (id: number) => ({
          url: `/gatepass/${id}`,
          method: "Delete",
        }),
        invalidatesTags: ["GatePasses"],
      }),
      getGatePassesById: builder.query<PurchaseGatePassesReponse, number>({
        query: (id: number) => ({
          url: `/gatepass/${id}`,
        }),
        providesTags: ["GatePasses"],
        transformResponse: (result: { payLoad: PurchaseGatePassesReponse }) => {
          return result.payLoad;
        },
      }),
      editGatePasses: builder.mutation({
        query: (data: overViewGatePasses) => ({
          url: "/gatepass",
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["GatePasses"],
      }),
      editGatePassItems: builder.mutation({
        query: (data) => ({
          url: "/gatepass/editItems?" + new URLSearchParams(data).toString(),
          method: "POST",
          // body: data,
        }),
        invalidatesTags: ["GatePasses"],
      }),
      updateGPPostStatus: builder.mutation({
        query: (data) => ({
          url: "/gatepass/modifyPosted?" + new URLSearchParams(data).toString(),
          method: "PUT",
        }),
        invalidatesTags: ["GatePasses"],
      }),
      updateGPQualityReport: builder.mutation({
        query: (data) => ({
          url: `/qualityAnalysis/?gatePassId=${data.gatePassId}`,
          method: "PUT",
          body: data.body,
        }),
        invalidatesTags: ["GatePasses"],
      }),
      importGPQualityReport: builder.mutation({
        query: (data) => ({
          url: `/qualityAnalysis/importQualityAnalysis?gatePassId=${data.gatePassId}`,
          method: "PUT",
          body: data.body,
        }),
        invalidatesTags: ["GatePasses", "QualityReport"],
      }),
      getQualityReport: builder.query<
        { payLoad: Array<QualityReportItemsResponse>; numberOfItems: number },
        {}
      >({
        query: (params) => ({
          url: `/qualityAnalysis/?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["QualityReport"],
      }),
    }),
  });

export const {
  useLazyGetGatePassesQuery,
  useDeleteGatePassesMutation,
  useLazyGetGatePassesByIdQuery,
  useEditGatePassesMutation,
  useLazyGetGatePassesItemsQuery,
  useEditGatePassItemsMutation,
  useLazyGetReportsQuery,
  useUpdateGPPostStatusMutation,
  useLazyGetFinancialEntriesByGatePassIdQuery,
  useLazyGetQualityReportQuery,
  useUpdateGPQualityReportMutation,
  useImportGPQualityReportMutation,
} = gatePassespiSlice;
