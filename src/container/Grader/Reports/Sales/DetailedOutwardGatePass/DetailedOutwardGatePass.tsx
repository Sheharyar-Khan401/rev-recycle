import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import SalesReportsSideNav from "components/Reports/SalesReportsSidenav";
import { useLazyGetDetailedOutwardGatePassReportsQuery } from "redux/features/sales/gatePassesApiSlice";
import { DetailedOutwardGatePassReport } from "redux/types/Sales/gatepasses";
import { getDateFromMillis, roundValue } from "helper/utility";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";

export default function DetailedOutwardGatePass() {
  const ref = useRef<HTMLInputElement | null>(null);
  const { data: supplierData } = useGetAllClientsQuery(null);
  const { data: invoiceTypeData } = useGetInvoiceTypesQuery(null);
  const [
    triggerDetailedOutwardGatePassReports,
    getDetailedOutwardGatePassReports,
  ] = useLazyGetDetailedOutwardGatePassReportsQuery();

  const [queryParams, setQueryParams] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    triggerDetailedOutwardGatePassReports(queryParams);
  }, [queryParams]);

  const rows = getDetailedOutwardGatePassReports.data
    ? getDetailedOutwardGatePassReports?.data?.payLoad?.map(
        (item: DetailedOutwardGatePassReport) => {
          return {
            referenceNo: item?.referenceNumber ? item?.referenceNumber : "-",
            gpDate: getDateFromMillis(item?.gpDate),
            invoiceDate: getDateFromMillis(item?.invoiceDate),
            invoiceNo: item?.invoiceNo ? item?.invoiceNo : "-",
            container: item?.containerNo ? item?.containerNo : "-",
            customer: item?.customer ? item?.customer : "-",
            type: item?.invoiceType ? item?.invoiceType : "-",
            currency: item?.currency ? item?.currency : "-",
            exRate: item?.exRate ? item?.exRate : 0,
            fob: item?.fob ? (
              <>
                {item?.currencySign}&nbsp;{roundValue(item?.fob)}
              </>
            ) : (
              "-"
            ),
            dFob: item?.fobDollar ? roundValue(item?.fobDollar) : 0,
            amount: item?.amount ? roundValue(item?.amount) : 0,
            taxAmount: item?.taxAmount ? roundValue(item?.taxAmount) : 0,
            discAmount: item?.discAmount ? roundValue(item?.discAmount) : 0,
            freightCost: item?.freightCost ? roundValue(item?.freightCost) : 0,
            clearingCost: item?.clearingCost
              ? roundValue(item?.clearingCost)
              : 0,
            cnocCost: item?.cnocCost ? roundValue(item?.cnocCost) : 0,
            otherCost: item?.otherCost ? roundValue(item?.otherCost) : 0,
            adjPofit: item?.adjProfit ? roundValue(item?.adjProfit) : 0,
            weightKgs: item?.weightKgs ? roundValue(item?.weightKgs) : 0,
            WeightLbs: item?.weightLbs ? roundValue(item?.weightLbs) : 0,
            kantaWeight: item?.kantaWeight ? roundValue(item?.kantaWeight) : 0,
            units: item?.units ? roundValue(item?.units) : 0,
            weightInDiff: item?.weightDiff ? roundValue(item?.weightDiff) : 0,
            cogs: "-",
            cogsKgs: "-",
            cogsLbs: "-",
            invoiceVoucherId: item?.invVoucherId ? item?.invVoucherId : 0,
          };
        }
      )
    : [];

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <SalesReportsSideNav type={1} />
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
                  label: "Invoice Type",
                  name: "invoiceTypeIds",
                  inputType: "multiselect",
                  options: invoiceTypeData
                    ? invoiceTypeData?.map((invoiceType) => {
                        return {
                          text: invoiceType?.name ? invoiceType?.name : "",
                          value: invoiceType?.invoiceTypeId
                            ? invoiceType?.invoiceTypeId
                            : 0,
                        };
                      })
                    : [],
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
                    endDate: queryParams.endDate,
                  });
                } else setQueryParams({ ...queryParams, ...query });
              }}
            />
            <DataTable
              ref={ref}
              isLoading={getDetailedOutwardGatePassReports.isFetching}
              tableTitle="Sales Detailed Outward Gate Pass"
              columns={[
                { label: "Reference No", field: "referenceNo" },
                { label: "Gate Pass Date", field: "gpDate" },
                { label: "Invoice Date", field: "invoiceDate" },
                { label: "InvoiceNo", field: "invoiceNo" },
                { label: "Container", field: "container" },
                { label: "Customer", field: "customer" },
                { label: "Type", field: "type" },
                { label: "Currency", field: "currency" },
                { label: "Exchange Rate", field: "exRate" },
                { label: "FOB", field: "fob" },
                { label: "$FOB", field: "dFob" },
                { label: "$Amount", field: "amount", showSum: true },
                { label: "$Tax Amount", field: "taxAmount", showSum: true },
                {
                  label: "$Discount Amount",
                  field: "discAmount",
                  showSum: true,
                },
                { label: "$Freight Cost", field: "freightCost", showSum: true },
                {
                  label: "$Clearing Cost",
                  field: "clearingCost",
                  showSum: true,
                },
                { label: "$CNOC Cost", field: "cnocCost", showSum: true },
                { label: "$Other Cost", field: "otherCost", showSum: true },
                { label: "$Adj. Profit", field: "adjPofit", showSum: true },
                { label: "Units", field: "units", showSum: true },
                { label: "Weight(Kgs)", field: "weightKgs", showSum: true },
                { label: "Weight(Lbs)", field: "WeightLbs", showSum: true },
                { label: "Kanta Weight", field: "kantaWeight", showSum: true },
                { label: "WeightInDiff", field: "weightInDiff", showSum: true },
                { label: "COGS", field: "cogs" },
                { label: "COGS/KGS", field: "cogsKgs" },
                { label: "COGS/LBS", field: "cogsLbs" },
                { label: "Invoice Voucher Id", field: "invoiceVoucherId" },
              ]}
              rows={rows}
            />
          </div>
        </div>
      </div>
    </>
  );
}
