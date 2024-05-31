import { useNavigate } from "react-router-dom";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import {
  useDeleteSalesOrderMutation,
  useLazyGetSaleOrdersQuery,
} from "redux/features/sales/Orders/saleOrdersApiSlice";
import { SaleOrdersTableData } from "redux/types/Orders/saleOrders";
import { globalVariables } from "helper/globalVariables";
import Filters from "shared/Components/Filters";
import { useGetOrderStatusQuery } from "redux/features/purchase/Order/OrderStatusApiSlice";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { useGetCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useGetAllBrandsQuery } from "redux/features/Settings/Productions/brandApiSlice";
import { OrderStatus } from "redux/types/common/orderStatus";
import { Client } from "redux/types/Clients/Clients/client";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { Brand } from "redux/types/Settings/Productions/brand";
import { CurrencyRequest } from "redux/types/Settings/Finance/currency";
import { getDateFromMillis, hasPermission } from "helper/utility";
export default function Orders() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);

  const [getOrders, result] = useLazyGetSaleOrdersQuery();
  const [deleteOrder] = useDeleteSalesOrderMutation();
  const { data: orderStatusList } = useGetOrderStatusQuery(null);
  const { data: customersList } = useGetAllClientsQuery(null);
  const { data: currencyList } = useGetCurrrencyQuery(null);
  const { data: invoiceTypeList } = useGetInvoiceTypesQuery(null);
  const { data: brandsList } = useGetAllBrandsQuery(null);
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const ordersList = result?.data?.payLoad;

  const handleDelete = (id: number) => {
    if (id) {
      deleteOrder(id);
    }
  };

  useEffect(() => {
    hasPermission("sal_so_103") && getOrders(queryParams);
  }, [queryParams, getOrders]);
  return (
    <div className="table-container">
      <Filters
        componentRef={ref}
        addRedirectPath={
          hasPermission("sal_so_100") ? "/grader/sales/orders/add" : ""
        }
        printAble={(ordersList && ordersList?.length > 0) ?? false}
        exportAble={(ordersList && ordersList?.length > 0) ?? false}
        filters={[
          {
            label: "Order Status",
            name: "status",
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
            label: "Customer",
            name: "customer",
            inputType: "multiselect",
            options: customersList
              ? customersList?.map((supplier: Client) => {
                  return {
                    text: supplier.user ? supplier.user?.fullName : "",
                    value: supplier.clientId ? supplier.clientId : 0,
                  };
                })
              : [],
          },
          {
            label: "Currency",
            name: "currency",
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
            label: "Invoice Type",
            name: "type",
            inputType: "multiselect",
            options: invoiceTypeList
              ? invoiceTypeList?.map((item: InvoiceType) => {
                  return {
                    text: item?.name ? item?.name : "",
                    value: item?.invoiceTypeId ? item?.invoiceTypeId : 0,
                  };
                })
              : [],
          },
          {
            label: "Brand",
            name: "brand",
            inputType: "multiselect",
            options: brandsList
              ? brandsList?.map((item: Brand) => {
                  return {
                    text: item?.name ? item?.name : "",
                    value: item?.brandId ? item?.brandId : 0,
                  };
                })
              : [],
          },

          {
            label: "Reference",
            name: "reference",
            inputType: "text",
          },
          {
            label: "Arrival From",
            name: "arrivalFrom",
            inputType: "date",
          },
          {
            label: "Arrival To",
            name: "arrivalTo",
            inputType: "date",
          },
          {
            label: "Finalized",
            name: "finalized",
            inputType: "boolean",
          },
          {
            label: "Running",
            name: "running",
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
      {hasPermission("sal_so_103") && (
        <DataTable
          ref={ref}
          tableTitle="Sales Orders"
          setOffset={(offset, limit) => {
            setQueryParams({
              ...queryParams,
              pageNumber: offset,
              pageSize: limit ? limit : globalVariables.ItemsPerPageLimit,
            });
          }}
          totalItems={
            result?.data?.numberOfItems ? result?.data?.numberOfItems : 0
          }
          fixLastColumn
          isLoading={result?.isFetching}
          columns={[
            { label: "Id", field: "id" },
            { label: "Date", field: "date" },
            { label: "Currency", field: "cur" },
            { label: "Customer", field: "customers" },
            { label: "Type", field: "type" },
            { label: "Brand", field: "brand" },
            { label: "Reference", field: "Reference" },
            { label: "ETA", field: "eta" },
            { label: "Status", field: "status" },
            { label: "Qty", field: "qty" },
            { label: "PS", field: "ps" },
            { label: "M.S.W", field: "msw" },
            { label: "T.M.S.W", field: "tmsw" },
            { label: "Pro. Priority", field: "pp" },
            { label: "Finalized", field: "f" },
            { label: "Running", field: "r" },
            { label: "Invoice", field: "inv" },
            { label: "Gatepass", field: "gp" },
            { label: "Action", field: "action" },
          ]}
          rows={
            ordersList && ordersList?.length > 0
              ? ordersList?.map((item: SaleOrdersTableData) => {
                  return {
                    id: item?.saleOrderId ? item?.saleOrderId : "-",
                    date: getDateFromMillis(item?.orderDate),
                    cur: item?.currency?.currency
                      ? item?.currency?.currency?.name
                      : "-",
                    customers: item?.customer?.user
                      ? item?.customer?.user?.fullName
                      : "-",
                    type: item?.invoiceType ? item?.invoiceType?.name : "-",
                    brand: item?.brand ? item?.brand?.name : "-",
                    Reference: item?.reference ? item?.reference : "-",
                    eta: getDateFromMillis(item?.eta),
                    status: item?.orderStatus ? item?.orderStatus?.name : "-",
                    qty: item?.quantity ? item?.quantity : 0,
                    ps: item?.ps ? item?.ps : "-",
                    msw: item?.maxShipmentWeight ? item?.maxShipmentWeight : 0,
                    tmsw: item?.totalWeight ? item?.totalWeight : 0,
                    pp: item?.proPriority ? item?.proPriority : "-",
                    f: item?.finalized ? "Yes" : "No",
                    r: item?.running ? "Yes" : "No",
                    inv: item?.invoiceId ? (
                      <div
                        onClick={() =>
                          navigate(
                            "/grader/sales/invoices/edit/" + item?.invoiceId
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
                    gp: item?.gatePassId ? (
                      <div
                        onClick={() =>
                          navigate(
                            "/grader/sales/gatepasses/edit/" + item?.gatePassId
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
                          hasPermission("sal_so_101")
                            ? () =>
                                navigate(
                                  "/grader/sales/orders/edit/" +
                                    item?.saleOrderId
                                )
                            : undefined
                        }
                        onDeleteClick={
                          hasPermission("sal_so_102") && !item?.gatePassId
                            ? () => {
                                handleDelete(item?.saleOrderId);
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
