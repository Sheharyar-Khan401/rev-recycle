import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import DataTable from "shared/Components/DataTable";
import SalesInvoicesSideNav from "components/Sales/SalesInvoicesSidenav";
import {
  useDeleteSaleInvoiceMutation,
  useLazyGetSaleInvoicesQuery,
} from "redux/features/sales/saleInvoicesApiSlice";
import { globalVariables } from "helper/globalVariables";
import { InvoicesTableData } from "redux/types/Invoices/Invoices";
import Filters from "shared/Components/Filters";
import { useGetAllAgentsQuery } from "redux/features/Clients/Agents/agentsApiSlice";
import { Client } from "redux/types/Clients/Clients/client";
import { getDateFromMillis, hasPermission } from "helper/utility";
export default function CustomInvoices({
  systemInvoiceId,
}: {
  systemInvoiceId: number;
}) {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);

  const [triggerSaleInvoices, geSaleInvoices] = useLazyGetSaleInvoicesQuery();
  const { data: agentsList } = useGetAllAgentsQuery(null);
  const [invoicesList, setInvoicesList] = useState<InvoicesTableData[]>([]);
  const [deleteInvoice] = useDeleteSaleInvoiceMutation();

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
    if (geSaleInvoices?.data) {
      setInvoicesList(geSaleInvoices?.data?.payLoad);
    }
  }, [geSaleInvoices?.data]);

  useEffect(() => {
    hasPermission("sal_si_103") &&
      triggerSaleInvoices({ params: queryParams, systemInvoiceId });
  }, [queryParams, triggerSaleInvoices, systemInvoiceId]);

  useEffect(() => {
    setQueryParams({
      pageNumber: 0,
      pageSize: globalVariables?.ItemsPerPageLimit,
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2)
        .toISOString()
        .split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    });
  }, [systemInvoiceId]);

  return (
    <>
      <div className="d-lg-flex">
        <SalesInvoicesSideNav type={systemInvoiceId} />
        <div className="table-container">
          <Filters
            key={systemInvoiceId}
            componentRef={ref}
            printAble={invoicesList?.length > 0}
            exportAble={invoicesList?.length > 0}
            addRedirectPath={hasPermission("sal_si_100") ? "add" : ""}
            filters={[
              {
                label: "Agents",
                name: "agentIds",
                inputType: "multiselect",
                options: agentsList
                  ? agentsList?.map((agent: Client) => {
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
                label: "Paid",
                name: "paid",
                inputType: "boolean",
              },
              {
                label: "Billed",
                name: "billed",
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
              ref={ref}
              tableTitle={
                systemInvoiceId === 7
                  ? "Sales Freight Invoices"
                  : systemInvoiceId === 6
                  ? "Sales Clearing Invoices"
                  : systemInvoiceId === 8
                  ? "Sales CNC/COC Invoices"
                  : systemInvoiceId === 9
                  ? "Sales Other Invoices"
                  : ""
              }
              isLoading={geSaleInvoices.isLoading}
              totalItems={
                geSaleInvoices?.data?.numberOfItems
                  ? geSaleInvoices?.data?.numberOfItems
                  : 0
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
                { label: "Container No.", field: "container" },
                { label: "Consignee", field: "Consignee" },
                { label: "Volume", field: "Volume" },
                { label: "Agent", field: "Agent" },
                { label: "Invoice No.", field: "invoice" },
                { label: "Currency", field: "currency" },
                { label: "Total Charges", field: "charges" },
                { label: "Paid", field: "paid" },
                { label: "Bill", field: "billToSupplier" },
                { label: "Bill Voucher Id", field: "voucherId" },
                { label: "Action", field: "action" },
              ]}
              rows={
                invoicesList?.length > 0
                  ? invoicesList?.map((item: InvoicesTableData) => {
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
                        invoice: item.invoiceNo ? item.invoiceNo : "-",
                        currency: item?.businessCurrency?.currency?.name
                          ? item?.businessCurrency?.currency?.name
                          : "-",
                        charges: item?.chargeTypes?.length
                          ? item.chargeTypes.reduce((sum, res) => {
                              return sum + (+res.amount || 0);
                            }, 0)
                          : "-",
                        paid: item?.paid ? "Yes" : "No",
                        billToSupplier: item?.bill ? "Yes" : "No",
                        voucherId: item?.billVoucherId
                          ? item?.billVoucherId
                          : 0,
                        action: (
                          <RoutingActionButton
                            onNavigate={
                              hasPermission("sal_si_101")
                                ? () => navigate("edit/" + item?.invoiceId)
                                : undefined
                            }
                            onDeleteClick={
                              hasPermission("sal_si_102")
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
