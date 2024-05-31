import { apiSlice } from "redux/api/apiSlice";
import {OrderTableData, PurchaseOrderReports, StockRoomItemsReports, SupplierInvoicesReports } from "redux/types/Orders/orders";
import { PayloadType } from "redux/types/common/types";

export const ordersApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Orders"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPurchaseOrders: builder.query<PayloadType<OrderTableData[]>, {}>({
        query: (data) => ({
          url: "/purchaseOrder?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Orders"],
      }),
      getPurchaseOrderReports: builder.query<PayloadType<PurchaseOrderReports[]>, {}>({
        query: (data) => ({
          url: "/purchaseOrder/getRawMaterialReport?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Orders"],
      }),
      getSupplierInvoicesReports: builder.query<PayloadType<SupplierInvoicesReports[]>, {}>({
        query: (data) => ({
          url: "/invoice/getSupplierInvoiceReport?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Orders"],
      }),
      getStockRoomItemsReports: builder.query<PayloadType<StockRoomItemsReports[]>, {}>({
        query: (data) => ({
          url: "/purchaseOrder/stockRoomItemReport?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Orders"],
      }),
      addPurchaseOrder: builder.mutation({
        query: (body) => ({
          url: "/purchaseOrder",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Orders"],
      }),

      getByIdPurchaseOrder: builder.query<OrderTableData, string>({
        query: (id) => ({ url: "purchaseOrder/" + id }),
        providesTags: ["Orders"],
        transformResponse: (result: {
          payLoad: OrderTableData;
          message: string;
        }) => {
          return result?.payLoad;
        },
      }),
      deletePurchaseOrder: builder.mutation({
        query: (id: number) => ({
          url: "/purchaseOrder/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Orders"],
      }),
    }),
  });
export const {
  useLazyGetPurchaseOrdersQuery,
  useAddPurchaseOrderMutation,
  useDeletePurchaseOrderMutation,
  useLazyGetByIdPurchaseOrderQuery,
  useLazyGetPurchaseOrderReportsQuery,
  useLazyGetSupplierInvoicesReportsQuery,
  useLazyGetStockRoomItemsReportsQuery
} = ordersApiSlice;
