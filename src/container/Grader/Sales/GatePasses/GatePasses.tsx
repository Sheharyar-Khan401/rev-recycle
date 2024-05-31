import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import {
  useDeleteSalesGatePassesMutation,
  useLazyGetSalesGatePassesQuery,
} from "redux/features/sales/gatePassesApiSlice";
import { GatePassesResponse } from "redux/types/Sales/gatepasses";
import { globalVariables } from "helper/globalVariables";
import Filters from "shared/Components/Filters";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { useGetOrderStatusQuery } from "redux/features/purchase/Order/OrderStatusApiSlice";
import { useGetCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { Client } from "redux/types/Clients/Clients/client";
import { OrderStatus } from "redux/types/common/orderStatus";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { CurrencyRequest } from "redux/types/Settings/Finance/currency";
import {
  getDateFromMillis,
  getTimeFromMillis,
  hasPermission,
  roundValue,
} from "helper/utility";

export default function GatePasses() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);

  const [getGatePasses, result] = useLazyGetSalesGatePassesQuery();
  const [deleteGatePasses] = useDeleteSalesGatePassesMutation();
  const { data: customersList } = useGetAllClientsQuery(null);
  const { data: orderStatusList } = useGetOrderStatusQuery(null);
  const { data: currencyList } = useGetCurrrencyQuery(null);
  const { data: invoiceTypeList } = useGetInvoiceTypesQuery(null);
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
  });
  const gatePassesData = result?.data?.payLoad;

  const handleDelete = (id: number) => {
    if (id) {
      deleteGatePasses(id);
    }
  };
  useEffect(() => {
    hasPermission("sal_gp_103") && getGatePasses(queryParams);
  }, [queryParams, getGatePasses]);

  return (
    <div className="table-container">
      <Filters
        componentRef={ref}
        printAble={(gatePassesData && gatePassesData.length > 0) ?? false}
        exportAble={(gatePassesData && gatePassesData.length > 0) ?? false}
        filters={[
          {
            label: "Customers",
            name: "customerIds",
            inputType: "multiselect",
            options: customersList
              ? customersList?.map((supplier: Client) => {
                  return {
                    text: supplier.user ? supplier.user?.userName : "",
                    value: supplier.clientId ? supplier.clientId : 0,
                  };
                })
              : [],
          },
          {
            label: "Order Status",
            name: "orderStatusIds",
            inputType: "multiselect",
            options: orderStatusList
              ? orderStatusList?.map((item: OrderStatus) => {
                  return {
                    text: item?.name ? item?.name : "",
                    value: item?.orderStatusId ? item?.orderStatusId : 0,
                  };
                })
              : [],
          },
          {
            label: "Currency",
            name: "currencyIds",
            inputType: "multiselect",
            options: currencyList
              ? currencyList?.map((item: CurrencyRequest) => {
                  return {
                    text: item?.name ? item?.name : "",
                    value: item?.currencyId ? item?.currencyId : 0,
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
            label: "Name",
            name: "name",
            inputType: "text",
          },
          {
            label: "Arrival Date",
            name: "arrivalDate",
            inputType: "date",
          },
          {
            label: "Departure Date",
            name: "departureDate",
            inputType: "date",
          },
          {
            label: "Posted",
            name: "posted",
            inputType: "boolean",
          },
          {
            label: "Finalized",
            name: "finalized",
            inputType: "boolean",
          },
        ]}
        onSubmit={(query) => {
          if (Object.keys(query).length === 0) {
            setQueryParams({
              pageNumber: queryParams.pageNumber,
              pageSize: queryParams.pageSize,
            });
          } else setQueryParams({ ...queryParams, ...query });
        }}
      />

      {hasPermission("sal_gp_103") && (
        <DataTable
          ref={ref}
          tableTitle="Sales Gate Passes"
          fixLastColumn
          isLoading={result.isLoading}
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
            { label: "ID", field: "saleGatPassId" },
            { label: "Date", field: "gatePassDate" },
            { label: "Customer", field: "customer" },
            { label: "Reference No", field: "referenceNo" },
            { label: "Vehicle No", field: "vehicleNumber" },
            { label: "Arrival Time", field: "arrivalTime" },
            { label: "Departure Time", field: "departureTime" },
            { label: "Container No", field: "containerNum" },
            { label: "Pos", field: "isPosted" },
            { label: "Fin", field: "isFinalized" },
            { label: "Total Units", field: "totalUnits" },
            { label: "Total Amount", field: "totalAmount" },
            { label: "Order", field: "saleOrderId" },
            { label: "Invoice", field: "orderSaleInvoiceId" },
            { label: "Action", field: "action" },
          ]}
          rows={
            gatePassesData
              ? gatePassesData.map((gatepasses: GatePassesResponse) => {
                  return {
                    saleGatPassId: gatepasses?.gatePassId
                      ? gatepasses?.gatePassId
                      : "-",
                    gatePassDate: getDateFromMillis(gatepasses?.passingDate),
                    customer: gatepasses?.supplier?.user
                      ? gatepasses?.supplier?.user?.fullName
                      : "-",
                    referenceNo: gatepasses?.referenceNumber
                      ? gatepasses?.referenceNumber
                      : "-",
                    vehicleNumber: gatepasses?.vehicleNo
                      ? gatepasses?.vehicleNo
                      : "-",
                    arrivalTime: getTimeFromMillis(gatepasses?.arrivalTime),
                    departureTime: getTimeFromMillis(gatepasses?.departureTime),
                    containerNum: gatepasses?.containerNo
                      ? gatepasses?.containerNo
                      : "-",
                    isPosted: gatepasses?.posted ? "Yes" : "No",
                    isFinalized: gatepasses?.finalized ? "Yes" : "No",
                    totalUnits: gatepasses?.totalUnits
                      ? gatepasses?.totalUnits
                      : "-",
                    totalAmount: gatepasses?.totalAmount
                      ? roundValue(gatepasses?.totalAmount)
                      : "-",
                    saleOrderId: gatepasses?.saleOrder?.saleOrderId ? (
                      <div
                        className="text-primary"
                        role="button"
                        onClick={() =>
                          navigate(
                            "/grader/sales/orders/edit/" +
                              gatepasses?.saleOrder?.saleOrderId
                          )
                        }
                      >
                        View
                      </div>
                    ) : (
                      "-"
                    ),
                    orderSaleInvoiceId: gatepasses?.invoice?.invoiceId ? (
                      <div
                        className="text-primary"
                        role="button"
                        onClick={() =>
                          navigate(
                            "/grader/sales/invoices/edit/" +
                              gatepasses?.invoice?.invoiceId
                          )
                        }
                      >
                        View
                      </div>
                    ) : (
                      "-"
                    ),
                    action: (
                      <RoutingActionButton
                        onNavigate={
                          hasPermission("sal_gp_101")
                            ? () =>
                                navigate(
                                  "/grader/sales/gatepasses/edit/" +
                                    gatepasses?.gatePassId
                                )
                            : undefined
                        }
                        onDeleteClick={
                          hasPermission("sal_gp_102") && !gatepasses?.posted
                            ? () => {
                                handleDelete(gatepasses?.gatePassId);
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
  );
}
