import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import DataTable from "shared/Components/DataTable";
import Filters from "shared/Components/Filters";
import InvoicesSideNav from "components/Purchase/InvoicesSideNav";
import { globalVariables } from "helper/globalVariables";
import { getDateFromMillis, hasPermission } from "helper/utility";
import {
  useGetInvoiceTypesQuery,
  useLazyGetInvoicesQuery,
} from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { InvoicesTableData } from "redux/types/Invoices/Invoices";
import { useDeletePurchaseInvoiceMutation } from "redux/features/purchase/Invoices/InvoicesApiSlice";
import { useGetOrderStatusQuery } from "redux/features/purchase/Order/OrderStatusApiSlice";
import { useGetAllSupplierQuery } from "redux/features/Clients/Suppliers/suppliersApiSlice";
import { useGetBusinessCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
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
  const { data: currencyData } = useGetBusinessCurrrencyQuery(null);
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
    hasPermission("pur_pi_103") &&
      getInvoices({
        params: queryParams,
        systemInvoiceId: 1,
      });
  }, [queryParams, getInvoices]);

  return (
    <>
      <div className="d-lg-flex">
        <InvoicesSideNav type={0} />

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
                        text: currency?.currency?.name
                          ? currency?.currency?.name
                          : "",
                        value: currency?.businesscurrencyId
                          ? currency?.businesscurrencyId
                          : 0,
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
                label: "Container No.",
                name: "containerNo",
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
          {hasPermission("pur_pi_103") && (
            <DataTable
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
                { label: "Date", field: "invoiceDate" },
                { label: "Supplier", field: "supplier" },
                { label: "Reference", field: "referenceNumber" },
                { label: "Container No.", field: "container" },
                { label: "Terms", field: "paymentTerm" },
                { label: "Invoice No.", field: "invoice" },
                { label: "Curr", field: "businessCurrency" },
                { label: "Ex. Rate", field: "exRate" },
                { label: "Type", field: "invoiceType" },
                // { label: "Grade", field: "grade" },
                // { label: "CT", field: "billToSupplier" },
                { label: "Status", field: "orderStatus" },
                { label: "Posted", field: "posted" },
                // { label: "KGs", field: "voucherId" },
                // { label: "LBs", field: "voucherId" },
                { label: "Order", field: "order" },
                { label: "Gate Pass", field: "gp" },
                { label: "Action", field: "action" },
              ]}
              rows={
                result?.data?.payLoad && result?.data?.payLoad?.length > 0
                  ? result?.data?.payLoad?.map((item: InvoicesTableData) => {
                      return {
                        id: item?.invoiceId ? item?.invoiceId : "-",
                        invoiceDate: getDateFromMillis(item?.invoiceDate),
                        supplier: item.client
                          ? item.client.user?.fullName
                          : "-",
                        referenceNumber: item.referenceNumber
                          ? item.referenceNumber
                          : "-",
                        container: item?.containerNo ? item?.containerNo : "-",
                        paymentTerm: item?.paymentTerm
                          ? item?.paymentTerm?.paymentTermDescription
                          : "-",
                        exRate: item?.exRate ? item?.exRate : "-",
                        invoiceType: item?.invoiceType
                          ? item?.invoiceType?.name
                          : "-",
                        // grade: item?.grade ? item?.grade?.name : "-",
                        Agent: item?.client
                          ? item?.client?.user?.fullName
                          : "-",
                        invoice: item?.invoiceNo ? item?.invoiceNo : "-",
                        businessCurrency: item?.businessCurrency?.currency
                          ? item?.businessCurrency?.currency?.name
                          : "-",
                        orderStatus: item?.orderStatus
                          ? item?.orderStatus?.name
                          : "-",
                        posted: item?.posted ? "Yes" : "No",
                        voucherId: "-",
                        order: item?.purchaseOrderId ? (
                          <div
                            className="text-primary"
                            role="button"
                            onClick={() =>
                              navigate(
                                "/grader/purchase/orders/edit/" +
                                  item?.purchaseOrderId
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
                                "/grader/purchase/gatepasses/edit/" +
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
                              hasPermission("pur_pi_101")
                                ? () =>
                                    navigate(
                                      "/grader/purchase/invoices/edit/" +
                                        item?.invoiceId
                                    )
                                : undefined
                            }
                            onDeleteClick={
                              hasPermission("pur_pi_102") && !item?.posted
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
