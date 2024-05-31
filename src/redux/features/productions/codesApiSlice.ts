import { apiSlice } from "redux/api/apiSlice";
import { CodeRequest, Codes } from "redux/types/Productions/codes";

export const codesApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Codes"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCodes: builder.query<
        { payLoad: Array<Codes>; numberOfItems: number },
        {}
      >({
        query: (params) => ({
          url: `/codes?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["Codes"],
      }),
      getAllCodes: builder.query<Array<Codes>, null>({
        query: () => ({
          url: `/codes`,
        }),
        providesTags: ["Codes"],
        transformResponse: (result: { payLoad: Codes[] }) => {
          return result.payLoad;
        },
      }),
      getCodesById: builder.query<Codes, number>({
        query: (codeId) => ({
          url: `/codes/${codeId}`,
        }),
        providesTags: ["Codes"],
        transformResponse: (result: { payLoad: Codes }) => {
          return result.payLoad;
        },
      }),
      getItemsByCodeId: builder.query<Codes, {}>({
        query: (params) => ({
          url: `/codes/code?${new URLSearchParams(params).toString()}`,
        }),
        providesTags: ["Codes"],
        transformResponse: (result: { payLoad: Codes }) => {
          return result.payLoad;
        },
      }),

      editItemsByCodeId: builder.mutation({
        query: (data) => {
          return {
            url: `/codes/code?${new URLSearchParams(data.params).toString()}`,
            method: "PUT",
            body: data.body,
          };
        },
        invalidatesTags: ["Codes"],
        transformResponse: (result: { payLoad: Codes }) => {
          return result.payLoad;
        },
      }),

      scanItemsByCodeId: builder.mutation({
        query: (data) => {
          return {
            url: `/codes/getIssuanceByCode?${new URLSearchParams(data.params).toString()}`,
            method: "PUT",
            body: data.body,
          };
        },
        invalidatesTags: ["Codes"],
        transformResponse: (result: { payLoad: Codes }) => {
          return result.payLoad;
        },
      }),

      getDailyProductionByCodeId: builder.mutation({
        query: (data) => {
          return {
            url: `/codes/getDailyProductionByCode?${new URLSearchParams(data.params).toString()}`,
            method: "PUT",
            body: data.body,
          };
        },
        invalidatesTags: ["Codes"],
        transformResponse: (result: { payLoad: Codes }) => {
          return result.payLoad;
        },
      }),

      getGatePassByCodeId: builder.mutation({
        query: (data) => {
          return {
            url: `/codes/getGatePassByCode?${new URLSearchParams(data.params).toString()}`,
            method: "PUT",
            body: data.body,
          };
        },
        invalidatesTags: ["Codes"],
        transformResponse: (result: { payLoad: Codes }) => {
          return result.payLoad;
        },
      }),

      getItemsByCode: builder.query<
        { payLoad: Array<Codes>; numberOfItems: number },
        {}
      >({
        query: (id) => ({
          url: `/codes/getByBatch/${id}`,
        }),
        providesTags: ["Codes"],
      }),
      getCodesByItemId: builder.query<
        { payLoad: Array<Codes>; numberOfItems: number },
        {}
      >({
        query: (params) => ({
          url: `/codes/purchase/itemId?${new URLSearchParams(
            params
          ).toString()}`,
        }),
        providesTags: ["Codes"],
      }),
      addCodes: builder.mutation({
        query: (body: CodeRequest) => {
          return {
            url: "/codes",
            method: "POST",
            body: body,
          };
        },
        invalidatesTags: ["Codes"],
      }),
      editCodes: builder.mutation({
        query: (body: CodeRequest) => {
          return {
            url: "/codes",
            method: "PUT",
            body: body,
          };
        },
        invalidatesTags: ["Codes"],
      }),
      deleteCodes: builder.mutation({
        query: (id: number) => ({
          url: "/codes/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Codes"],
      }),
      getAllCodesByItemId: builder.query<
        { payLoad: Array<Codes>; numberOfItems: number },
        {}
      >({
        query: (params) => ({
          url: `/codes/getcode/${params}`,
        }),
        providesTags: ["Codes"],
      }),
    }),
  });
export const {
  useLazyGetCodesQuery,
  useDeleteCodesMutation,
  useAddCodesMutation,
  useLazyGetCodesByIdQuery,
  useGetAllCodesQuery,
  useEditCodesMutation,
  useLazyGetItemsByCodeQuery,
  useLazyGetItemsByCodeIdQuery,
  useLazyGetCodesByItemIdQuery,
  useLazyGetAllCodesByItemIdQuery,
  useEditItemsByCodeIdMutation,
  useScanItemsByCodeIdMutation,
  useGetDailyProductionByCodeIdMutation,
  useGetGatePassByCodeIdMutation
} = codesApiSlice;
