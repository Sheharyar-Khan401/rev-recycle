import { apiSlice } from "redux/api/apiSlice";
import {
  Item,
  ProductionItemsResponse,
  ProductionLedger,
} from "redux/types/Settings/Productions/items";
import { PayloadType } from "redux/types/common/types";
export const ProductionItemApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["ProductionItem"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProductionItems: builder.query<
        { payLoad: Array<Item>; numberOfItems: number },
        {}
      >({
        query: (params) => ({
          url: `/item?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["ProductionItem"],
      }),
      getAllProductionItems: builder.query<Array<Item>, null>({
        query: () => ({ url: `/item/allProductionItems` }),
        providesTags: ["ProductionItem"],
        transformResponse: (result: {
          payLoad: Array<Item>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      addProductionItem: builder.mutation({
        query: (updated) => ({
          url: "/item?brands=" + updated?.brands,
          method: "POST",
          body: updated?.values,
        }),
        invalidatesTags: ["ProductionItem"],
      }),
      deleteProductionItem: builder.mutation({
        query: (id: number) => ({
          url: `/item/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ProductionItem"],
      }),
      getProductionItemsById: builder.query<ProductionItemsResponse, number>({
        query: (id: number) => ({ url: `/item/${id}` }),
        providesTags: ["ProductionItem"],
        transformResponse: (result: {
          payLoad: ProductionItemsResponse;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      getProductionLedger: builder.query<PayloadType< ProductionLedger[]>, {}>({
        query: (params) => ({
          url: `/dailyProduct/productionCodes?${new URLSearchParams(
            params
          ).toString()}`,
        }),
        providesTags: ["ProductionItem"],
      }),
      getProductionTotalWeights: builder.query<ProductionLedger[], {}>({
        query: (params) => ({
          url: `/dailyProduct/productionCodesMonthTotal?${new URLSearchParams(
            params
          ).toString()}`,
        }),
        providesTags: ["ProductionItem"],
        transformResponse: (result: {
          payLoad: ProductionLedger[];
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      updateProductionItem: builder.mutation({
        query: (updated) => ({
          url: "/item",
          method: "PUT",
          body: updated,
        }),
        invalidatesTags: ["ProductionItem"],
      }),
    }),
  });

export const {
  useAddProductionItemMutation,
  useGetProductionItemsQuery,
  useLazyGetProductionItemsQuery,
  useGetAllProductionItemsQuery,
  useDeleteProductionItemMutation,
  useLazyGetProductionItemsByIdQuery,
  useUpdateProductionItemMutation,
  useLazyGetProductionLedgerQuery,
  useLazyGetProductionTotalWeightsQuery
} = ProductionItemApiSlice;
