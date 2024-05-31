import { apiSlice } from "redux/api/apiSlice";
import { InvoiceDefaultsData } from "redux/types/Invoices/InvoiceDefaultsData";
import {
  ContainerCostsReport,
  ContainerInTransitReports,
  FreighInvoicesReports,
  InvoicesTableData,
} from "redux/types/Invoices/Invoices";
import { PayloadType } from "redux/types/common/types";

export const invoicesApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Invoices"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPurchaseInvoices: builder.query<
        PayloadType<InvoicesTableData[]>,
        {
          params?: {};
          systemInvoiceId: number;
        }
      >({
        query: (data) => ({
          url: `purchaseInvoice/getAll/${
            data.systemInvoiceId
          }?${new URLSearchParams(data.params).toString()}`,
        }),
        providesTags: ["Invoices"],
      }),
      getAllPurchaseInvoices: builder.query<
        PayloadType<InvoicesTableData[]>,
        {
          params?: {};
          systemInvoiceId: number;
        }
      >({
        query: (data) => ({
          url: `purchaseInvoice/getAll/${data.systemInvoiceId}`,
        }),
        providesTags: ["Invoices"],
      }),
      getNonAttachedSubInvoices: builder.query<
        PayloadType<InvoicesTableData[]>,
        {
          params?: {};
          systemInvoiceId: number;
        }
      >({
        query: (data) => ({
          url: `purchaseInvoice/getNonAttachedSubInvoices/${data.systemInvoiceId}`,
        }),
        providesTags: ["Invoices"],
      }),
      getContainerInTransitReports: builder.query<
        PayloadType<ContainerInTransitReports[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/invoice/getContainerInTransitReport?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["Invoices"],
      }),
      getFreightInvoicesReports: builder.query<
        PayloadType<FreighInvoicesReports[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/invoice/freightInvoiceReport?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["Invoices"],
      }),
      getClearingInvoicesReports: builder.query<
        PayloadType<FreighInvoicesReports[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/invoice/clearingInvoiceReport?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["Invoices"],
      }),
      addPurchaseInvoice: builder.mutation({
        query: (body) => ({
          url: "/purchaseInvoice",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Invoices"],
      }),
      addDefaultInvoice: builder.mutation({
        query: (body) => ({
          url: "/invoiceDefault",
          method: "PUT",
          body: body,
        }),
        invalidatesTags: ["Invoices"],
      }),
      editBasicPurchaseInvoice: builder.mutation({
        query: (body) => ({
          url: "/purchaseInvoice",
          method: "PUT",
          body: body,
        }),
        invalidatesTags: ["Invoices"],
      }),
      editBillPurchaseInvoice: builder.mutation({
        query: (body) => ({
          url: `/purchaseInvoice/updateBill`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Invoices"],
      }),

      getByIdPurchaseInvoice: builder.query<InvoicesTableData, string>({
        query: (id) => ({ url: "purchaseInvoice/" + id }),
        providesTags: ["Invoices"],
        transformResponse: (result: {
          payLoad: InvoicesTableData;
          message: string;
        }) => {
          return result?.payLoad;
        },
      }),
      getDefaultInvoice: builder.query<InvoiceDefaultsData, null>({
        query: () => ({ url: "invoiceDefault" }),
        providesTags: ["Invoices"],
        transformResponse: (result: {
          payLoad: InvoiceDefaultsData;
          message: string;
        }) => {
          return result?.payLoad;
        },
      }),
      deletePurchaseInvoice: builder.mutation({
        query: (id: number) => ({
          url: "/purchaseInvoice/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Invoices"],
      }),
      getContainersCostsReport: builder.query<
        PayloadType<ContainerCostsReport[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/invoice/containerGraph?" + new URLSearchParams(data).toString(),
        }),
      }),
    }),
  });
export const {
  useLazyGetPurchaseInvoicesQuery,
  useAddPurchaseInvoiceMutation,
  useEditBasicPurchaseInvoiceMutation,
  useEditBillPurchaseInvoiceMutation,
  useDeletePurchaseInvoiceMutation,
  useLazyGetByIdPurchaseInvoiceQuery,
  useGetDefaultInvoiceQuery,
  useAddDefaultInvoiceMutation,
  useLazyGetContainerInTransitReportsQuery,
  useLazyGetFreightInvoicesReportsQuery,
  useLazyGetClearingInvoicesReportsQuery,
  useLazyGetAllPurchaseInvoicesQuery,
  useLazyGetNonAttachedSubInvoicesQuery,
  useLazyGetContainersCostsReportQuery
} = invoicesApiSlice;
