import PurchaseReportsSideNav from "components/Reports/PurchaseReportsSidenav";
import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import { MDBSelect } from "mdb-react-ui-kit";
import { getDateFromMillis, roundValue } from "helper/utility";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { useLazyGetContainersCostsReportQuery } from "redux/features/purchase/Invoices/InvoicesApiSlice";
import { months } from "helper/globalVariables";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
export default function ContainersCosts() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [selectedField, setField] = useState<string | number>("container");
  const { data: clientData } = useGetAllClientsQuery(null);
  const [queryParams, setQueryParams] = useState({
    orderByCost: false,
    field: "container" as string | number | undefined,
  });
  const [triggerGetContainerCostsReport, containerCostsData] =
    useLazyGetContainersCostsReportQuery();
  const [searchParams] = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const [defaultFilter, setDefaultFilter] =
    useState<Record<string, string | number | boolean>>();

  const SummarizeData = [
    {
      name: "Container",
      id: "container",
      value: "container",
    },
    {
      name: "Month",
      id: "month",
      value: "month",
    },
  ];

  useEffect(() => {
    if ("orderByCost" in queryParams) {
      let orderByCost = queryParams.orderByCost;
      triggerGetContainerCostsReport({ ...queryParams, orderByCost });
    } else triggerGetContainerCostsReport(queryParams);
  }, [queryParams, triggerGetContainerCostsReport]);

  useEffect(() => {
    if (month && year) {
      const { startDate, endDate } = getMonthDates(month, +year) || {};
      if (startDate && endDate)
        setDefaultFilter({ startDate, endDate, orderByCost: false });
    }
  }, [month]);

  function getMonthDates(
    monthName: string,
    year: number
  ): { startDate: string; endDate: string } | null {
    const currentYear = year;
    // const currentYear = new Date().getFullYear();
    const monthInfo = months.find(
      (month) => month.name.toLowerCase() === monthName.toLowerCase()
    );

    if (!monthInfo) {
      console.error("Invalid month name");
      return null;
    }

    const startDate = new Date(currentYear, monthInfo.number - 1, 1);
    const endDate = new Date(currentYear, monthInfo.number, 0);

    return {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    };
  }

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

  return (
    <div className="d-lg-flex">
      <div>
        <PurchaseReportsSideNav type={16} />
      </div>
      <div className="table-container">
        <Filters
          componentRef={ref}
          printAble={
            (containerCostsData?.data?.payLoad &&
              containerCostsData?.data?.payLoad.length > 0 &&
              selectedField !== "null") ??
            false
          }
          exportAble={
            (containerCostsData?.data?.payLoad &&
              containerCostsData?.data?.payLoad.length > 0) ??
            false
          }
          defaultFilters={defaultFilter}
          filters={[
            {
              label: "Start Date",
              name: "startDate",
              inputType: "date",
            },
            {
              label: "End Date",
              name: "endDate",
              inputType: "date",
            },
            {
              label: "Supplier",
              name: "supplierIds",
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
              label: "Expensive",
              name: "orderByCost",
              inputType: "boolean",
            },
          ]}
          onSubmit={(query) => {
            if (Object.keys(query).length === 0) {
              setQueryParams({
                field: selectedField,
                orderByCost: false,
              });
            } else setQueryParams({ ...queryParams, ...query });
          }}
        >
          <MDBSelect
            className="me-3"
            data={summarizeDataList(selectedField)}
            onValueChange={(data) => {
              if ("value" in data) {
                setField(data.value ? data?.value : 0);
                setQueryParams((prev) => {
                  return {
                    ...prev,
                    field: SummarizeData.find((res) => res.id == data?.value)
                      ?.value,
                  };
                });
              }
            }}
            size="sm"
            preventFirstSelection
            search
            label="Summarize By"
          />
        </Filters>
        {selectedField === "container" && (
          <DataTable
            tableTitle="Raw Material"
            ref={ref}
            isLoading={containerCostsData.isFetching}
            columns={[
              { label: "Container No", field: "containerNo" },
              { label: "Date", field: "date" },
              { label: "Month", field: "month" },
              { label: "Supplier", field: "supplier" },
              { label: "Weight KGS", field: "weightKgs", showSum: true },
              { label: "Weight LBS", field: "weightLbs", showSum: true },
              { label: "Total Cost", field: "cost", showSum: true },
              { label: "Cost / LBS", field: "costPerLbs", showSum: true },
            ]}
            rows={
              containerCostsData?.data
                ? containerCostsData?.data?.payLoad?.map((item) => {
                    return {
                      date: getDateFromMillis(item.date),
                      month: item.month,
                      supplier: item.supplier,
                      containerNo: item.containerNo,
                      costPerLbs: roundValue(item.costPerLbs),
                      cost: roundValue(item.cost),
                      weightLbs: roundValue(item.weightLbs),
                      weightKgs: roundValue(item.weightKgs),
                    };
                  })
                : []
            }
          />
        )}
        {selectedField === "month" && (
          <DataTable
            tableTitle="Raw Material"
            ref={ref}
            isLoading={containerCostsData.isFetching}
            columns={[
              { label: "Month", field: "month" },
              { label: "Total Containers", field: "totalContainers" },
              { label: "Weight KGS", field: "weightKgs", showSum: true },
              { label: "Weight LBS", field: "weightLbs", showSum: true },
              { label: "Cost", field: "cost", showSum: true },
              { label: "Cost / LBS", field: "costPerLbs", showSum: true },
            ]}
            rows={
              containerCostsData?.data
                ? containerCostsData?.data?.payLoad?.map((item) => {
                    return {
                      month: item.month,
                      costPerLbs: roundValue(item.costPerLbs),
                      cost: roundValue(item.cost),
                      weightLbs: roundValue(item.weightLbs),
                      weightKgs: roundValue(item.weightKgs),
                      totalContainers: +item.totalContainers,
                    };
                  })
                : []
            }
          />
        )}
      </div>
    </div>
  );
}
