import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import DataTable from "shared/Components/DataTable";
import InvoicesSideNav from "components/Purchase/InvoicesSideNav";
import { InvoicesTableData } from "redux/types/Invoices/Invoices";
import { globalVariables } from "helper/globalVariables";
import {
  useDeletePurchaseInvoiceMutation,
  useLazyGetPurchaseInvoicesQuery,
} from "redux/features/purchase/Invoices/InvoicesApiSlice";
import Filters from "shared/Components/Filters";
import { useGetAllAgentsQuery } from "redux/features/Clients/Agents/agentsApiSlice";
import { getDateFromMillis, hasPermission } from "helper/utility";
export default function CustomInvoices({
  systemInvoiceId,
}: {
  systemInvoiceId: number;
}) {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const [getInvoices, result] = useLazyGetPurchaseInvoicesQuery();
  const { data: AgentsData } = useGetAllAgentsQuery(null);
  const [deleteInvoice] = useDeletePurchaseInvoiceMutation();

  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
    startDate: new Date().toISOString().split("T")[0],
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
        systemInvoiceId,
      });
  }, [queryParams, getInvoices, systemInvoiceId]);

  return (
    <>
      <div className="d-lg-flex">
        <InvoicesSideNav type={systemInvoiceId} />

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
            addRedirectPath={hasPermission("pur_pi_100") ? "add" : ""}
            filters={[
              {
                label: "Agent",
                name: "agentIds",
                inputType: "multiselect",
                options: AgentsData
                  ? AgentsData?.map((agent) => {
                      return {
                        text: agent.user ? agent.user?.fullName : "",
                        value: agent.clientId ? agent.clientId : 0,
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
                label: "Container No.",
                name: "containerNo",
                inputType: "text",
              },
              {
                label: "Billed",
                name: "billed",
                inputType: "boolean",
              },
              {
                label: "Paid",
                name: "paid",
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
              fixLastColumn
              tableTitle={
                systemInvoiceId === 2
                  ? "Purchase Freight Invoices"
                  : systemInvoiceId === 3
                  ? "Purchase Clearing Invoices"
                  : systemInvoiceId === 4
                  ? "Purchase Delivery Order Invoices"
                  : ""
              }
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
                { label: "Container No", field: "container" },
                { label: "Place of Receipt", field: "Consignee" },
                { label: "Volume", field: "Volume" },
                { label: "Agent", field: "Agent" },
                { label: "Invoice No.", field: "invoice" },
                { label: "Currency", field: "currency" },
                { label: "Charges", field: "charges" },
                { label: "Paid", field: "paid" },
                { label: "Bill", field: "billToSupplier" },
                { label: "Action", field: "action" },
              ]}
              rows={
                result?.data?.payLoad && result?.data?.payLoad?.length > 0
                  ? result?.data?.payLoad?.map((item: InvoicesTableData) => {
                      return {
                        id: item?.invoiceId ? item?.invoiceId : "-",
                        invoiceDate: getDateFromMillis(item?.invoiceDate),
                        container: item?.containerNo ? item?.containerNo : "-",
                        Consignee: item?.placeOfReceipt
                          ? item?.placeOfReceipt
                          : "-",
                        Volume: item?.volume ? item?.volume : "-",
                        Agent: item?.client
                          ? item?.client?.user?.fullName
                          : "-",
                        invoice: item?.invoiceNo ? item?.invoiceNo : "-",
                        currency: item?.businessCurrency?.currency
                          ? item?.businessCurrency?.currency?.name
                          : "-",
                        charges: item?.chargeTypes?.length
                          ? item.chargeTypes.reduce((sum, res) => {
                              return sum + (+res.amount || 0);
                            }, 0)
                          : "-",
                        paid: item?.paid ? "Yes" : "No",
                        billToSupplier: item?.bill ? "Yes" : "No",
                        action: (
                          <RoutingActionButton
                            onNavigate={
                              hasPermission("pur_pi_101")
                                ? () => navigate("edit/" + item?.invoiceId)
                                : undefined
                            }
                            onDeleteClick={
                              hasPermission("pur_pi_102")
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
