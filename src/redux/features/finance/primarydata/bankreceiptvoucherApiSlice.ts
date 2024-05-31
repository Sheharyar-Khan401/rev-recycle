import { apiSlice } from "redux/api/apiSlice";
import {
  Voucher,
  VoucherRequest,
} from "redux/types/Finance/PrimaryData/bankreceiptvoucher";
import { PayloadType } from "redux/types/common/types";

export const bankAccountApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Voucher"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getVoucher: builder.query<
        PayloadType<Voucher[]>,
        {
          params: {};
        }
      >({
        query: (data) => ({
          url: `/voucher/search?${new URLSearchParams(
            data.params
          ).toString()}`,
        }),
        providesTags: ["Voucher"],
      }),
      getAllVoucherStatus: builder.query<
        PayloadType<Voucher[]>,
        {
        }
      >({
        query: () => ({
          url: `/voucher/Status`,
        }),
        providesTags: ["Voucher"],
      }),

      addVoucher: builder.mutation({
        query: (body: VoucherRequest) => ({
          url: "/voucher",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Voucher"],
      }),
      deleteVoucher: builder.mutation({
        query: (id: number) => ({
          url: "/voucher/" + id,
          method: "DELETE",
        }),

        invalidatesTags: ["Voucher"],
      }),

      editVoucher: builder.mutation({
        query: (data: VoucherRequest) => ({
          url: "/voucher/" + data.voucherId,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Voucher"],
      }),
      getVoucherById: builder.query<Voucher, { id: string; vtype: string }>({
        query: ({ id, vtype }) => ({ url: `voucher/type/${vtype}/get/${id}` }),
        providesTags: ["Voucher"],
        transformResponse: (result: { payLoad: Voucher; message: string }) => {
          return {
            voucherId: result.payLoad?.voucherId,
            voucherExchangeRate: result.payLoad?.voucherExchangeRate,
            vochrd: result.payLoad?.vochrd,
            transaction: result.payLoad?.transaction,
            particulars: result.payLoad?.particulars,
            cashaccountId: result.payLoad?.cashaccountId,
            businessCurrency: result.payLoad.businessCurrency,
            currencyId: result.payLoad?.businessCurrency?.currency?.currencyId,
            currencyName:
              result.payLoad.businessCurrency?.currency?.name,
            voucherType: result.payLoad?.voucherType,
            voucherStatusId: result.payLoad?.voucherStatusId,
            listOfVoucher: result.payLoad.listOfVoucher?.map((item) => {
              return {
                narration: item.narration,
                credit: item.credit,
                debit: item?.debit ? item?.debit : 0,
                costgrupname: item.cgroup?.name,
                accountTitle: item?.acc?.accountTitle,
                voucherAccountId: item?.voucherAccountId,
                accountId: item?.acc?.accountId ? item?.acc?.accountId : 0,
                acc: item?.acc,
                costGroupId: item?.costGroupId,
                chqNo: item?.chqNo ? item?.chqNo : 0,
                chqDate: item?.chqDate ? item?.chqDate : 0,
                chqClearanceDate: item?.chqClearanceDate
                  ? item?.chqClearanceDate
                  : 0,
              
              };
            }),
          };
        },
      }),
    }),
  });

export const {
  useGetVoucherByIdQuery,
  useLazyGetVoucherQuery,
  useAddVoucherMutation,
  useDeleteVoucherMutation,
  useEditVoucherMutation,
  useLazyGetVoucherByIdQuery,
  useGetAllVoucherStatusQuery
} = bankAccountApiSlice;
