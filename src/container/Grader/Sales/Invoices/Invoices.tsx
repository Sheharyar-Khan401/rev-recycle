import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import DataTable from "shared/Components/DataTable";
import { InvoicesTableData } from "redux/types/Invoices/Invoices";
import { globalVariables } from "helper/globalVariables";
import { useDeletePurchaseInvoiceMutation } from "redux/features/purchase/Invoices/InvoicesApiSlice";
import Filters from "shared/Components/Filters";
import {
  useGetInvoiceTypesQuery,
  useLazyGetInvoicesQuery,
} from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import SalesInvoicesSideNav from "components/Sales/SalesInvoicesSidenav";
import { getDateFromMillis, hasPermission, roundValue } from "helper/utility";
import { useGetOrderStatusQuery } from "redux/features/purchase/Order/OrderStatusApiSlice";
import { useGetAllSupplierQuery } from "redux/features/Clients/Suppliers/suppliersApiSlice";
import { useGetCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { useGetPortsQuery } from "redux/features/Settings/purchase/portApiSlice";
import { useGetLocationQuery } from "redux/features/Settings/purchase/locationApiSlice";
import { useGetPaymentTermsQuery } from "redux/features/common/paymentTermApiSlice";
import { useGetGradesQuery } from "redux/features/common/gradeApiSlice";
export default function Invoices() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);

  const [getInvoices, result] = useLazyGetInvoicesQuery();
  const [deleteInvoice] = useDeletePurchaseInvoiceMutation();
  const { data: orderStatusData } = useGetOrderStatusQuery(null);
  const { data: supplierData } = useGetAllSupplierQuery(null);
  const { data: currencyData } = useGetCurrrencyQuery(null);
  const { data: invoiceTypeData } = useGetInvoiceTypesQuery(null);
  const { data: portsData } = useGetPortsQuery(null);
  const { data: locationsData } = useGetLocationQuery(null);
  const { data: paymentTermData } = useGetPaymentTermsQuery(null);
  const { data: gradeData } = useGetGradesQuery(null);

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
      deleteInvoice(id);
    }
  };

  useEffect(() => {
    hasPermission("sal_si_103") &&
      getInvoices({
        params: queryParams,
        systemInvoiceId: 5,
      });
  }, [queryParams, getInvoices]);

  return (
    <>
      <div className="d-lg-flex">
        <SalesInvoicesSideNav type={5} />

        <div className="table-container">
          <Filters
            componentRef={ref}
            printAble={
              (result?.data?.payLoad && result?.data?.payLoad?.length > 0) ??
              false
            }
            exportAble={
              (result?.data?.payLoad && result?.data?.payLoad?.length > 0) ??
              false
            }
            filters={[
              {
                label: "Order Status",
                name: "orderStatusId",
                inputType: "multiselect",
                options: orderStatusData
                  ? orderStatusData?.map((status) => {
                      return {
                        text: status?.name ? status?.name : "",
                        value: status?.orderStatusId
                          ? status?.orderStatusId
                          : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Supplier",
                name: "supplierIds",
                inputType: "multiselect",
                options: supplierData
                  ? supplierData?.map((supplier) => {
                      return {
                        text: supplier?.user ? supplier?.user?.fullName : "",
                        value: supplier?.clientId ? supplier?.clientId : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Currency",
                name: "currencyIds",
                inputType: "multiselect",
                options: currencyData
                  ? currencyData?.map((currency) => {
                      return {
                        text: currency?.name ? currency?.name : "",
                        value: currency?.currencyId ? currency?.currencyId : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Invoice Type",
                name: "invoiceTypeIds",
                inputType: "multiselect",
                options: invoiceTypeData
                  ? invoiceTypeData?.map((invoice) => {
                      return {
                        text: invoice?.name ? invoice?.name : "",
                        value: invoice?.invoiceTypeId
                          ? invoice?.invoiceTypeId
                          : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Loading Port",
                name: "loadingPortIds",
                inputType: "multiselect",
                options: portsData
                  ? portsData?.map((port) => {
                      return {
                        text: port?.name ? port?.name : "",
                        value: port?.portId ? port?.portId : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Discahrge Port",
                name: "dischargePortIds",
                inputType: "multiselect",
                options: portsData
                  ? portsData?.map((port) => {
                      return {
                        text: port?.name ? port?.name : "",
                        value: port?.portId ? port?.portId : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Origin Location",
                name: "originLocationIds",
                inputType: "multiselect",
                options: locationsData
                  ? locationsData?.map((origin) => {
                      return {
                        text: origin?.name ? origin?.name : "",
                        value: origin?.locationId ? origin?.locationId : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Payment Term",
                name: "paymentTermIds",
                inputType: "multiselect",
                options: paymentTermData
                  ? paymentTermData?.map((payment) => {
                      return {
                        text: payment?.paymentTermDescription
                          ? payment?.paymentTermDescription
                          : "",
                        value: payment?.paymentTermId
                          ? payment?.paymentTermId
                          : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Destination",
                name: "destinationIds",
                inputType: "multiselect",
                options: locationsData
                  ? locationsData?.map((origin) => {
                      return {
                        text: origin?.name ? origin?.name : "",
                        value: origin?.locationId ? origin?.locationId : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Grade",
                name: "grades",
                inputType: "multiselect",
                options: gradeData
                  ? gradeData?.map((grade) => {
                      return {
                        text: grade?.name ? grade?.name : "",
                        value: grade?.gradeId ? grade?.gradeId : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Reference No.",
                name: "referenceNumber",
                inputType: "text",
              },
              {
                label: "Posted",
                name: "posted",
                inputType: "boolean",
              },
              {
                label: "Cross Trade",
                name: "crossTrade",
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
          {hasPermission("sal_si_103") && (
            <DataTable
              fixLastColumn
              tableTitle="Sales Invoices"
              ref={ref}
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
                { label: "Id", field: "id" },
                { label: "Date", field: "invoiceDate" },
                { label: "Reference", field: "referenceNumber" },
                { label: "Invoice No.", field: "invoice" },
                { label: "Terms", field: "paymentTerm" },
                { label: "Curr", field: "businessCurrency" },
                { label: "Ex. Rate", field: "exRate" },
                { label: "Customer", field: "supplier" },
                { label: "Container No.", field: "container" },
                { label: "Origin", field: "origin" },
                { label: "Destination", field: "destination" },
                { label: "Port Discharge", field: "discharge" },
                { label: "Port Loading", field: "loading" },
                { label: "Posted", field: "posted" },
                { label: "Total Qty", field: "totalQuantity" },
                { label: "Net Amount", field: "netAmount" },
                { label: "Purchase Amount", field: "purchaseAmount" },
                { label: "Production Amount", field: "productionAmount" },
                { label: "Order", field: "order" },
                { label: "Gatepass", field: "gp" },
                { label: "Action", field: "action" },
              ]}
              rows={
                result?.data?.payLoad && result?.data?.payLoad?.length > 0
                  ? result?.data?.payLoad?.map((item: InvoicesTableData) => {
                      return {
                        id: item?.invoiceId ? item?.invoiceId : 0,
                        invoiceDate: getDateFromMillis(item?.invoiceDate),
                        referenceNumber: item.referenceNumber
                          ? item.referenceNumber
                          : "-",
                        invoice: item?.invoiceNo ? item?.invoiceNo : "-",
                        paymentTerm: item?.paymentTerm?.paymentTermDescription
                          ? item?.paymentTerm?.paymentTermDescription
                          : "-",
                        businessCurrency: item?.businessCurrency?.currency
                          ? item?.businessCurrency?.currency?.name
                          : "-",
                        exRate: item?.exRate ? item?.exRate : "-",
                        supplier: item.client
                          ? item.client.user?.fullName
                          : "-",
                        container: item?.containerNo ? item?.containerNo : "-",
                        origin: item?.origin ? item?.origin?.name : "-",
                        destination: item?.destination
                          ? item?.destination?.name
                          : "-",
                        discharge: item?.discharge
                          ? item?.discharge?.name
                          : "-",
                        loading: item?.loading ? item?.loading?.name : "-",
                        posted: item?.posted ? "Yes" : "No",
                        totalQuantity: item?.totalQuantity
                          ? roundValue(item?.totalQuantity)
                          : 0,
                        netAmount: item?.netAmount
                          ? roundValue(item?.netAmount)
                          : 0,
                        purchaseAmount: item?.purchaseAmount
                          ? roundValue(item?.purchaseAmount)
                          : 0,
                        productionAmount: item?.productionAmount
                          ? roundValue(item?.productionAmount)
                          : 0,
                        order: item?.saleOrderId ? (
                          <div
                            className="text-primary"
                            role="button"
                            onClick={() =>
                              navigate(
                                "/grader/sales/orders/edit/" + item?.saleOrderId
                              )
                            }
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
                                "/grader/sales/gatepasses/edit/" +
                                  item?.gatePassId
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
                              hasPermission("sal_si_101")
                                ? () =>
                                    navigate(
                                      "/grader/sales/invoices/edit/" +
                                        item?.invoiceId
                                    )
                                : undefined
                            }
                            onDeleteClick={
                              hasPermission("sal_si_102") && !item?.posted
                                ? () => {
                                    handleDelete(item?.invoiceId);
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
    </>
  );
}
