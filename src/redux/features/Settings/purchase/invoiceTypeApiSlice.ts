import { apiSlice } from "redux/api/apiSlice";
import {
  InvoicesTableData,
  PurchaseFinancialEntries,
  PurchaseInvoicesRequest,
  invoiceCommissionResponse,
  invoiceCommissionsRequest,
  invoiceDocumentsResponse,
  invoiceSummary,
} from "redux/types/Invoices/Invoices";
import {
  PurchaseOrderItemsData,
  listofImportOrderItems,
  listofPurchaseOrderItems,
} from "redux/types/Orders/orders";
import {
  ItemsBySaleOrderId,
  SaleOrderItemsRequest,
} from "redux/types/Orders/saleOrders";
import { GatePassesResponse } from "redux/types/Sales/gatepasses";
import {
  ChargeType,
  ChargeTypeRequest,
} from "redux/types/Settings/Purchase/chargetype";
import {
  InvoiceType,
  InvoiceTypeRequest,
} from "redux/types/Settings/Purchase/invoicetype";
import { PayloadType } from "redux/types/common/types";
export const invoiceTypeApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: [
      "InvoiceType",
      "invoice",
      "freight-invoice",
      "clearing-invoice",
      "delivery-invoice",
      "summary",
      "financial-entries",
      "get-invoice-items",
      "get-sales-invoice-items"
    ],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getInvoices: builder.query<
        PayloadType<InvoicesTableData[]>,
        {
          params?: {};
          systemInvoiceId: number;
        }
      >({
        query: (data) => ({
          url: `invoice/getAll/${data.systemInvoiceId}?${new URLSearchParams(
            data.params
          ).toString()}`,
        }),
        providesTags: ["invoice"],
        
      }),
      getFreightAndClearingInvoices: builder.query<
      PayloadType<InvoicesTableData[]>,
      {
        params?: {};
        systemInvoiceId: number;
      }
    >({
      query: (data) => ({
        url: `purchaseInvoice/getAll/${data.systemInvoiceId}`,
      }),
      providesTags: ["invoice"],
      
    }),
      getFreightAndClearingNonAttachedSubInvoices: builder.query<
      PayloadType<InvoicesTableData[]>,
      {
        params?: {};
        systemInvoiceId: number;
      }
    >({
      query: (data) => ({
        url: `purchaseInvoice/getNonAttachedSubInvoices/${data.systemInvoiceId}`,
      }),
      providesTags: ["invoice"],
      
    }),
      getFreightInvoices: builder.query<PayloadType<InvoicesTableData[]>, {}>({
        query: (params) => ({
          url: `invoice/getAll/2?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["freight-invoice"],
      }),
      getClearingInvoices: builder.query<PayloadType<InvoicesTableData[]>, {}>({
        query: (params) => ({
          url: `invoice/getAll/3?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["clearing-invoice"],
      }),
      getDeliveryOrderInvoices: builder.query<
        PayloadType<InvoicesTableData[]>,
        {}
      >({
        query: (params) => ({
          url: `invoice/getAll/4?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["delivery-invoice"],
      }),
      getInvoiceCharges: builder.query<ChargeType[], number>({
        query: (invoiceId) => ({
          url: `invoice/charges/${invoiceId}`,
        }),
        transformResponse: (result: {
          payLoad: ChargeType[];
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      getPurchaseInvoiceItems: builder.query<PurchaseOrderItemsData[], number>({
        query: (invoiceId) => ({
          url: `invoice/getPurchaseItems/${invoiceId}`,
        }),
        transformResponse: (result: {
          payLoad: PurchaseOrderItemsData[];
          message: string;
        }) => {
          return result.payLoad;
        },
        providesTags: ["get-invoice-items"],
      }),
      getSaleInvoiceItems: builder.query<ItemsBySaleOrderId[], number>({
        query: (invoiceId) => ({
          url: `saleOrderItem/getByInvoice?saleInvoiceId=${invoiceId}`,
        }),
        transformResponse: (result: {
          payLoad: ItemsBySaleOrderId[];
          message: string;
        }) => {
          return result.payLoad;
        },
        providesTags: ['get-sales-invoice-items']
      }),
      getInvoiceDocuments: builder.query<invoiceDocumentsResponse[], number>({
        query: (invoiceId) => ({
          url: `invoice/documents/${invoiceId}`,
        }),
        transformResponse: (result: {
          payLoad: invoiceDocumentsResponse[];
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      getInvoiceCommissions: builder.query<invoiceCommissionResponse[], number>(
        {
          query: (invoiceId) => ({
            url: `invoice/commission/${invoiceId}`,
          }),
          transformResponse: (result: {
            payLoad: invoiceCommissionResponse[];
            message: string;
          }) => {
            return result.payLoad;
          },
        }
      ),
      getInvoiceById: builder.query<InvoicesTableData, number>({
        query: (invoiceId) => ({
          url: `invoice/${invoiceId}`,
        }),
        providesTags: ["invoice"],
        transformResponse: (result: {
          payLoad: InvoicesTableData;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      getInvoiceSummary: builder.query<invoiceSummary, number>({
        providesTags: ["summary"],
        query: (invoiceId) => ({
          url: `invoice/summary/${invoiceId}`,
        }),
        transformResponse: (result: {
          payLoad: invoiceSummary;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      convertToGatePass: builder.query<GatePassesResponse, number>({
        query: (invoiceId) => ({
          url: `invoice/convertTogatePass?invoiceId=${invoiceId}`,
        }),
        transformResponse: (result: {
          payLoad: GatePassesResponse;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      addInvoice: builder.mutation({
        query: (body: PurchaseInvoicesRequest) => ({
          url: "/invoice",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["invoice"],
      }),
      postInvoiceCharges: builder.mutation({
        query: ({
          invoiceId,
          body,
        }: {
          invoiceId: number;
          body: ChargeTypeRequest[];
        }) => ({
          url: "/invoice/charges/" + invoiceId,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["summary"],
      }),
      postPurchaseInvoiceItems: builder.mutation({
        query: ({
          invoiceId,
          body,
        }: {
          invoiceId: number;
          body: listofPurchaseOrderItems[];
        }) => ({
          url: "/invoice/purchaseItems/" + invoiceId,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["summary"],
      }),
      postImportInvoiceItems: builder.mutation({
        query: ({
          invoiceId,
          body,
        }: {
          invoiceId: number;
          body: listofImportOrderItems[];
        }) => ({
          url: "/invoice/importItems/" + invoiceId,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["summary", "get-invoice-items"],
      }),
      postSaleInvoiceItems: builder.mutation({
        query: ({
          invoiceId,
          body,
        }: {
          invoiceId: number;
          body: SaleOrderItemsRequest[];
        }) => ({
          url: "/saleOrderItem/editByInvoice?saleInvoiceId=" + invoiceId,
          method: "POST",
          body: body,
        }),
      }),
      postInvoiceDocuments: builder.mutation({
        query: ({
          invoiceId,
          body,
        }: {
          invoiceId: number;
          body: FormData;
        }) => ({
          url: "/invoice/documents/" + invoiceId,
          method: "POST",
          body: body,
        }),
      }),
      postInvoiceCommissions: builder.mutation({
        query: ({
          invoiceId,
          body,
        }: {
          invoiceId: number;
          body: invoiceCommissionsRequest[];
        }) => ({
          url: "/invoice/commission/" + invoiceId,
          method: "POST",
          body: body,
        }),
      }),
      editInvoice: builder.mutation({
        query: (body: PurchaseInvoicesRequest) => ({
          url: "/invoice",
          method: "PUT",
          body: body,
        }),
        invalidatesTags: ["invoice", "summary"],
      }),
      getInvoiceTypes: builder.query<Array<InvoiceType>, null>({
        query: () => ({ url: "invoiceType" }),
        providesTags: ["InvoiceType"],
        transformResponse: (result: {
          payLoad: Array<InvoiceType>;
          message: string;
        }) => {
          return result.payLoad ? result.payLoad : [];
        },
      }),
      addInvoiceType: builder.mutation({
        query: (body: InvoiceTypeRequest[]) => ({
          url: "/invoiceType",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["InvoiceType"],
        transformResponse: (result: { message: string }) => {
          return result.message;
        },
      }),
      updateInvoicePostStatus: builder.mutation({
        query: (data) => ({
          url: "/invoice/modifyPosted?" + new URLSearchParams(data).toString(),
          method: "PUT",
        }),
        invalidatesTags: ["invoice","financial-entries"],
      }),
      getFinancialEntries: builder.query<
        PayloadType<PurchaseFinancialEntries>,
        {}
      >({
        providesTags:['financial-entries'],
        query: (data: { invoiceId: number }) => ({
          url: "/invoice/getFinancialEntries/" + data?.invoiceId,
        }),
      }),
    }),
  });

export const {
  useLazyGetInvoiceByIdQuery,
  useLazyConvertToGatePassQuery,
  useLazyGetInvoiceChargesQuery,
  useLazyGetInvoiceCommissionsQuery,
  useLazyGetInvoiceDocumentsQuery,
  useLazyGetInvoiceSummaryQuery,
  useLazyGetPurchaseInvoiceItemsQuery,
  useLazyGetSaleInvoiceItemsQuery,
  useAddInvoiceMutation,
  useEditInvoiceMutation,
  useAddInvoiceTypeMutation,
  usePostInvoiceChargesMutation,
  usePostInvoiceCommissionsMutation,
  usePostPurchaseInvoiceItemsMutation,
  usePostImportInvoiceItemsMutation,
  usePostSaleInvoiceItemsMutation,
  usePostInvoiceDocumentsMutation,
  useGetInvoiceTypesQuery,
  useLazyGetInvoicesQuery,
  useLazyGetFreightInvoicesQuery,
  useLazyGetClearingInvoicesQuery,
  useLazyGetDeliveryOrderInvoicesQuery,
  useUpdateInvoicePostStatusMutation,
  useLazyGetFinancialEntriesQuery,
  useLazyGetFreightAndClearingInvoicesQuery,
  useLazyGetFreightAndClearingNonAttachedSubInvoicesQuery
} = invoiceTypeApiSlice;
export default invoiceTypeApiSlice.reducer;
