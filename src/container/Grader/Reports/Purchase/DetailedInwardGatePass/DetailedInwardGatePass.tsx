import PurchaseReportsSideNav from "components/Reports/PurchaseReportsSidenav";
import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import { useLazyGetReportsQuery } from "redux/features/purchase/gatePassesApiSlice";
import { PurchaseReports } from "redux/types/GatePasses/gatePasses";
import {
  getDateFromMillis,
  roundValue,
  convertWghtToLbs,
} from "helper/utility";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useGetLocationQuery } from "redux/features/Settings/purchase/locationApiSlice";
import { useGetPaymentTermsQuery } from "redux/features/common/paymentTermApiSlice";
import { useLazyGetAgentQuery } from "redux/features/Clients/Agents/agentsApiSlice";

export default function DetailedInward() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [triggerGetAllDetailedInwardReports, getDetailedInwardsReorts] =
    useLazyGetReportsQuery();
  const { data: paymentTermData } = useGetPaymentTermsQuery(null);
  const { data: locationsData } = useGetLocationQuery(null);
  const { data: invoiceTypeData } = useGetInvoiceTypesQuery(null);
  const [getAgents, result] = useLazyGetAgentQuery();
  const [queryParams, setQueryParams] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const clientData = result?.data?.payLoad;

  useEffect(() => {
    getAgents({
      isAgent: true,
      pageNumber: 0,
    });
  }, []);

  useEffect(() => {
    triggerGetAllDetailedInwardReports(queryParams);
  }, [queryParams]);
  const rows = getDetailedInwardsReorts?.data
    ? getDetailedInwardsReorts?.data?.payLoad.map((item: PurchaseReports) => {
        return {
          purchaseGatePassId: item?.gatePassId ? item?.gatePassId : 0,
          referenceNo: item?.referenceNumber ? item?.referenceNumber : "-",
          date: getDateFromMillis(item?.date),
          invoiceDate: getDateFromMillis(item?.invoiceDate),
          invoiceNo: item?.invoiceNo ? item?.invoiceNo : "-",
          vesselNo: item?.vesselNo ? item?.vesselNo : "-",
          origin: item?.origin ? item?.origin : "-",
          container: item?.containerNo ? item?.containerNo : "-",
          supplier: item?.supplierName ? item?.supplierName : "-",
          type: item?.type ? item?.type : "-",
          term: item?.term ? item?.term : "-",
          currency: item?.currency ? item?.currency : "-",
          exchangeRate: item?.exRate ? item?.exRate : "-",
          amount: item?.amount ? roundValue(item?.amount) : 0,
          freightCost: item?.freightCost ? roundValue(item?.freightCost) : 0,
          clearingCost: item?.clearingCost ? roundValue(item?.clearingCost) : 0,
          doCost: item?.doCost ? roundValue(item?.doCost) : 0,
          netCommission: item?.netCommission
            ? roundValue(item?.netCommission)
            : 0,
          netAmount: item?.netAmount ? roundValue(item?.netAmount) : 0,
          units: item?.units ? item?.units : 0,
          weightKgs: item?.weightKGS ? roundValue(item?.weightKGS) : 0,
          weightLbs: item?.weightKGS
            ? roundValue(convertWghtToLbs(item?.weightKGS))
            : 0,
          kantaWeight: item?.kantaWeight ? roundValue(item?.kantaWeight) : 0,
          difference: item?.diffWeight ? roundValue(item?.diffWeight) : 0,
          costPerKgs: item?.weightKGS ? roundValue(item?.amount/item?.weightKGS) : 0,
          costPerLbs: item?.weightLBS
            ? roundValue(item?.amount/item?.weightLBS)
            : 0,
          freightAgent: item?.freightAgent ? item?.freightAgent : "-",
          clearingAgent: item?.clearingAgent ? item?.clearingAgent : "-",
          doAgent: item?.doAgent ? item?.doAgent : "-",
          voucherId: item?.voucherId ? item?.voucherId : "-",
        };
      })
    : [];

  return (
    <div className="d-lg-flex">
      <div>
        <PurchaseReportsSideNav type={2} />
      </div>
      <div className="table-container">
        <Filters
          printAble={rows.length > 0}
          exportAble={rows.length > 0}
          componentRef={ref}
          filters={[
            {
              label: "Payment Term",
              name: "paymentTermIds",
              inputType: "multiselect",
              options: paymentTermData
                ? paymentTermData?.map((item) => {
                    return {
                      text: item?.paymentTermDescription,
                      value: item?.paymentTermId,
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
              label: "Invoice Types",
              name: "invoiceTypeIds",
              inputType: "multiselect",
              options: invoiceTypeData
                ? invoiceTypeData?.map((item) => {
                    return {
                      text: item?.name ? item?.name : "",
                      value: item.invoiceTypeId ? item.invoiceTypeId : 0,
                    };
                  })
                : [],
            },
            {
              label: "Client",
              name: "clientIds",
              inputType: "multiselect",
              options: clientData
                ? clientData?.map((client) => {
                    return {
                      text: client?.user?.fullName
                        ? client?.user?.fullName
                        : "",
                      value: client.clientId ? client.clientId : 0,
                    };
                  })
                : [],
            },
            {
              label: "Freight Agent",
              name: "freightClientIds",
              inputType: "multiselect",
              options: clientData
                ? clientData?.map((client) => {
                    return {
                      text: client?.user?.fullName
                        ? client?.user?.fullName
                        : "",
                      value: client.clientId ? client.clientId : 0,
                    };
                  })
                : [],
            },
            {
              label: "Clearing Agent",
              name: "clearingClientIds",
              inputType: "multiselect",
              options: clientData
                ? clientData?.map((client) => {
                    return {
                      text: client?.user?.fullName
                        ? client?.user?.fullName
                        : "",
                      value: client.clientId ? client.clientId : 0,
                    };
                  })
                : [],
            },
            {
              label: "Vessel No.",
              name: "vesselNo",
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
                startDate: queryParams.startDate,
                endDate: queryParams.endDate,
              });
            } else setQueryParams({ ...queryParams, ...query });
          }}
        />
        <DataTable
          ref={ref}
          tableTitle="Detailed Inward Gate Pass"
          isLoading={getDetailedInwardsReorts.isFetching}
          columns={[
            { label: "Id", field: "purchaseGatePassId" },
            { label: "Reference No", field: "referenceNo" },
            { label: "Date", field: "date" },
            { label: "Invoice Date", field: "invoiceDate" },
            { label: "Invoice No.", field: "invoiceNo" },
            { label: "Vessel No", field: "vesselNo" },
            { label: "Origin", field: "origin" },
            { label: "Container", field: "container" },
            { label: "Supplier", field: "supplier" },
            { label: "Type", field: "type" },
            { label: "Term", field: "term" },
            { label: "Currency", field: "currency" },
            { label: "Exchange Rate", field: "exchangeRate", showSum: true },
            { label: "Amount", field: "amount", showSum: true },
            { label: "Freight Cost", field: "freightCost", showSum: true },
            { label: "Clearing Cost", field: "clearingCost", showSum: true },
            { label: "D.O Cost", field: "doCost", showSum: true },
            { label: "Net Commission", field: "netCommission", showSum: true },
            { label: "Net Amount", field: "netAmount", showSum: true },
            { label: "Units", field: "units" },
            { label: "Weight (Kgs)", field: "weightKgs", showSum: true },
            { label: "Weight (LBS)", field: "weightLbs", showSum: true },
            { label: "Kanta Weight", field: "kantaWeight", showSum: true },
            {
              label: "Difference In Weight",
              field: "difference",
              showSum: true,
            },
            { label: "Cost/Kgs", field: "costPerKgs", showSum: true },
            { label: "Cost/LBS", field: "costPerLbs", showSum: true },
            { label: "Freight Agent", field: "freightAgent" },
            { label: "Clearing Agent", field: "clearingAgent" },
            { label: "D.O Agent", field: "doAgent" },
            { label: "Voucher Id", field: "voucherId" },
          ]}
          rows={rows}
        />
      </div>
    </div>
  );
}
