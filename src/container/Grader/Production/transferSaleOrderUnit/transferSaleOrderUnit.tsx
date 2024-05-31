import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import DataTable from "shared/Components/DataTable";
import {
  useDeleteTransferSaleOrderUnitMutation,
  useLazyGetTransferSaleOrderUnitQuery,
} from "redux/features/productions/transferSaleOrderUnitApiSlice";
import { transferSaleOrderUnitResponse } from "redux/types/Productions/transferSaleOrderUnit";
import { globalVariables } from "helper/globalVariables";
import Filters from "shared/Components/Filters";
import { getDateFromMillis, hasPermission } from "helper/utility";
export default function TransferSaleOrderUnit() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const [getTransferSaleOrderUnit, result] =
    useLazyGetTransferSaleOrderUnitQuery();
  const [deleteTranferSaleOrderUnit] = useDeleteTransferSaleOrderUnitMutation();
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const transferSaleOrderData = result?.data?.payLoad;
  useEffect(() => {
    hasPermission("pro_tsou_103") && getTransferSaleOrderUnit(queryParams);
  }, [queryParams, getTransferSaleOrderUnit]);

  const handleDelete = (id: number) => {
    if (id) {
      deleteTranferSaleOrderUnit(id);
    }
  };
  return (
    <div className="table-container">
      <Filters
        componentRef={ref}
        printAble={
          (transferSaleOrderData && transferSaleOrderData.length > 0) ?? false
        }
        exportAble={
          (transferSaleOrderData && transferSaleOrderData.length > 0) ?? false
        }
        addRedirectPath={
          hasPermission("pro_tsou_100")
            ? "/grader/production/transfersaleorderunits/add"
            : ""
        }
        filters={[
          {
            label: "Transfer Id",
            name: "transferId",
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
              pageNumber: queryParams.pageNumber,
              pageSize: queryParams.pageSize,
              startDate: queryParams.startDate,
              endDate: queryParams.endDate,
            });
          } else setQueryParams({ ...queryParams, ...query });
        }}
      />
      {hasPermission("pro_tsou_103") && (
        <DataTable
          ref={ref}
          tableTitle="Transfer Sale Order Units"
          isLoading={result.isFetching}
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
            { label: "Transfer Id", field: "transferId" },
            { label: "Transfer Date", field: "transferDate" },
            { label: "Description", field: "description" },
            { label: "Transferred Quantity", field: "transferredQty" },
            { label: "action", field: "action" },
          ]}
          rows={
            transferSaleOrderData
              ? transferSaleOrderData?.map(
                  (transferData: transferSaleOrderUnitResponse) => {
                    return {
                      transferId: transferData?.transferId
                        ? transferData?.transferId
                        : 0,
                      transferDate: getDateFromMillis(
                        transferData?.transferDate
                      ),
                      description: transferData?.description
                        ? transferData?.description
                        : "-",
                      transferredQty: transferData?.transferredQty
                        ? transferData?.transferredQty
                        : 0,
                      action: (
                        <RoutingActionButton
                          onNavigate={
                            hasPermission("pro_tsou_101")
                              ? () =>
                                  navigate(
                                    "/grader/production/transfersaleorderunits/edit/" +
                                      transferData?.transferId
                                  )
                              : undefined
                          }
                          onDeleteClick={
                            hasPermission("pro_tsou_102")
                              ? () => {
                                  handleDelete(transferData?.transferId);
                                }
                              : undefined
                          }
                        />
                      ),
                    };
                  }
                )
              : []
          }
        />
      )}
    </div>
  );
}
