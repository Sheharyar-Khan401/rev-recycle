import { apiSlice } from "redux/api/apiSlice";
import {
  transferSaleOrderUnitRequest,
  transferSaleOrderUnitResponse,
} from "redux/types/Productions/transferSaleOrderUnit";

export const dailyProductionApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["TransferSaleOrderUnit"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTransferSaleOrderUnit: builder.query<
        {
          payLoad: Array<transferSaleOrderUnitResponse>;
          numberOfItems: number;
        },
        {}
      >({
        query: (params) => ({
          url: `/transferredSaleOrder?${new URLSearchParams(
            params
          ).toString()}`,
        }),
        providesTags: ["TransferSaleOrderUnit"],
      }),
      getTransferSaleOrderUnitById: builder.query<
        transferSaleOrderUnitResponse,
        number
      >({
        query: (id: number) => ({
          url: `/transferredSaleOrder/${id}`,
        }),
        providesTags: ["TransferSaleOrderUnit"],
        transformResponse: (result: {
          payLoad: transferSaleOrderUnitResponse;
        }) => {
          return result.payLoad;
        },
      }),
      addTransferSaleOrderUnit: builder.mutation({
        query: ({ transferDate, description }) => {
          const parsedDate = new Date(transferDate).toISOString(); // Parse the transferDate property to a valid date string
          const parsedData: transferSaleOrderUnitRequest = {
            transferDate: parsedDate,
            description: description,
          };
          return {
            url: "/transferredSaleOrder",
            method: "POST",
            body: parsedData,
          };
        },
        invalidatesTags: ["TransferSaleOrderUnit"],
      }),

      editTransferSaleOrder: builder.mutation({
        query: (data) => {
          return {
            url: "/transferredSaleOrder",
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["TransferSaleOrderUnit"],
      }),
      deleteTransferSaleOrderUnit: builder.mutation({
        query: (id: number) => ({
          url: "/transferredSaleOrder/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["TransferSaleOrderUnit"],
      }),
    }),
  });
export const {
  useLazyGetTransferSaleOrderUnitQuery,
  useDeleteTransferSaleOrderUnitMutation,
  useAddTransferSaleOrderUnitMutation,
  useLazyGetTransferSaleOrderUnitByIdQuery,
  useEditTransferSaleOrderMutation,
} = dailyProductionApiSlice;
