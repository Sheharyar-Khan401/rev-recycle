import { apiSlice } from "redux/api/apiSlice";
import { TransferSaleOrderUnitsAgainstCode } from "redux/types/Productions/transferSaleOrderUnit";
import {
  ItemCustomerGatePassReport,
  ItemsBySaleOrderId,
  OrderStatusesReport,
  SaleOrderItems,
  SaleOrderItemsResponse,
  SaleOrdersTableData,
  SalesImportItemsRequest,
} from "redux/types/Orders/saleOrders";
import { GatePassesResponse } from "redux/types/Sales/gatepasses";
import { PayloadType } from "redux/types/common/types";
export const saleOrdersApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Orders"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSaleOrders: builder.query<PayloadType<SaleOrdersTableData[]>, {}>({
        query: (data) => ({
          url: "/saleOrder?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Orders"],
      }),
      getAllSaleOrders: builder.query<PayloadType<SaleOrdersTableData[]>, null>(
        {
          query: () => ({
            url: "/saleOrder?converted=false",
          }),
          providesTags: ["Orders"],
        }
      ),
      getOrderStatusesReports: builder.query<
        PayloadType<OrderStatusesReport[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/saleOrderItem/orderStatusReport?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["Orders"],
      }),
      getItemCustomerGatePassReports: builder.query<
        PayloadType<ItemCustomerGatePassReport[]>,
        {}
      >({
        query: (data) => ({
          url:
            "/saleOrderItem/getItemCustomerGatePassReport?" +
            new URLSearchParams(data).toString(),
        }),
        providesTags: ["Orders"],
      }),
      convertSaleOrderToGatePass: builder.query<GatePassesResponse, number>({
        query: (saleOrderId) => ({
          url: `saleOrder/convertToGatePass/${saleOrderId}`,
          method:"POST",
        }),
        transformResponse: (result: {
          payLoad: GatePassesResponse;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      getAllSaleOrdersItems: builder.query<Array<ItemsBySaleOrderId>, number>({
        query: (id) => ({
          url: `/saleOrderItem/getBySaleOrder?saleOrderId=${id}`,
        }),
        providesTags: ["Orders"],
        transformResponse: (result: {
          payLoad: Array<ItemsBySaleOrderId>;
          message: string;
        }) => {
          return result.payLoad ? result.payLoad : [];
        },
      }),
      addSaleOrder: builder.mutation({
        query: (body) => ({
          url: "/saleOrder",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Orders"],
      }),
      editSaleOrder: builder.mutation({
        query: (body) => ({
          url: "/saleOrder",
          method: "PUT",
          body: body,
        }),
        invalidatesTags: ["Orders"],
      }),
      editSaleOrderItems: builder.mutation({
        query: (body) => ({
          url: "/saleOrderItem?saleOrderId=" + body?.saleOrderId,
          method: "POST",
          body: body.rowData,
        }),
        invalidatesTags: ["Orders"],
      }),
      getByIdSaleOrder: builder.query<SaleOrdersTableData, string>({
        query: (id) => ({ url: "saleOrder/" + id }),
        providesTags: ["Orders"],
        transformResponse: (result: {
          payLoad: SaleOrdersTableData;
          message: string;
        }) => {
          return result?.payLoad;
        },
      }),
      deleteSalesOrder: builder.mutation({
        query: (id: number) => ({
          url: "/saleOrder/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Orders"],
      }),
      postSaleImportInvoiceItems: builder.mutation({
        query: ({
          orderId,
          body,
        }: {
          orderId: number;
          body: SalesImportItemsRequest[];
        }) => ({
          url: "/saleOrderItem/importItems/" + orderId,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Orders"],
      }),
     
      getSaleOdersItemsByCode: builder.query<
        TransferSaleOrderUnitsAgainstCode,
        {}
      >({
        query: (params) => ({
          url: `/saleOrderItem/getByCode?${new URLSearchParams(
            params
          ).toString()}`,
        }),
        providesTags: ["Orders"],
        transformResponse: (result: {
          payLoad: TransferSaleOrderUnitsAgainstCode;
        }) => {
          return result.payLoad;
        },
      }),
    }),
  });

export const {
  useLazyConvertSaleOrderToGatePassQuery,
  useLazyGetSaleOrdersQuery,
  useGetAllSaleOrdersQuery,
  useAddSaleOrderMutation,
  useEditSaleOrderMutation,
  useDeleteSalesOrderMutation,
  useLazyGetByIdSaleOrderQuery,
  useEditSaleOrderItemsMutation,
  usePostSaleImportInvoiceItemsMutation,
  useLazyGetAllSaleOrdersItemsQuery,
  useLazyGetSaleOdersItemsByCodeQuery,
  useLazyGetOrderStatusesReportsQuery,
  useLazyGetItemCustomerGatePassReportsQuery,
} = saleOrdersApiSlice;
