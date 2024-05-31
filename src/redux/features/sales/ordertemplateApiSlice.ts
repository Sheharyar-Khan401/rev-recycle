import { apiSlice } from "redux/api/apiSlice";
import {
  OrderTemplateById,
  itemTableDataResponse,
} from "redux/types/Sales/ordertemplate";
import { PayloadType } from "redux/types/common/types";

export const ordertemplateApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["OrderTemplate"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getordertemplate: builder.query<PayloadType<itemTableDataResponse[]>, {}>({
        query: (data) => ({ url: "/saleOrderTemplate?"+ new URLSearchParams(data).toString() }),
        providesTags: ["OrderTemplate"],
      }),
      getAllordertemplate: builder.query<Array<itemTableDataResponse>, null>({
        query: () => ({ url: "/saleOrderTemplate" }),
        providesTags: ["OrderTemplate"],
        transformResponse: (result: {
          payLoad: Array<itemTableDataResponse>;
          message: string;
        }) => {
          return result.payLoad;
        },
      }),

      addordertemplate: builder.mutation({
        query: (body) => ({
          url: "/saleOrderTemplate",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["OrderTemplate"],
      }),
      editOrderTemplate: builder.mutation({
        query: (body) => {
          return {
            url: "/saleOrderTemplate",
            method: "PUT",
            body: body,
          };
        },
        invalidatesTags: ["OrderTemplate"],
      }),
      deleteOrderTemplate: builder.mutation({
        query: (id: number) => ({
          url: "/saleOrderTemplate/" + id,
          method: "DELETE",
        }),

        invalidatesTags: ["OrderTemplate"],
      }),
      getByIdOrderTemplate: builder.query<OrderTemplateById, string>({
        query: (id) => ({ url: "saleOrderTemplate/" + id }),
        providesTags: ["OrderTemplate"],
        transformResponse: (result: { payLoad: OrderTemplateById }) => {
          return result.payLoad;
        },
      }),
    }),
  });

export const {
  useGetAllordertemplateQuery,
  useLazyGetordertemplateQuery,
  useAddordertemplateMutation,
  useEditOrderTemplateMutation,
  useLazyGetByIdOrderTemplateQuery,
  useDeleteOrderTemplateMutation,
} = ordertemplateApiSlice;
