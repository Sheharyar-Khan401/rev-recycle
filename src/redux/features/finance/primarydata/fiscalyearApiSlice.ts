import { apiSlice } from "redux/api/apiSlice";
import {
  // FiscalYearData,
  FiscalYearResponse,
} from "redux/types/Finance/PrimaryData/fiscalyear";
import { PayloadType } from "redux/types/common/types";

export const fiscalyearApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["FiscalYear"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getFiscalYear: builder.query<PayloadType<FiscalYearResponse[]>, {}>({
        query: (data) => ({
          url: "/fiscalyear?" + new URLSearchParams(data).toString(),
        }),
        providesTags: ["FiscalYear"],
        transformResponse: (result: PayloadType<FiscalYearResponse[]>) => {
          return result;
        },
      }),
      addFiscalYear: builder.mutation({
        query: (body) => ({
          url: "/fiscalyear",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["FiscalYear"],
      }),
      deleteFiscalYear: builder.mutation({
        query: (id: number) => ({
          url: "/fiscalyear/" + id,
          method: "DELETE",
        }),

        invalidatesTags: ["FiscalYear"],
      }),
      editFiscalYear: builder.mutation({
        query: (data) => ({
          url: "/fiscalyear",
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["FiscalYear"],
      }),
      getByIdFiscalYear: builder.query<FiscalYearResponse, string>({
        query: (id) => ({ url: "fiscalyear/" + id }),
        providesTags: ["FiscalYear"],
        transformResponse: (result: {
          payLoad: FiscalYearResponse;
          message: string;
        }) => {
          return result?.payLoad;
        },
      }),
    }),
  });

export const {
  useAddFiscalYearMutation,
  useGetFiscalYearQuery,
  useLazyGetFiscalYearQuery,
  useDeleteFiscalYearMutation,
  useLazyGetByIdFiscalYearQuery,
  useEditFiscalYearMutation,
} = fiscalyearApiSlice;
