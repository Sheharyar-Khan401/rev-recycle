import { getYearsList } from "helper/utility";
import { MDBCheckbox, MDBIcon, MDBRadio, MDBSelect } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetContainersCostsReportQuery } from "redux/features/purchase/Invoices/InvoicesApiSlice";
import Loader from "shared/Components/Loader/Loader";
import ContainersStackChart from "components/Purchase/Overview/ContainersStackChart";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import InvoiceTypeChart from "components/Purchase/Overview/InvoiceTypeChart";
import { format } from "date-fns";

export default function DashboardOverview() {
  const [triggerGetContainerCostsReport, containerCostsData] =
    useLazyGetContainersCostsReportQuery();
  const [triggerGetInvoiceTypeReport, invoiceTypeData] =
    useLazyGetContainersCostsReportQuery();
  const [queryParams, setQueryParams] = useState({
    startDate: getLast6MonthsDate(),
    endDate: format(new Date(), "yyyy-MM-dd"),
    limit: 5,
    orderByCost: false,
  });
  const [queryParams2, setQueryParams2] = useState({
    startDate: new Date().getFullYear() + "-01-01",
    endDate: new Date().getFullYear() + "-12-31",
    field: "invoiceType",
    invoiceTypeIds: 0,
  });
  const [is6Months, setIs6Months] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedYear2, setSelectedYear2] = useState(new Date().getFullYear());
  const { isLoading: isInvoiceTypeListLoading, data: inVoiceTypeList } =
    useGetInvoiceTypesQuery(null);

  const navigate = useNavigate();

  useEffect(() => {
    triggerGetContainerCostsReport(queryParams);
  }, [queryParams, triggerGetContainerCostsReport]);

  useEffect(() => {
    if (queryParams2.invoiceTypeIds) triggerGetInvoiceTypeReport(queryParams2);
  }, [queryParams2, triggerGetInvoiceTypeReport]);

  useEffect(() => {
    if (inVoiceTypeList && inVoiceTypeList?.length > 0) {
      setQueryParams2((prev) => {
        return { ...prev, invoiceTypeIds: inVoiceTypeList[0].invoiceTypeId };
      });
    }
  }, [inVoiceTypeList]);

  const getYearsData = (year: number) => {
    return getYearsList().map((y) => {
      return {
        text: y.toString(),
        value: y,
        defaultSelected: y == year,
      };
    });
  };

  const getInvoiceTypeData = (id: number | null) => {
    return (
      inVoiceTypeList?.map((i) => {
        return {
          text: i.name,
          value: i.invoiceTypeId,
          defaultSelected: i.invoiceTypeId == id,
        };
      }) ?? []
    );
  };
  function getLast6MonthsDate() {
    let currentDate = new Date();
    let sixMonthsAgo = new Date(currentDate);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setDate(1);
    return format(new Date(sixMonthsAgo), "yyyy-MM-dd");
  }
  return (
    <div className="my-5">
      {/* Containers Graph */}
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <h5 className=" fw500 black">Pre-Production Price</h5>
          <span
            role="button"
            className="ms-3 text-primary"
            style={{ fontSize: "12px" }}
            onClick={() => {
              navigate("/grader/reports/purchase/containerscosts");
            }}
          >
            View All
            <MDBIcon className="ms-2" color="primary" icon="angle-right" />
          </span>
        </div>
        <div className="d-flex align-item-center">
          <div className="d-flex mx-2">
            <MDBRadio
              name="date"
              label="Last 6 Months"
              labelClass="me-2"
              onChange={(e) => {
                if (e.target.checked) {
                  setQueryParams((prev) => {
                    return {
                      ...prev,
                      startDate: getLast6MonthsDate(),
                      endDate: format(new Date(), "yyyy-MM-dd"),
                    };
                  });
                  setIs6Months(e.target.checked);
                }
              }}
              checked={is6Months}
            />
            <MDBRadio
              name="date"
              label="Year"
              onChange={(e) => {
                setQueryParams((prev) => {
                  return {
                    ...prev,
                    startDate: selectedYear + "-01-01",
                    endDate: selectedYear + "-12-31",
                  };
                });
                setIs6Months(!e.target.checked);
              }}
              checked={!is6Months}
            />
          </div>
          {!is6Months && (
            <div className="mx-2">
              <MDBSelect
                label="Year"
                size="sm"
                search
                data={getYearsData(selectedYear)}
                preventFirstSelection
                onValueChange={(data) => {
                  if ("value" in data && data.value) {
                    setSelectedYear(+data.value);
                    setQueryParams((prev) => {
                      return {
                        ...prev,
                        startDate: data.value + "-01-01",
                        endDate: data.value + "-12-31",
                      };
                    });
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-sm-12 my-3">
          <div
            className="align-items-center d-flex justify-content-center"
            style={{
              background: "#F7F9FB",
              borderRadius: "1rem",
              minHeight: "18.75rem",
            }}
          >
            {containerCostsData.isFetching ? (
              <Loader />
            ) : containerCostsData.data?.payLoad.length == 0 ? (
              <div>No Data Found</div>
            ) : (
              <ContainersStackChart
                containerCostReport={containerCostsData.data?.payLoad ?? []}
                limit={queryParams.limit}
                onBarClick={(month) => {
                  let params = {
                    month,
                    year: selectedYear.toString(),
                  };
                  navigate(
                    "/grader/reports/purchase/containerscosts?" +
                      new URLSearchParams(params).toString()
                  );
                }}
              />
            )}
          </div>
        </div>
      </div>
      {/* Invoice Type Graph */}
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <h5 className=" fw500 black">Purchase Graph</h5>
        </div>
        <div className="d-flex align-item-center">
          <div className="mx-2">
            <MDBSelect
              label="Year"
              size="sm"
              search
              data={getYearsData(selectedYear2)}
              onValueChange={(data) => {
                if ("value" in data && data.value) {
                  setSelectedYear2(+data.value);
                  setQueryParams2((prev) => {
                    return {
                      ...prev,
                      startDate: data.value + "-01-01",
                      endDate: data.value + "-12-31",
                    };
                  });
                }
              }}
            />
          </div>
          <div className="mx-2">
            <MDBSelect
              label="Invoice Type"
              size="sm"
              search
              data={getInvoiceTypeData(queryParams2.invoiceTypeIds)}
              onValueChange={(data) => {
                if ("value" in data && data.value) {
                  const value = +data.value;
                  setQueryParams2((prev) => {
                    return {
                      ...prev,
                      invoiceTypeIds: value,
                    };
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-sm-12 my-3">
          <div
            className="align-items-center d-flex justify-content-center"
            style={{
              background: "#F7F9FB",
              borderRadius: "1rem",
              minHeight: "18.75rem",
            }}
          >
            {invoiceTypeData.isFetching || isInvoiceTypeListLoading ? (
              <Loader />
            ) : invoiceTypeData.data?.payLoad.length == 0 ? (
              <div>No Data Found</div>
            ) : (
              <InvoiceTypeChart
                containerCostReport={invoiceTypeData.data?.payLoad ?? []}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
