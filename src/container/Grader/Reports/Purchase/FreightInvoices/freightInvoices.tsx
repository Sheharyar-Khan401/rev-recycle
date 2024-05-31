import PurchaseReportsSideNav from "components/Reports/PurchaseReportsSidenav";
import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import { useLazyGetFreightInvoicesReportsQuery } from "redux/features/purchase/Invoices/InvoicesApiSlice";
import { FreighInvoicesReports } from "redux/types/Invoices/Invoices";
import { getDateFromMillis, roundValue } from "helper/utility";
import {
  useGetAllAgentsSupplierQuery,
  useGetAllSupplierQuery,
} from "redux/features/Clients/Suppliers/suppliersApiSlice";
import { useGetPortsQuery } from "redux/features/Settings/purchase/portApiSlice";
import { useGetLocationQuery } from "redux/features/Settings/purchase/locationApiSlice";
export default function FreightInvoices() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [triggerFreightInvoicesReports, getFreightInvoicesReports] =
    useLazyGetFreightInvoicesReportsQuery();
  const { data: supplierData } = useGetAllSupplierQuery(null);
  const { data: agentsData } = useGetAllAgentsSupplierQuery(null);
  const { data: portsData } = useGetPortsQuery(null);
  const { data: locationsData } = useGetLocationQuery(null);
  const [queryParams, setQueryParams] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0]
  });

  useEffect(() => {
    triggerFreightInvoicesReports(queryParams);
  }, [queryParams]);

  const rows = getFreightInvoicesReports?.data
    ? getFreightInvoicesReports?.data?.payLoad?.map(
        (item: FreighInvoicesReports) => {
          return {
            invoiceId: item?.invoiceId ? item?.invoiceId : 0,
            supplier: item?.supplierName ? item?.supplierName : "-",
            date: getDateFromMillis(item?.date),
            volume: item?.volume ? item?.volume : "-",
            reference: item?.reference ? item?.reference : "-",
            container: item?.container ? item?.container : "-",
            invoiceNo: item?.invoiceNo ? item?.invoiceNo : "-",
            origin: item?.origin ? item?.origin : "-",
            desinantion: item?.destination ? item?.destination : "-",
            agent: item?.agentName ? item?.agentName : "-",
            dischargePort: item?.dischargePort ? item?.dischargePort : "-",
            loadingPort: item?.loadingPort ? item?.loadingPort : "-",
            arrivalDate: getDateFromMillis(item?.arrivalDate),
            arrivalDays: item?.arrivalDays ? item?.arrivalDays : "-",
            bill: item?.bill ? "Yes" : "No",
            billAgent: "-",
            billDate: getDateFromMillis(item?.billDate),
            billAmountDiff: item?.billAmountDifference
              ? roundValue(item?.billAmountDifference)
              : 0,
            currency: item?.currencyName ? item?.currencyName : "-",
            billAmount: item?.billAmount ? roundValue(item?.billAmount) : 0,
            amount: item?.amount ? roundValue(item?.amount) : 0,
            quantity: item?.quantity ? item?.quantity : 0,
            weightKgs: item?.weightKg ? roundValue(item?.weightKg) : 0,
            weightLbs: item?.weightLbs ? roundValue(item?.weightLbs) : 0,
          };
        }
      )
    : [];
  return (
    <>
      <div className="d-lg-flex">
        <div>
          <PurchaseReportsSideNav type={11} />
        </div>
        <div className="table-container">
          <Filters
            componentRef={ref}
            printAble={rows.length > 0}
            exportAble={rows.length > 0}
            filters={[
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
                label: "Bill Agent",
                name: "billAgentId",
                inputType: "multiselect",
                options: agentsData
                  ? agentsData?.map((supplier) => {
                      return {
                        text: supplier?.user ? supplier?.user?.fullName : "",
                        value: supplier?.clientId ? supplier?.clientId : 0,
                      };
                    })
                  : [],
              },

              {
                label: "Loading Port",
                name: "loadingPortId",
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
                name: "dischargePortId",
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
                label: "Destination",
                name: "destinationLocationIds",
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
                label: "Bill Start Date",
                name: "billStartDate",
                inputType: "date",
              },
              {
                label: "Bill End Date",
                name: "billEndDate",
                inputType: "date",
              },

              {
                label: "Bill",
                name: "bill",
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
                  startDate: queryParams.startDate,
                  endDate: queryParams.endDate
                });
              } else setQueryParams({ ...queryParams, ...query });
            }}
          />
          <DataTable
            ref={ref}
            tableTitle="Freight Invoices Report"
            isLoading={getFreightInvoicesReports.isFetching}
            columns={[
              { label: "Invoice Id", field: "invoiceId" },
              { label: "Supplier", field: "supplier" },
              { label: "Date", field: "date" },
              { label: "volume", field: "volume" },
              { label: "Reference", field: "reference" },
              { label: "Container", field: "container" },
              { label: "Invoice No", field: "invoiceNo" },
              { label: "Origin", field: "origin" },
              { label: "Destinantion", field: "desinantion" },
              { label: "Agent", field: "agent" },
              { label: "Discharge Port", field: "dischargePort" },
              { label: "Loading Port", field: "loadingPort" },
              { label: "Arrival Date", field: "arrivalDate" },
              { label: "Arrival Days", field: "arrivalDays" },
              { label: "Bill", field: "bill" },
              { label: "Bill Agent", field: "billAgent" },
              { label: "Bill Date", field: "billDate" },
              { label: "Bill Amount", field: "billAmount", showSum: true },
              {
                label: "Bill Amount Difference",
                field: "billAmountDiff",
                showSum: true,
              },
              { label: "Currency", field: "currency" },
              { label: "Amount", field: "amount", showSum: true },
              { label: "Quantity", field: "quantity", showSum: true },
              { label: "Weight(Kgs)", field: "weightKgs", showSum: true },
              { label: "Weight(Lbs)", field: "weightLbs", showSum: true },
            ]}
            rows={rows}
          />
        </div>
      </div>
    </>
  );
}
