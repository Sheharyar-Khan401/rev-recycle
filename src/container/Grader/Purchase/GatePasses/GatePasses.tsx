import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import { PurchaseGatePassesReponse } from "redux/types/GatePasses/gatePasses";
import {
  useDeleteGatePassesMutation,
  useLazyGetGatePassesQuery,
} from "redux/features/purchase/gatePassesApiSlice";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import Filters from "shared/Components/Filters";
import { useGetAllSupplierQuery } from "redux/features/Clients/Suppliers/suppliersApiSlice";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { Client } from "redux/types/Clients/Clients/client";
import {
  getDateFromMillis,
  getTimeFromMillis,
  hasPermission,
} from "helper/utility";
export default function GatePasses() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const [getGatePasses, result] = useLazyGetGatePassesQuery();
  const [deletePurchaseGatePasses] = useDeleteGatePassesMutation();
  const { data: suppliersList } = useGetAllSupplierQuery(null);
  const { data: invoiceTypeList } = useGetInvoiceTypesQuery(null);
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  const handleDelete = (id: number) => {
    if (id) {
      deletePurchaseGatePasses(id);
    }
  };

  useEffect(() => {
    hasPermission("pur_gp_103") && getGatePasses(queryParams);
  }, [queryParams, getGatePasses]);

  return (
    <div className="table-container">
      <Filters
        componentRef={ref}
        printAble={
          (result?.data?.payLoad && result?.data?.payLoad.length > 0) ?? false
        }
        exportAble={
          (result?.data?.payLoad && result?.data?.payLoad.length > 0) ?? false
        }
        filters={[
          {
            label: "Suppliers",
            name: "supplierId",
            inputType: "multiselect",
            options: suppliersList
              ? suppliersList?.map((supplier: Client) => {
                  return {
                    text: supplier.user?.fullName
                      ? supplier.user?.fullName
                      : "",
                    value: supplier.clientId ? supplier.clientId : 0,
                  };
                })
              : [],
          },
          {
            label: "Invoice Types",
            name: "invoiceTypeIds",
            inputType: "multiselect",
            options: invoiceTypeList
              ? invoiceTypeList?.map((item: InvoiceType) => {
                  return {
                    text: item?.name ? item?.name : "",
                    value: item.invoiceTypeId ? item.invoiceTypeId : 0,
                  };
                })
              : [],
          },
          {
            label: "Container No.",
            name: "containerNo",
            inputType: "text",
          },
          {
            label: "Invoice No.",
            name: "invoiceNo",
            inputType: "text",
          },
          {
            label: "Reference.",
            name: "reference",
            inputType: "text",
          },
          {
            label: "Posted",
            name: "posted",
            inputType: "boolean",
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
      {hasPermission("pur_gp_103") && (
        <DataTable
          fixLastColumn
          tableTitle="Purchase Gate Passes"
          ref={ref}
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
            { label: "Id", field: "purchaseGatePassId" },
            { label: "Date", field: "passingDate" },
            { label: "Arrival", field: "arrivalTime" },
            { label: "Departure", field: "departureTime" },
            { label: "Invoice No.", field: "purchaseInvoice" },
            { label: "container No.", field: "containerNo" },
            { label: "Reference", field: "reference" },
            { label: "Stock Room", field: "stockRoom" },
            { label: "Supplier", field: "supplier" },
            { label: "BL Number", field: "grade" },
            { label: "Purchase Method", field: "purchaseMethod" },
            { label: "Posted", field: "posted" },
            { label: "Purchase Order", field: "purchaseOrderId" },
            { label: "Purchase Invoice", field: "purchaseInvoiceId" },
            { label: "Action", field: "action" },
          ]}
          rows={
            result?.data?.payLoad
              ? result?.data?.payLoad.map(
                  (gatepasses: PurchaseGatePassesReponse) => {
                    return {
                      purchaseGatePassId: gatepasses?.gatePassId,
                      passingDate: getDateFromMillis(gatepasses?.passingDate),
                      reference: gatepasses?.referenceNumber
                        ? gatepasses?.referenceNumber
                        : "-",
                      arrivalTime: getTimeFromMillis(gatepasses?.arrivalTime),
                      departureTime: getTimeFromMillis(
                        gatepasses?.departureTime
                      ),
                      containerNo: gatepasses?.containerNo
                        ? gatepasses?.containerNo
                        : "-",
                      stockRoom: gatepasses?.stockroom?.name
                        ? gatepasses?.stockroom?.name
                        : "-",
                      supplier: gatepasses?.supplier?.user
                        ? gatepasses?.supplier?.user?.fullName
                        : "-",
                      posted: gatepasses?.posted ? "Yes" : "No",
                      grade: gatepasses?.grade?.name
                        ? gatepasses?.grade?.name
                        : "-",
                      purchaseInvoice: gatepasses?.invoice
                        ? gatepasses?.invoice?.invoiceNo
                        : "-",
                      purchaseMethod: gatepasses?.purchaseMethod?.name
                        ? gatepasses?.purchaseMethod?.name
                        : "-",
                      purchaseOrderId: gatepasses?.purchaseOrder
                        ?.purchaseOrderId ? (
                        <div
                          className="text-primary"
                          role="button"
                          onClick={() =>
                            navigate(
                              "/grader/purchase/orders/edit/" +
                                gatepasses?.purchaseOrder?.purchaseOrderId
                            )
                          }
                        >
                          View
                        </div>
                      ) : (
                        ""
                      ),
                      purchaseInvoiceId: gatepasses?.invoice?.invoiceId ? (
                        <div
                          className="text-primary"
                          role="button"
                          onClick={() =>
                            navigate(
                              "/grader/purchase/invoices/edit/" +
                                gatepasses?.invoice?.invoiceId
                            )
                          }
                        >
                          View
                        </div>
                      ) : (
                        ""
                      ),
                      action: (
                        <RoutingActionButton
                          onNavigate={
                            hasPermission("pur_gp_101")
                              ? () =>
                                  navigate(
                                    "/grader/purchase/gatepasses/edit/" +
                                      gatepasses?.gatePassId
                                  )
                              : undefined
                          }
                          onDeleteClick={
                            hasPermission("pur_gp_102") && !gatepasses?.posted
                              ? () => {
                                  handleDelete(gatepasses?.gatePassId);
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
