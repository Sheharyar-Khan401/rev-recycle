import { apiSlice } from "redux/api/apiSlice";
import { Item } from "redux/types/Settings/Productions/items";
import { ItemRequest } from "redux/types/Settings/Purchase/item";
import { PayloadType } from "redux/types/common/types";
export const itemApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Item"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getItem: builder.query<Item, number>({
        query: (id) => ({
          url: "/item/" + id,
        }),
        providesTags: ["Item"],
        transformResponse: (result: { payLoad: Item; message: string }) => {
          return result.payLoad;
        },
      }),
      getItems: builder.query<
        { payLoad: Array<Item>; numberOfItems: number; message: string },
        {}
      >({
        query: (data) => ({
          url: "/item?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["Item"],
      }),
      getAllItems: builder.query<Array<Item>, null>({
        query: () => ({ url: `/item?pageNumber=0&pageSize=0` }),
        providesTags: ["Item"],
        transformResponse: (result: {
          payLoad: Array<Item>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      getAllItemsinPurchaseOrders: builder.query<Array<Item>, null>({
        query: () => ({ url: `/item/allPurchaseItems` }),
        providesTags: ["Item"],
        transformResponse: (result: {
          payLoad: Array<Item>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      getAllProduction: builder.query<Array<Item>, null>({
        query: () => ({ url: `/item/allProductionItems` }),
        providesTags: ["Item"],
        transformResponse: (result: {
          payLoad: Array<Item>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      addItem: builder.mutation({
        query: (body: ItemRequest) => ({
          url: `/item`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Item"],
      }),
      updateItem: builder.mutation({
        query: (body: ItemRequest) => ({
          url: `/item`,
          method: "PUT",
          body: body,
        }),
        invalidatesTags: ["Item"],
      }),
      deleteItem: builder.mutation({
        query: (id: number) => ({
          url: "/item/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Item"],
      }),
      getAllProdPurchaseItems: builder.query<Array<Item>, null>({
        query: () => ({ url: `/item/allItems` }),
        providesTags: ["Item"],
        transformResponse: (result: {
          payLoad: Array<Item>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),
      findAllItems: builder.query<PayloadType<Item[]>, {}>({
        query: (params) => ({
          url: `/item/findAllItem?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["Item"],
      }),
    }),
  });

export const {
  useLazyFindAllItemsQuery,
  useGetAllProductionQuery,
  useLazyGetAllProductionQuery,
  useGetItemsQuery,
  useLazyGetItemsQuery,
  useLazyGetItemQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useGetAllItemsQuery,
  useDeleteItemMutation,
  useGetAllItemsinPurchaseOrdersQuery,
  useGetAllProdPurchaseItemsQuery,
} = itemApiSlice;
