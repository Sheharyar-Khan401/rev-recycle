import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import DataTable from "shared/Components/DataTable";
import {
  useDeletePurchaseOrderMutation,
  useLazyGetPurchaseOrdersQuery,
} from "redux/features/purchase/Order/OrderApiSlice";
import { OrderTableData } from "redux/types/Orders/orders";
import { globalVariables } from "helper/globalVariables";
import Filters from "shared/Components/Filters";
import { useGetAllSupplierQuery } from "redux/features/Clients/Suppliers/suppliersApiSlice";
import { useGetOrderStatusQuery } from "redux/features/purchase/Order/OrderStatusApiSlice";
import { useGetBusinessCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { OrderStatus } from "redux/types/common/orderStatus";
import { Client } from "redux/types/Clients/Clients/client";
import { getDateFromMillis, hasPermission } from "helper/utility";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { MDBIcon } from "mdb-react-ui-kit";

export default function Orders() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const [getOrders, result] = useLazyGetPurchaseOrdersQuery();
  const [deleteOrder] = useDeletePurchaseOrderMutation();
  const { data: suppliersList } = useGetAllSupplierQuery(null);
  const { data: orderStatusList } = useGetOrderStatusQuery(null);
  const { data: currencyList } = useGetBusinessCurrrencyQuery(null);
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
      deleteOrder(id);
    }
  };

  useEffect(() => {
    hasPermission("pur_po_103") && getOrders(queryParams);
  }, [queryParams, getOrders]);

  return (
    <div className="table-container">
      <Filters
        componentRef={ref}
        printAble={
          (result?.data?.payLoad && result?.data?.payLoad?.length > 0) ?? false
        }
        exportAble={
          (result?.data?.payLoad && result?.data?.payLoad?.length > 0) ?? false
        }
        addRedirectPath={
          hasPermission("pur_po_100") ? "/grader/purchase/orders/add" : ""
        }
        filters={[
          {
            label: "Suppliers",
            name: "supplierIds",
            inputType: "multiselect",
            options: suppliersList
              ? suppliersList?.map((supplier: Client) => {
                  return {
                    text: supplier.user ? supplier.user?.fullName : "",
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
              ? currencyList?.map((item) => {
                  return {
                    text: item?.currency?.name ? item?.currency.name : "",
                    value: item?.currency?.currencyId
                      ? item?.currency?.currencyId
                      : 0,
                  };
                })
              : [],
          },
          {
            label: "Invoice Type",
            name: "InvoiceTypeId",
            inputType: "multiselect",
            options: invoiceTypeList
              ? invoiceTypeList?.map((item) => {
                  return {
                    text: item?.name ? item?.name : "",
                    value: item?.invoiceTypeId ? item?.invoiceTypeId : 0,
                  };
                })
              : [],
          },

          {
            label: "Invoice No.",
            name: "invoiceNo",
            inputType: "text",
          },
          {
            label: "Reference",
            name: "referenceNumber",
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
      {hasPermission("pur_po_103") && (
        <DataTable
          ref={ref}
          tableTitle="Purchase Orders"
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
          fixLastColumn
          columns={[
            { label: "Id", field: "id" },
            { label: "Date", field: "date" },
            { label: "Supplier", field: "supplier" },
            { label: "Reference", field: "reference" },
            { label: "Description", field: "description" },
            { label: "Invoice No.", field: "invoice" },
            { label: "Currency", field: "currency" },
            { label: "Type", field: "type" },
            { label: "Status", field: "status" },
            { label: "Gate Pass", field: "gp" },
            { label: "Action", field: "action" },
          ]}
          rows={
            result?.data?.payLoad?.length && result?.data?.payLoad?.length > 0
              ? result?.data?.payLoad?.map((item: OrderTableData) => {
                  return {
                    id: item?.purchaseOrderId ? item?.purchaseOrderId : "-",
                    date: getDateFromMillis(item?.orderDate),
                    supplier: item?.client ? item?.client?.user?.fullName : "-",
                    reference: item?.referenceNumber
                      ? item?.referenceNumber
                      : "-",
                    description: item?.description ? item?.description : "-",
                    invoice: item?.invoiceNumber ? item?.invoiceNumber : "-",
                    currency: item?.currency?.currency?.name
                      ? item?.currency?.currency?.name
                      : "-",
                    type: item?.invoiceType?.name
                      ? item?.invoiceType?.name
                      : "-",
                    status: item?.orderStatus?.name
                      ? item?.orderStatus?.name
                      : "-",
                    gp: item?.gatepassId ? (
                      <div
                        onClick={() =>
                          navigate(
                            "/grader/purchase/gatepasses/edit/" +
                              item?.gatepassId
                          )
                        }
                        className="text-primary"
                        role="button"
                      >
                        View
                      </div>
                    ) : (
                      "-"
                    ),
                    action: (
                      <RoutingActionButton
                        onNavigate={
                          hasPermission("pur_po_101")
                            ? () =>
                                navigate(
                                  "/grader/purchase/orders/edit/" +
                                    item?.purchaseOrderId
                                )
                            : undefined
                        }
                        onDeleteClick={
                          hasPermission("pur_po_102") &&
                          item?.orderStatus?.name !== "Converted"
                            ? () => {
                                handleDelete(item?.purchaseOrderId);
                              }
                            : undefined
                        }
                        moreActions={[
                          {
                            title: item?.invoiceId
                              ? "View Invoice"
                              : "Convert To Invoice",
                            onClick: () => {
                              item?.invoiceId
                                ? navigate(
                                    "/grader/purchase/invoices/edit/" +
                                      item?.invoiceId
                                  )
                                : navigate(`/grader/purchase/invoices/add`, {
                                    state: {
                                      orderId: item.purchaseOrderId,
                                      orderDate: getDateFromMillis(
                                        item.orderDate
                                      ),
                                      invoiceNumber: item.invoiceNumber,
                                      clientId: item.client?.clientId,
                                      invoiceTypeId:
                                        item?.invoiceType?.invoiceTypeId,
                                      businessCurrencyId:
                                        item?.currency?.businesscurrencyId,
                                      referenceNumber: item?.referenceNumber,
                                    },
                                  });
                            },
                            icon: (
                              <MDBIcon
                                fas
                                icon="file-invoice-dollar"
                                className="me-2"
                              />
                            ),
                          },
                        ]}
                      />
                    ),
                  };
                })
              : []
          }
        ></DataTable>
      )}
    </div>
  );
}
