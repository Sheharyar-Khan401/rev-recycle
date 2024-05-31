import PurchaseReportsSideNav from "components/Reports/PurchaseReportsSidenav";
import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import { useLazyGetContainerInTransitReportsQuery } from "redux/features/purchase/Invoices/InvoicesApiSlice";
import { ContainerInTransitReports } from "redux/types/Invoices/Invoices";
import {
  getDateFromMillis,
  roundValue,
  convertWghtToLbs,
} from "helper/utility";
import { useGetPaymentTermsQuery } from "redux/features/common/paymentTermApiSlice";
import { useGetLocationQuery } from "redux/features/Settings/purchase/locationApiSlice";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { MDBSelect } from "mdb-react-ui-kit";
import { useLazyGetAgentQuery } from "redux/features/Clients/Agents/agentsApiSlice";
export default function Transit() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [field, setField] = useState<string>("item");
  const [triggerContainerInTransit, getContainerInTransit] =
    useLazyGetContainerInTransitReportsQuery();
  const { data: paymentTermData } = useGetPaymentTermsQuery(null);
  const { data: locationsData } = useGetLocationQuery(null);
  const { data: invoiceTypeData } = useGetInvoiceTypesQuery(null);
  const [getAgents, result] = useLazyGetAgentQuery();
  // const { data: clientData } = useGetAllClientsQuery(null);
  const [queryParams, setQueryParams] = useState({
    field: "item",
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  const clientData = result?.data?.payLoad;

  const SummarizeData = [
    {
      name: "Item",
      id: "item",
    },
    {
      name: "None",
      id: "null",
    },
    {
      name: "Balance",
      id: "balance",
    },
    {
      name: "Container",
      id: "container",
    },
    {
      name: "Month",
      id: "month",
    },
    {
      name: "Origin",
      id: "origin",
    },
    // {
    //   name: "Reference",
    //   id: "reference",
    // },
    {
      name: "Category",
      id: "category",
    },
    {
      name: "Suppplier",
      id: "supplier",
    },
    {
      name: "Supplier Month",
      id: "supplierMonth",
    },
  ];
  const summarizeDataList = (id: string | number) => {
    return SummarizeData
      ? SummarizeData?.map((item: { name: string; id: string }) => {
          return {
            text: item?.name ?? "",
            value: item?.id,
            defaultSelected: item?.id === id,
          };
        })
      : [];
  };
  useEffect(() => {
    triggerContainerInTransit(queryParams);
  }, [queryParams, triggerContainerInTransit]);

  useEffect(() => {
    getAgents({
      isAgent: true,
      pageNumber: 0,
    });
  }, []);

  return (
    <div className="d-lg-flex">
      <div>
        <PurchaseReportsSideNav type={1} />
      </div>
      <div className="table-container">
        {field !== "" && field !== undefined && (
          <Filters
            componentRef={ref}
            printAble={
              (getContainerInTransit?.data?.payLoad &&
                getContainerInTransit?.data?.payLoad.length > 0) ??
              false
            }
            exportAble={
              (getContainerInTransit?.data?.payLoad &&
                getContainerInTransit?.data?.payLoad.length > 0) ??
              false
            }
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
                label: "Arrival Start Date",
                name: "arrivalStartDate",
                inputType: "date",
              },
              {
                label: "Arrival End Date",
                name: "arrivalEndDate",
                inputType: "date",
              },
              {
                label: "Expected Off Loading Start Date",
                name: "expectedOffLoadingStartDate",
                inputType: "date",
              },
              {
                label: "Expected Off Loading End Date",
                name: "expectedOffLoadingEndDate",
                inputType: "date",
              },
              {
                label: "Vessel No.",
                name: "vesselNo",
                inputType: "text",
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
                  field,
                  startDate: queryParams.startDate,
                  endDate: queryParams.endDate,
                });
              } else setQueryParams({ ...queryParams, ...query });
            }}
          >
            <MDBSelect
              className="me-3"
              data={summarizeDataList(field)}
              onValueChange={(data) => {
                if ("value" in data) {
                  setQueryParams((prev) => {
                    return {
                      ...prev,
                      field: data.value ? data?.value?.toString() : "",
                    };
                  });
                  setField(data.value ? data.value.toString() : "");
                }
              }}
              size="sm"
              search
              label="Summarize By"
            />
          </Filters>
        )}
        {(field === "null" ||
          field === "item" ||
          field === "balance" ||
          field === "container") && (
          <DataTable
            ref={ref}
            tableTitle="Container in Transit"
            isLoading={getContainerInTransit.isFetching}
            columns={[
              { label: "SR. No.", field: "srNo" },
              { label: "Reference No", field: "referenceNo" },
              { label: "Invoice Date", field: "invoiceDate" },
              { label: "Invoice No", field: "invoiceNo" },
              { label: "Vessel No", field: "vesselNo" },
              { label: "Container No", field: "containerNo" },
              { label: "Supplier", field: "supplier" },
              { label: "Origin", field: "origin" },
              { label: "Port Of Loading", field: "portOfLoading" },
              { label: "Terms", field: "terms" },
              { label: "Arrival Date", field: "arrivalDate" },
              { label: "Exp Of Loading Date", field: "expOfLoadingDate" },
              { label: "Type", field: "type" },
              { label: "CTI", field: "cti" },
              { label: "Freight Agent", field: "freightAgent" },
              { label: "Clearing Agent", field: "clearingAgent" },
              { label: "Delivery Order Agent", field: "deliveryOrderAgent" },
              { label: "Bales", field: "bales", showSum: true },
              { label: "Weight(Kgs)", field: "WeightKgs", showSum: true },
              { label: "Weigh(Lbs)", field: "WeightLbs", showSum: true },
              { label: "Currency", field: "currency" },
              { label: "Amount", field: "amount", showSum: true },
              { label: "Cost/Kgs", field: "costKgs", showSum: true },
              { label: "Cost/Lbs", field: "costLbs", showSum: true },
              { label: "Freight", field: "freight", showSum: true },
              { label: "Clearing", field: "clearing", showSum: true },
              { label: "D/O", field: "do", showSum: true },
              { label: "Commisssion", field: "commission", showSum: true },
              { label: "Net Amount", field: "netAmount", showSum: true },
              { label: "CNF/Kgs", field: "cnfKgs", showSum: true },
              { label: "CNF/Lbs", field: "cnfLbs", showSum: true },
            ]}
            rows={
              getContainerInTransit?.data
                ? getContainerInTransit?.data?.payLoad?.map(
                    (item: ContainerInTransitReports, index: number) => {
                      return {
                        srNo: index + 1,
                        referenceNo: item?.referenceNo
                          ? item?.referenceNo
                          : "-",
                        invoiceDate: getDateFromMillis(item?.invoiceDate),
                        invoiceNo: item?.invoiceNo ? item?.invoiceNo : "-",
                        vesselNo: item?.vesselNo ? item?.vesselNo : "-",
                        containerNo: item?.containerNo
                          ? item?.containerNo
                          : "-",
                        supplier: item?.supplier ? item?.supplier : "-",
                        origin: item?.origin ? item?.origin : "-",
                        portOfLoading: item?.portOfLoading
                          ? item?.portOfLoading
                          : "-",
                        terms: item?.paymentTerms ? item?.paymentTerms : "-",
                        arrivalDate: getDateFromMillis(item?.arrivalDate),
                        expOfLoadingDate: getDateFromMillis(
                          item?.expectedOffLoadingDate
                        ),
                        type: item?.invoiceType ? item?.invoiceType : "-",
                        freightAgent: item?.freightAgent
                          ? item?.freightAgent
                          : "-",
                        clearingAgent: item?.clearingAgent
                          ? item?.clearingAgent
                          : "-",
                        deliveryOrderAgent: item?.deliveryOrderAgent
                          ? item?.deliveryOrderAgent
                          : "-",
                        bales: item?.quantity ? item?.quantity : 0,
                        WeightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        WeightLbs: item?.weightKgs
                          ? roundValue(convertWghtToLbs(item?.weightKgs))
                          : 0,
                        currency: item?.currency ? item?.currency : "-",
                        amount: item?.amount ? roundValue(item?.amount) : 0,
                        costKgs: item?.costKgs ? roundValue(item?.costKgs) : 0,
                        costLbs: item?.costLbs ? roundValue(item?.costLbs) : 0,
                        freight: item?.freightCost
                          ? roundValue(item?.freightCost)
                          : 0,
                        clearing: item?.clearingCost
                          ? roundValue(item?.clearingCost)
                          : 0,
                        do: item?.deliveryOrderCost
                          ? roundValue(item?.deliveryOrderCost)
                          : 0,
                        commission: item?.commission
                          ? roundValue(item?.commission)
                          : 0,
                        netAmount: item?.netAmount
                          ? roundValue(item?.netAmount)
                          : 0,
                        cnfKgs: item?.nfKgs ? roundValue(item?.nfKgs) : 0,
                        cnfLbs: item?.nfLbs ? roundValue(item.nfLbs) : 0,
                        cti: item?.cti ? "Yes" : "No",
                      };
                    }
                  )
                : []
            }
          />
        )}

        {/* Month Data Table */}
        {field === "month" && (
          <DataTable
            ref={ref}
            isLoading={getContainerInTransit.isFetching}
            columns={[
              { label: "Total Containers", field: "totalContainer" },
              { label: "Net Amount", field: "netAmount" },
              { label: "Bales", field: "bales" },
              { label: "Weight(Kgs)", field: "WeightKgs" },
              { label: "Weigh(Lbs)", field: "WeightLbs" },
              { label: "Cost/Lbs", field: "costLbs" },
              { label: "Freight", field: "freight" },
              { label: "Clearing", field: "clearing" },
              { label: "D/O", field: "do" },
            ]}
            rows={
              getContainerInTransit?.data
                ? getContainerInTransit?.data?.payLoad?.map(
                    (item: ContainerInTransitReports) => {
                      return {
                        totalContainer: item?.totalContainers
                          ? item?.totalContainers
                          : "-",
                        invoiceDate: getDateFromMillis(item?.invoiceDate),

                        bales: item?.quantity ? item?.quantity : 0,
                        WeightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        WeightLbs: item?.weightKgs
                          ? roundValue(convertWghtToLbs(item?.weightKgs))
                          : 0.0,

                        costLbs: item?.costLbs ? roundValue(item?.costLbs) : 0,
                        freight: item?.freightCost
                          ? roundValue(item?.freightCost)
                          : 0,
                        clearing: item?.clearingCost
                          ? roundValue(item?.clearingCost)
                          : 0,
                        do: item?.deliveryOrderCost
                          ? roundValue(item?.deliveryOrderCost)
                          : 0,

                        netAmount: item?.netAmount
                          ? roundValue(item?.netAmount)
                          : 0,
                      };
                    }
                  )
                : []
            }
          />
        )}
        {/* Origin Data Table */}
        {field === "origin" && (
          <DataTable
            ref={ref}
            isLoading={getContainerInTransit.isFetching}
            columns={[
              { label: "Total Containers", field: "totalContainer" },
              { label: "Origin", field: "origin" },
              { label: "Net Amount", field: "netAmount" },
              { label: "Bales", field: "bales" },
              { label: "Weight(Kgs)", field: "WeightKgs" },
              { label: "Weigh(Lbs)", field: "WeightLbs" },
              { label: "Cost/Lbs", field: "costLbs" },
              { label: "Freight", field: "freight" },
              { label: "Clearing", field: "clearing" },
              { label: "D/O", field: "do" },
            ]}
            rows={
              getContainerInTransit?.data
                ? getContainerInTransit?.data?.payLoad?.map(
                    (item: ContainerInTransitReports) => {
                      return {
                        totalContainer: item?.totalContainers
                          ? item?.totalContainers
                          : "-",
                        invoiceDate: getDateFromMillis(item?.invoiceDate),

                        origin: item?.origin ? item?.origin : "-",
                        bales: item?.quantity ? item?.quantity : 0,
                        WeightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        WeightLbs: item?.weightKgs
                          ? roundValue(convertWghtToLbs(item?.weightKgs))
                          : 0.0,

                        costLbs: item?.costLbs ? roundValue(item?.costLbs) : 0,
                        freight: item?.freightCost
                          ? roundValue(item?.freightCost)
                          : 0,
                        clearing: item?.clearingCost
                          ? roundValue(item?.clearingCost)
                          : 0,
                        do: item?.deliveryOrderCost
                          ? roundValue(item?.deliveryOrderCost)
                          : 0,

                        netAmount: item?.netAmount
                          ? roundValue(item?.netAmount)
                          : 0,
                      };
                    }
                  )
                : []
            }
          />
        )}
        {/* Supplier and Supplier_Month Data Table */}
        {(field === "supplier" || field === "supplierMonth") && (
          <DataTable
            ref={ref}
            isLoading={getContainerInTransit.isFetching}
            columns={[
              { label: "Total Containers", field: "totalContainer" },
              { label: "Supplier", field: "supplier" },
              { label: "Net Amount", field: "netAmount" },
              { label: "Bales", field: "bales" },
              { label: "Weight(Kgs)", field: "WeightKgs" },
              { label: "Weigh(Lbs)", field: "WeightLbs" },
              { label: "Cost/Lbs", field: "costLbs" },
              { label: "Freight", field: "freight" },
              { label: "Clearing", field: "clearing" },
              { label: "D/O", field: "do" },
            ]}
            rows={
              getContainerInTransit?.data
                ? getContainerInTransit?.data?.payLoad?.map(
                    (item: ContainerInTransitReports) => {
                      return {
                        totalContainer: item?.totalContainers
                          ? item?.totalContainers
                          : "-",
                        invoiceDate: getDateFromMillis(item?.invoiceDate),

                        supplier: item?.supplier ? item?.supplier : "-",
                        bales: item?.quantity ? item?.quantity : 0,
                        WeightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        WeightLbs: item?.weightKgs
                          ? roundValue(convertWghtToLbs(item?.weightKgs))
                          : 0.0,

                        costLbs: item?.costLbs ? roundValue(item?.costLbs) : 0,
                        freight: item?.freightCost
                          ? roundValue(item?.freightCost)
                          : 0,
                        clearing: item?.clearingCost
                          ? roundValue(item?.clearingCost)
                          : 0,
                        do: item?.deliveryOrderCost
                          ? roundValue(item?.deliveryOrderCost)
                          : 0,

                        netAmount: item?.netAmount
                          ? roundValue(item?.netAmount)
                          : 0,
                      };
                    }
                  )
                : []
            }
          />
        )}

        {/* Category Data Table */}
        {field === "category" && (
          <DataTable
            ref={ref}
            isLoading={getContainerInTransit.isFetching}
            columns={[
              { label: "Category", field: "category" },
              { label: "Net Amount", field: "netAmount" },
              { label: "Bales", field: "bales" },
              { label: "Weight(Kgs)", field: "WeightKgs" },
              { label: "Weigh(Lbs)", field: "WeightLbs" },
              { label: "Cost/Lbs", field: "costLbs" },
            ]}
            rows={
              getContainerInTransit?.data
                ? getContainerInTransit?.data?.payLoad?.map(
                    (item: ContainerInTransitReports) => {
                      return {
                        category: item?.category ? item?.category : "-",
                        bales: item?.quantity ? item?.quantity : 0,
                        WeightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        WeightLbs: item?.weightKgs
                          ? roundValue(convertWghtToLbs(item?.weightKgs))
                          : 0.0,

                        costLbs: item?.costLbs ? roundValue(item?.costLbs) : 0,
                        freight: item?.freightCost
                          ? roundValue(item?.freightCost)
                          : 0,
                        clearing: item?.clearingCost
                          ? roundValue(item?.clearingCost)
                          : 0,
                        do: item?.deliveryOrderCost
                          ? roundValue(item?.deliveryOrderCost)
                          : 0,

                        netAmount: item?.netAmount
                          ? roundValue(item?.netAmount)
                          : 0,
                      };
                    }
                  )
                : []
            }
          />
        )}
      </div>
    </div>
  );
}
