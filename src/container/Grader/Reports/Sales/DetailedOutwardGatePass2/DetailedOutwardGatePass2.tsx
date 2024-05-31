import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import SalesReportsSideNav from "components/Reports/SalesReportsSidenav";
import { useLazyGetDetailedOutwardGatePass2ReportsQuery } from "redux/features/sales/gatePassesApiSlice";
import { DetailedOutwardGatePassReport } from "redux/types/Sales/gatepasses";
import {
  getDateFromMillis,
  roundValue,
  convertWghtToLbs,
} from "helper/utility";
import { useGetCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
export default function DetailedOutwardGatePass2() {
  const ref = useRef<HTMLInputElement | null>(null);
  const { data: currencyData } = useGetCurrrencyQuery(null);
  const { data: supplierData } = useGetAllClientsQuery(null);
  const { data: invoiceTypeData } = useGetInvoiceTypesQuery(null);
  const [triggerDetailedInwardGatePasses2, getDetaliedInwardGatePasses2] =
    useLazyGetDetailedOutwardGatePass2ReportsQuery();
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    triggerDetailedInwardGatePasses2(queryParams);
  }, [queryParams]);

  const rows = getDetaliedInwardGatePasses2?.data
    ? getDetaliedInwardGatePasses2?.data?.payLoad?.map(
        (item: DetailedOutwardGatePassReport) => {
          return {
            referenceNo: item?.referenceNumber ? item?.referenceNumber : "-",
            gpDate: getDateFromMillis(item?.gpDate),
            invDate: getDateFromMillis(item?.invoiceDate),
            invoiceNo: item?.invoiceNo ? item?.invoiceNo : "-",
            invoiceVoucherId: item?.invVoucherId ? item?.invVoucherId : 0,
            container: item?.containerNo ? item?.containerNo : "-",
            customer: item?.customer ? item?.customer : "-",
            type: item?.invoiceType ? item?.invoiceType : "-",
            units: item?.units ? roundValue(item?.units) : 0,
            weightKgs: item?.weightKgs ? roundValue(item?.weightKgs) : 0,
            weightLbs: item?.weightLbs ? roundValue(item?.weightLbs) : 0,
            fob: item?.fob ? roundValue(item?.fob) : 0,
            surCharges: item?.surCharges ? roundValue(item?.surCharges) : 0,
            chargesExperience: item?.chargesExp
              ? roundValue(item?.chargesExp)
              : 0,
            discountAmount: item?.discAmount ? item?.discAmount : 0,
            amount: item?.amount ? item?.amount : 0,
            cogs: item?.cogs ? roundValue(item?.cogs) : 0,
            netPi: item?.netPl ? roundValue(item?.netPl) : 0,
            amountkgs: item?.amountPerKgs ? roundValue(item?.amountPerKgs) : 0,
            amountlbs: item?.amountPerLbs ? roundValue(item?.amountPerLbs) : 0,
            cogsKgs: item?.cogsPerKgs ? roundValue(item?.cogsPerKgs) : 0,
            cogsLbs: item?.cogsPerKgs
              ? roundValue(convertWghtToLbs(item?.cogsPerKgs))
              : 0,
            netPiKgs: item?.netPlPerKgs ? roundValue(item?.netPlPerKgs) : 0,
            netPiLbs: item?.netPlPerKgs
              ? roundValue(convertWghtToLbs(item?.netPlPerKgs))
              : 0,
            chargesFob: item?.chargeFob ? roundValue(item?.chargeFob) : 0,
            currency: item?.currency ? item?.currency : "-",
            exRate: item?.exRate ? roundValue(item?.exRate) : 0,
            chargesAmount: item?.chargeAmount
              ? roundValue(item?.chargeAmount)
              : 0,
            chargesTaxAmount: item?.taxAmount ? roundValue(item?.taxAmount) : 0,
            freightCost: item?.freightCost ? roundValue(item?.freightCost) : 0,
            clearingCost: item?.clearingCost
              ? roundValue(item?.clearingCost)
              : 0,
            cnocCost: item?.cnocCost ? roundValue(item?.cnocCost) : 0,
          };
        }
      )
    : [];

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <SalesReportsSideNav type={6} />
          <div className="table-container">
            <Filters
              componentRef={ref}
              printAble={rows.length > 0}
              exportAble={rows.length > 0}
              filters={[
                {
                  label: "Currency",
                  name: "currencyIds",
                  inputType: "select",
                  options: currencyData
                    ? currencyData?.map((currency) => {
                        return {
                          text: currency?.name ? currency?.name : "",
                          value: currency?.currencyId
                            ? currency?.currencyId
                            : 0,
                        };
                      })
                    : [],
                },
                {
                  label: "Client",
                  name: "customerIds",
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

                {
                  label: "Invoice Date",
                  name: "invoiceDate",
                  inputType: "date",
                },
                {
                  label: "Passing Date",
                  name: "passingDate",
                  inputType: "date",
                },
              ]}
              onSubmit={(query) => {
                if (Object.keys(query).length === 0) {
                  setQueryParams({});
                } else setQueryParams({ ...queryParams, ...query });
              }}
            />
            <DataTable
              ref={ref}
              tableTitle="Detailed Outward Gate Pass(2)"
              isLoading={getDetaliedInwardGatePasses2.isFetching}
              columns={[
                { label: "Reference No", field: "referenceNo" },
                { label: "GP Date", field: "gpDate" },
                { label: "Invoice Date", field: "invDate" },
                { label: "Invoice No", field: "invoiceNo" },
                { label: "Invoice Voucher Id", field: "invoiceVoucherId" },
                { label: "Customer", field: "customer" },
                { label: "Type", field: "type" },
                { label: "Units", field: "units" },
                { label: "Container", field: "container" },
                { label: "Weight(Kgs)", field: "weightKgs" },
                { label: "Weight(Lbs)", field: "weightLbs" },
                { label: "Income FOB", field: "fob" },
                { label: "Sur Charges", field: "surCharges" },
                { label: "Charges Experience", field: "chargesExperience" },
                { label: "Discount Amount", field: "discountAmount" },
                { label: "Income Amount", field: "amount" },
                { label: "COGS", field: "cogs" },
                { label: "Net P.I", field: "netPi" },
                { label: "Amount/KGS", field: "amountkgs" },
                { label: "Amount/LBS", field: "amountlbs" },
                { label: "COGS/KGS", field: "cogsKgs" },
                { label: "COGS/LBS", field: "cogsLbs" },
                { label: "Net P.I/KGS", field: "netPiKgs" },
                { label: "Net P.I/LBS", field: "netPiLbs" },
                { label: "Charges FOB", field: "chargesFob" },
                { label: "Currency", field: "currency" },
                { label: "Exchange Rate", field: "exRate" },
                { label: "Charges Amount", field: "chargesAmount" },
                { label: "Charges Tax Amount", field: "chargesTaxAmount" },
                { label: "Freight Cost", field: "freightCost" },
                { label: "Clearing Cost", field: "clearingCost" },
                { label: "CNOC Cost", field: "cnocCost" },
              ]}
              rows={rows}
            />
          </div>
        </div>
      </div>
    </>
  );
}
