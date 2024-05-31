import { apiSlice } from "redux/api/apiSlice";
import {
  CodesAgainstItems,
  dailyProductionResponse,
  productionDepartment,
} from "redux/types/Productions/dailyProduction";

export const dailyProductionApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["DailyProduction"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getDailyProduction: builder.query<
        { payLoad: Array<dailyProductionResponse>; numberOfItems: number },
        {}
      >({
        query: (params) => ({
          url: `/dailyProduct/?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["DailyProduction"],
      }),
      getAllDailyProduction: builder.query<
        { payLoad: Array<dailyProductionResponse> },
        null
      >({
        query: () => ({
          url: `/dailyProduct/`,
        }),
        providesTags: ["DailyProduction"],
      }),
      getDailyProductionById: builder.query<dailyProductionResponse, number>({
        query: (codeId) => ({
          url: `/dailyProduct/${codeId}`,
        }),
        providesTags: ["DailyProduction"],
        transformResponse: (result: { payLoad: dailyProductionResponse }) => {
          return result.payLoad;
        },
      }),
      addDailyProduction: builder.mutation({
        query: (params) => {
          return {
            url:
              "/dailyProduct/?floorId=" +
              params.floorId +
              "&cartonId=" +
              params.cartonId +
              "&stationId=" +
              params.stationId,
            method: "POST",
            body: JSON.stringify({ date: params.date }),
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
        invalidatesTags: ["DailyProduction"],
      }),
      editDailyProduction: builder.mutation({
        query: (data) => {
          return {
            url: `/dailyProduct/?dailyProductionId=${data.dailyProductionId}&stationId=${data.stationId}`,
            method: "PUT",
            body: data.rowData,
          };
        },
        invalidatesTags: ["DailyProduction"],
      }),
      deleteDailyProduction: builder.mutation({
        query: (id: number) => ({
          url: "/dailyProduct/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["DailyProduction"],
      }),

      productionDepartment: builder.query<productionDepartment[], null>({
        query: () => ({
          url: `/productionDept`,
        }),
        providesTags: ["DailyProduction"],
        transformResponse: (result: { payLoad: productionDepartment[] }) => {
          return result.payLoad;
        },
      }),
      getAllCodesOfDailyProductionBy: builder.query<
        { payLoad: Array<CodesAgainstItems>; numberOfItems: number },
        { itemId: number; dailyProductionId: number }
      >({
        query: ({ itemId, dailyProductionId }) => ({
          url: `dailyProduct/getItems?itemId=${itemId}&dailyProductionId=${dailyProductionId}`,
        }),
        providesTags: ["DailyProduction"],
      }),
      deleteCodeOnProductionItemId: builder.mutation({
        query: (id: number) => ({
          url: `/dailyProduct/deleteById?dailyProductionItemId=${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["DailyProduction"],
      }),
    }),
  });
export const {
  useLazyGetDailyProductionQuery,
  useGetDailyProductionQuery,
  useDeleteDailyProductionMutation,
  useAddDailyProductionMutation,
  useLazyGetDailyProductionByIdQuery,
  useEditDailyProductionMutation,
  useGetAllDailyProductionQuery,
  useProductionDepartmentQuery,
  useLazyGetAllCodesOfDailyProductionByQuery,
  useDeleteCodeOnProductionItemIdMutation,
} = dailyProductionApiSlice;
