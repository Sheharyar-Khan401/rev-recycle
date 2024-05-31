import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Voucher } from "redux/types/Finance/PrimaryData/bankreceiptvoucher";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import Filters from "shared/Components/Filters";
import {
  useDeleteVoucherMutation,
  useGetAllVoucherStatusQuery,
  useLazyGetVoucherQuery,
} from "redux/features/finance/primarydata/bankreceiptvoucherApiSlice";
import { getDateFromMillis, hasPermission } from "helper/utility";
import { useGetCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { useGetCashAccountQuery } from "redux/features/finance/primarydata/cashaccountApiSlice";
import VouchersSideNav from "components/Finance/VouchersSideNav";
export default function BankReceiptVouchers() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);
  const [deleteVoucher] = useDeleteVoucherMutation();
  const [getVouchers, result] = useLazyGetVoucherQuery();
  const { data: voucherStatus } = useGetAllVoucherStatusQuery([]);
  const { data: currencyData } = useGetCurrrencyQuery(null);
  const { data: getCashAccount } = useGetCashAccountQuery(null);
  const [queryParams, setQueryParams] = useState({
    voucherTypeId: 3,
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const bankData = result?.data?.payLoad;

  const handleDelete = (id: number) => {
    if (id) {
      deleteVoucher(id);
    }
  };

  useEffect(() => {
    hasPermission("fin_v_103") &&
      getVouchers({
        params: queryParams,
      });
  }, [queryParams, getVouchers]);

  return (
    <div className="d-lg-flex">
      <VouchersSideNav type={3} />
      <div className="table-container">
        <Filters
          componentRef={ref}
          printAble={(bankData && bankData.length > 0) ?? false}
          exportAble={(bankData && bankData.length > 0) ?? false}
          addRedirectPath={hasPermission("fin_v_100") ? "add" : ""}
          filters={[
            {
              label: "Status",
              name: "voucherStatusIds",
              inputType: "multiselect",
              options:
                voucherStatus &&
                voucherStatus?.payLoad &&
                voucherStatus?.payLoad?.length > 0
                  ? voucherStatus?.payLoad?.map((item) => {
                      return {
                        text: item?.voucherStatusName
                          ? item?.voucherStatusName
                          : "",
                        value: item?.voucherStatusId
                          ? item?.voucherStatusId
                          : 0,
                      };
                    })
                  : [],
            },
            {
              label: "Currency",
              name: "currencyIds",
              inputType: "multiselect",
              options: currencyData
                ? currencyData?.map((item) => {
                    return {
                      text: item?.name ? item?.name : "",
                      value: item?.businesscurrencyId
                        ? item?.businesscurrencyId
                        : 0,
                    };
                  })
                : [],
            },
            {
              label: "Cash Account",
              name: "cashAccountIds",
              inputType: "multiselect",
              options:
                getCashAccount && getCashAccount?.length > 0
                  ? getCashAccount?.map((item) => {
                      return {
                        text: item?.cashAccountTitle
                          ? item?.cashAccountTitle
                          : "",
                        value: item?.cashAccountId ? item?.cashAccountId : 0,
                      };
                    })
                  : [],
            },
            {
              label: "Id",
              name: "voucherId",
              inputType: "text",
            },
          ]}
          Dates={{
            fromDate: queryParams.startDate,
            toDate: queryParams.endDate,
          }}
          onDateChange={(startDate, endDate) => {
            setQueryParams({
              ...queryParams,
              startDate: startDate,
              endDate: endDate,
            });
          }}
          onSubmit={(query) => {
            if (Object.keys(query).length === 0) {
              setQueryParams({
                voucherTypeId: queryParams.voucherTypeId,
                pageNumber: queryParams.pageNumber,
                pageSize: queryParams.pageSize,
                startDate: queryParams.startDate,
                endDate: queryParams.endDate,
              });
            } else setQueryParams({ ...queryParams, ...query });
          }}
        />
        {hasPermission("fin_v_103") && (
          <DataTable
            ref={ref}
            tableTitle="Bank Receipt Vouchers"
            isLoading={result?.isFetching}
            totalItems={
              result?.data?.numberOfItems ? result?.data?.numberOfItems : 0
            }
            setOffset={(offset, limit) => {
              setQueryParams({
                ...queryParams,
                pageNumber: offset,
                pageSize: limit ? limit : globalVariables.ItemsPerPageLimit,
              });
            }}
            columns={[
              { label: "Type", field: "type" },
              { label: "Voucher Id", field: "voucherId" },
              { label: "Date", field: "vochrd" },
              { label: "Currency", field: "currencyName" },
              { label: "Ex-Rate", field: "voucherExchangeRate" },
              { label: "Debit", field: "debitAmount" },
              { label: "Credit", field: "creditAmount" },
              { label: "Diff", field: "diff" },
              { label: "Particulars", field: "particulars" },
              { label: "Status", field: "status" },
              { label: "ACTION", field: "action" },
            ]}
            rows={
              bankData
                ? bankData?.map((item: Voucher) => {
                    const { debit, credit } = item?.listOfVoucher
                      ? item?.listOfVoucher?.reduce(
                          (total, subitem) => {
                            // Directly add subitem.debit and subitem.credit to the total
                            total.debit += subitem?.debit || 0; // Use 0 as a default if debit is undefined
                            total.credit += subitem?.credit || 0; // Use 0 as a default if credit is undefined
                            return total;
                          },
                          { debit: 0, credit: 0 } // Initial total values
                        )
                      : { debit: 0, credit: 0 }; // Default values if listOfVoucher is undefined
                    return {
                      type: item?.voucherType
                        ? item?.voucherType?.voucherTypeName
                        : "-",
                      status: item?.voucherStatus
                        ? item?.voucherStatus?.voucherStatusName
                        : "-",
                      diff: "-",
                      voucherId: item?.voucherId ? item?.voucherId : 0,
                      vochrd: getDateFromMillis(item?.vochrd),
                      currencyName: item?.businessCurrency?.currency
                        ? item?.businessCurrency?.currency?.name
                        : "-",
                      voucherExchangeRate: item?.voucherExchangeRate
                        ? item?.voucherExchangeRate
                        : "-",
                      debitAmount: debit,
                      creditAmount: credit,
                      particulars: item?.particulars ? item?.particulars : "-",
                      action: (
                        <RoutingActionButton
                          onNavigate={
                            hasPermission("fin_v_101")
                              ? () => navigate("edit/" + item?.voucherId)
                              : undefined
                          }
                          onDeleteClick={
                            hasPermission("fin_v_102")
                              ? () => {
                                  handleDelete(item?.voucherId);
                                }
                              : undefined
                          }
                        />
                      ),
                    };
                  })
                : []
            }
          />
        )}
      </div>
    </div>
  );
}
