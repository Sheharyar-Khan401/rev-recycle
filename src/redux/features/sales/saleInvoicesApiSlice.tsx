import { apiSlice } from "redux/api/apiSlice";
import { InvoiceDefaultsData } from "redux/types/Invoices/InvoiceDefaultsData";
import { InvoicesTableData } from "redux/types/Invoices/Invoices";
import { PayloadType } from "redux/types/common/types";

export const invoicesApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Invoices"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSaleInvoices: builder.query<
        PayloadType<InvoicesTableData[]>,
        {
          params?: {};
          systemInvoiceId: number;
        }
      >({
        query: (data) => ({
          url: `/purchaseInvoice/getAll/${data.systemInvoiceId}?${new URLSearchParams(
            data.params
          ).toString()}`,
        }),
        providesTags: ["Invoices"],
      }),
      getAllSaleInvoices: builder.query<PayloadType<InvoicesTableData[]>, null>({
        query: () => ({
          url: `/invoice/getAllInvoices`,
        }),
        providesTags: ["Invoices"],
      }),
      getAllInvoices: builder.query<
        PayloadType<InvoicesTableData[]>,
        {
          params?: {};
          systemInvoiceId: number;
        }
      >({
        query: (data) => ({
          url: `/invoice/getAll/${data.systemInvoiceId}`,
        }),
        providesTags: ["Invoices"],
      }),
      
      addSaleInvoice: builder.mutation({
        query: (body) => ({
          url: "/saleInvoice",
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
      editBasicSaleInvoice: builder.mutation({
        query: (body) => ({
          url: "/saleInvoice",
          method: "PUT",
          body: body,
        }),
        invalidatesTags: ["Invoices"],
      }),
      editBillSaleInvoice: builder.mutation({
        query: (body) => ({
          url: `/saleInvoice/updateBill`,
          method: "PUT",
          body
        }),
        invalidatesTags: ["Invoices"],
      }),

      getSaleInvoiceById: builder.query<InvoicesTableData, string>({
        query: (id) => ({ url: "saleInvoice/" + id }),
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
      deleteSaleInvoice: builder.mutation({
        query: (id: number) => ({
          url: "/saleInvoice/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Invoices"],
      }),
    }),
  });
export const {
  useLazyGetSaleInvoicesQuery,
  useAddSaleInvoiceMutation,
  useEditBasicSaleInvoiceMutation,
  useEditBillSaleInvoiceMutation,
  useDeleteSaleInvoiceMutation,
  useLazyGetSaleInvoiceByIdQuery,
  useGetDefaultInvoiceQuery,
  useAddDefaultInvoiceMutation,
  useGetAllSaleInvoicesQuery,
  useLazyGetAllInvoicesQuery
  
} = invoicesApiSlice;
