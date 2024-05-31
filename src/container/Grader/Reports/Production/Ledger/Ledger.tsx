import Filters from "shared/Components/Filters";
import React, { useEffect, useRef, useState } from "react";
import { globalVariables } from "helper/globalVariables";
import ProductionReportsSidenav from "components/Reports/ProductionReporsSidenav";
import {
  useLazyGetProductionLedgerQuery,
  useLazyGetProductionTotalWeightsQuery,
} from "redux/features/Settings/Productions/productionItemApiSlice";
import styles from "shared/Components/DataTable/styles.module.css";
import {
  MDBSelect,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import {
  calculateWeights,
  getPaginationRange,
  roundValue,
} from "helper/utility";
import Loader from "shared/Components/Loader/Loader";
import { LeftArrowIcon, RightArrowIcon } from "helper/icons";

export default function LedgerReport() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [getReports, reportsResult] = useLazyGetProductionLedgerQuery();
  const reportsData = reportsResult.data?.payLoad ?? [];
  const [getMonthstotal, monthsTotal] = useLazyGetProductionTotalWeightsQuery();
  // pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalItems = reportsResult.data?.numberOfItems ?? 0;
  const [limit, setLimit] = useState(50);
  const totalPages = Math.ceil(totalItems / limit);
  const pagination = getPaginationRange(currentPage, totalPages, 2);
  const handlePageChange = (page: number, limit: number) => {
    setCurrentPage(page);
    if (limit) setLimit(limit);
    setQueryParams((prev) => {
      return { ...prev, pageNumber: page - 1, pageSize: limit };
    });
  };

  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: 50,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const [months, setMonths] = useState<string[]>([]);

  useEffect(() => {
    getReports(queryParams);
    getMonthstotal(queryParams);
    setMonths(monthsBetweenDates(queryParams.startDate, queryParams.endDate));
  }, [queryParams, getReports]);

  function monthsBetweenDates(startDate: string, endDate: string) {
    function convertToFirstDayOfMonth(dateString: string) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // January is 0 in JavaScript
      const firstDayOfMonth =
        year + "-" + (month < 10 ? "0" : "") + month + "-01";
      return firstDayOfMonth;
    }
    const start = convertToFirstDayOfMonth(startDate);
    let months = [];
    let currentDate = new Date(start);
    const endDateObj = new Date(endDate);
    while (currentDate < endDateObj) {
      const monthName = currentDate.toLocaleString("default", {
        month: "long",
      });
      months.push(monthName);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return months;
  }

  return (
    <>
      <div className="d-lg-flex fs12">
        <div>
          <ProductionReportsSidenav type={8} />
        </div>
        <div className="table-container">
          <Filters
            componentRef={ref}
            printAble={reportsData.length > 0 ?? false}
            exportAble={reportsData?.length > 0 ?? false}
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
                  pageNumber: 0,
                  pageSize: globalVariables?.ItemsPerPageLimit,
                  startDate: queryParams.startDate,
                  endDate: queryParams.endDate,
                });
              } else setQueryParams({ ...queryParams, ...query });
            }}
          />
          <div id="custom-datatable">
            <MDBTable
              small
              responsive
              className="fs12 border-none"
              classNameResponsive={
                reportsData.length === 0 || reportsResult.isLoading
                  ? "overflow-auto"
                  : "overflow-visible"
              }
            >
              <MDBTableHead
                className={styles["header"] + " text-muted"}
                style={{ position: "sticky", top: "0" }}
              >
                <tr>
                  <th
                    className={`text-uppercase border-top border-end`}
                    rowSpan={2}
                  >
                    Item
                  </th>
                  {months.map((m) => {
                    return (
                      <th
                        key={m}
                        className={`text-uppercase border-top border-end`}
                        colSpan={3}
                      >
                        {m}
                      </th>
                    );
                  })}
                </tr>
                <tr>
                  {months.map((m) => {
                    return (
                      <React.Fragment key={m}>
                        <th className={`text-uppercase `}>{"Units"}</th>
                        <th className={`text-uppercase`}>{"Kgs"}</th>
                        <th className={`text-uppercase border-end`}>{"%"}</th>
                      </React.Fragment>
                    );
                  })}
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {reportsResult.isFetching ? (
                  <tr>
                    <td className="border-0">
                      <div
                        className="text-center"
                        style={{
                          margin: "2rem auto",
                        }}
                      >
                        <div
                          className=" d-block text-center my-4"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                          }}
                        >
                          <Loader />
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  reportsData?.map((d, i) => {
                    return (
                      <tr key={d.item + i}>
                        <td className="border-end">
                          <span
                            className={
                              "elipses-1 text-center " + styles["column"]
                            }
                          >
                            {d.item ?? "-"}
                          </span>
                        </td>
                        {months.map((m, j) => {
                          const data = d.production?.find((d) => d.month == m);
                          const currentMonthsData = monthsTotal.data?.find(
                            (md) => md.month == m
                          );
                          const totalWeightKgs = currentMonthsData
                            ? calculateWeights(
                                currentMonthsData?.unitWeight,
                                currentMonthsData?.weightUnitId
                              )[0]
                            : 0;
                          return (
                            <React.Fragment key={m + i + j}>
                              <td>
                                <span
                                  className={
                                    "elipses-1 text-center " + styles["column"]
                                  }
                                >
                                  {data?.noOfCodes ?? 0}
                                </span>
                              </td>
                              <td>
                                <span
                                  className={
                                    "elipses-1 text-center " + styles["column"]
                                  }
                                >
                                  {data
                                    ? calculateWeights(
                                        data.unitWeight,
                                        data.weightUnitId
                                      )[0]
                                    : 0}
                                </span>
                              </td>
                              <td className="border-end">
                                <span
                                  className={
                                    "elipses-1 text-center " + styles["column"]
                                  }
                                >
                                  {data && monthsTotal && totalWeightKgs
                                    ? roundValue(
                                        (calculateWeights(
                                          data.unitWeight,
                                          data.weightUnitId
                                        )[0] /
                                          totalWeightKgs) *
                                          100
                                      )
                                    : 0}
                                </span>
                              </td>
                            </React.Fragment>
                          );
                        })}
                      </tr>
                    );
                  })
                )}
              </MDBTableBody>
            </MDBTable>
          </div>
          <div className="d-flex align-items-center justify-content-between p-2 my-2 rounded-2">
            <div className="d-flex align-items-center">
              <div className="me-2">Rows per page</div>
              <div className="me-5">
                <MDBSelect
                  size="sm"
                  style={{ width: "4rem" }}
                  data={[10, 20, 50, 100, 500, 1000].map((d) => {
                    return {
                      text: d.toString(),
                      value: d,
                      defaultSelected: limit == d,
                    };
                  })}
                  onValueChange={(data) => {
                    if ("value" in data && data.value) {
                      handlePageChange(1, +data.value);
                    }
                  }}
                />
              </div>
              <div>
                {`
            Showing ${currentPage * limit - limit + 1} to ${
                  currentPage === totalPages ? totalItems : currentPage * limit
                } of ${totalItems} results`}
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between flex-nowrap">
              <div>
                <button
                  className={
                    styles["button"] + (currentPage === 1 ? " d-none" : "")
                  }
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1, limit)}
                >
                  <LeftArrowIcon /> Previous
                </button>
              </div>
              <div className="d-flex align-items-center flex-nowrap ">
                {pagination.start.map((pageNum, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(pageNum, limit)}
                    className={styles["inactive"]}
                  >
                    {pageNum}
                  </button>
                ))}
                {pagination.middle.length > 0 &&
                pagination.start.length > 0 &&
                pagination.start[pagination.start.length - 1] + 1 <
                  pagination.middle[0]
                  ? " ... "
                  : null}
                {totalPages > 1 &&
                  pagination.middle.map((pageNum, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(pageNum, limit)}
                      className={
                        pageNum === currentPage
                          ? styles["active"]
                          : styles["inactive"]
                      }
                    >
                      {pageNum}
                    </button>
                  ))}
                {pagination.middle.length > 0 &&
                pagination.end.length > 0 &&
                pagination.middle[pagination.middle.length - 1] + 1 <
                  pagination.end[0]
                  ? " ... "
                  : null}
                {pagination.end.map((pageNum, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(pageNum, limit)}
                    className={styles["inactive"]}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <div>
                <button
                  className={
                    styles["button"] +
                    (currentPage === totalPages || totalPages === 0
                      ? " d-none"
                      : "")
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => handlePageChange(currentPage + 1, limit)}
                >
                  Next <RightArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
