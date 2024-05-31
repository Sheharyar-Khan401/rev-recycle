import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import SalesReportsSideNav from "components/Reports/SalesReportsSidenav";
import { DailyProductionProfit } from "redux/types/Sales/Reports/DailyProductionProfit";
import { useLazyGetProductionProfitReportsQuery } from "redux/features/sales/Reports/ProductionProfitApiSlice";
import {
  getDateFromMillis,
  roundValue,
  convertWghtToLbs,
} from "helper/utility";

export default function ProductionProfitReports() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [getReports, reportsData] = useLazyGetProductionProfitReportsQuery();
  const [queryParams, setQueryParams] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    getReports(queryParams);
  }, [queryParams, getReports]);

  const rows = reportsData?.data
    ? reportsData?.data?.payLoad.map(
        (item: DailyProductionProfit, index: number) => {
          return {
            sr: index + 1,
            title: getDateFromMillis(item?.date),
            issWeightKgs: item?.productionIssuanceWeightKgs
              ? roundValue(item?.productionIssuanceWeightKgs)
              : 0,
            issWeightLbs: item?.productionIssuanceWeightKgs
              ? roundValue(convertWghtToLbs(item?.productionIssuanceWeightKgs))
              : 0,
            proWeightKgs: item?.productionWeightKgs
              ? roundValue(item?.productionWeightKgs)
              : 0,
            proWeightLbs: item?.productionWeightKgs
              ? roundValue(convertWghtToLbs(item?.productionWeightKgs))
              : 0,
            prodAmount: item?.productionAmount
              ? roundValue(item?.productionAmount)
              : 0,
            issAmount: item?.productionIssuanceAmount
              ? roundValue(item?.productionIssuanceAmount)
              : 0,
            prodPL: item?.productionProfitLoss
              ? roundValue(item?.productionProfitLoss)
              : 0,
            salesAmount: item?.saleAmount ? roundValue(item?.saleAmount) : 0,
            salesProdAmount: item?.saleProductionAmount
              ? roundValue(item?.saleProductionAmount)
              : 0,
            salesPL: item?.saleProfitLoss
              ? roundValue(item?.saleProfitLoss)
              : 0,
            netPL: item?.netProfitLoss ? roundValue(item?.netProfitLoss) : 0,
            issNetPL: item?.issuanceNetProfitLoss
              ? roundValue(item?.issuanceNetProfitLoss)
              : 0,
          };
        }
      )
    : [];
  return (
    <>
      <div className="d-lg-flex">
        <div>
          <SalesReportsSideNav type={5} />
        </div>
        <div className="table-container">
          <Filters
            componentRef={ref}
            printAble={rows.length > 0}
            exportAble={rows.length > 0}
            filters={[]}
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
            tableTitle="Sales Production Profit"
            isLoading={reportsData.isFetching}
            columns={[
              { label: "Sr. No.", field: "sr" },
              { label: "Title", field: "title" },
              { label: "Iss. Weight (KGS)", field: "issWeightKgs" },
              { label: "Iss. Weight (LBS)", field: "issWeightLbs" },
              { label: "Pro. Weight (KGS)", field: "proWeightKgs" },
              { label: "Pro. Weight (LBS)", field: "proWeightLbs" },
              { label: "$ Prod. Amount", field: "prodAmount" },
              { label: "$ Iss. Amount", field: "issAmount" },
              { label: "$ Prod. P/L", field: "prodPL" },
              { label: "$ Sales Amount", field: "salesAmount" },
              { label: "$ Sales Prod. Amount", field: "salesProdAmount" },
              { label: "$ Sale P/L", field: "salesPL" },
              { label: "$ Net P/L", field: "netPL" },
              { label: "$ Iss. Net P/L", field: "issNetPL" },
            ]}
            rows={rows}
          />
        </div>
      </div>
    </>
  );
}
