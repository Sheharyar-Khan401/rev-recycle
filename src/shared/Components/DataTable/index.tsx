import React, {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useEffect,
  useState,
} from "react";
import {
  MDBIcon,
  MDBSelect,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import styles from "shared/Components/DataTable/styles.module.css";
import Loader from "shared/Components/Loader/Loader";
import { globalVariables } from "helper/globalVariables";
import { getPaginationRange } from "helper/utility";
import { LeftArrowIcon, RightArrowIcon } from "helper/icons";
import TablePage from "shared/Components/PrintExportTable";

export type column<K> = {
  label: string;
  field: keyof K & string;
  sortable?: boolean;
  showSum?: boolean;
};
interface Props<T> {
  columns: column<T>[];
  fixLastColumn?: boolean;
  rows: T[];
  isLoading?: boolean;
  totalItems?: number;
  setOffset?: (value: number, limit?: number) => void;
  onSort?: (query: Record<string, string>) => void;
  tableTitle?: string;
  rowStyles?: { indexes?: number[]; styles: React.CSSProperties };
}
function DataTable<T>(
  {
    columns,
    rows,
    isLoading,
    totalItems = 0,
    setOffset,
    onSort,
    fixLastColumn,
    tableTitle,
    rowStyles,
  }: Props<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState(globalVariables?.ItemsPerPageLimit);
  const totalPages = Math.ceil(totalItems / limit);
  const pagination = getPaginationRange(currentPage, totalPages, 2);
  const handlePageChange = (page: number, limit: number) => {
    setCurrentPage(page);
    if (limit) setLimit(limit);
    setOffset && setOffset(page - 1, limit);
  };

  useEffect(() => {
    if (onSort) onSort(values);
  }, [values, onSort]);

  const renderSum = () => {
    return shouldRenderSum() ? (
      <tr>
        {columns.map((column) => {
          return (
            <td className="fw-bold" key={column.field}>
              {column.showSum
                ? rows
                    .reduce((total, r) => {
                      const value = r[column.field];
                      if (typeof value === "number") {
                        return total + value;
                      }
                      return 0;
                    }, 0)
                    ?.toFixed(2)
                : ""}
            </td>
          );
        })}
      </tr>
    ) : (
      ""
    );
  };

  const shouldRenderSum = () => {
    return rows.length > 0 && !!columns.find((column) => column.showSum);
  };
  return (
    <div className="w-100 fs12" ref={ref}>
      <div
        id="custom-datatable"
        className={totalPages > 1 || isLoading ? "fixed-length-table" : ""}
      >
        <MDBTable
          small
          responsive
          className="fs12 border-none"
          classNameResponsive={
            rows.length === 0 || isLoading
              ? "overflow-auto"
              : "overflow-visible"
          }
        >
          <MDBTableHead className={styles["header"] + " text-muted"}>
            <tr>
              {columns?.map((column: column<T>, i) => {
                return (
                  <th
                    key={column.field}
                    className={`text-uppercase border-top ${
                      fixLastColumn && i + 1 === columns.length
                        ? styles["header-column-last"]
                        : ""
                    } ${i === 0 ? "ps-0" : ""}`}
                  >
                    {column?.label?.replace(/ /g, "\u00A0")}
                    {column.sortable && (
                      <span
                        className={
                          styles[
                            `sort-icon${
                              !!values[column.field] ? "-active" : ""
                            }`
                          ]
                        }
                        onClick={() => {
                          setValues((v) => {
                            const a = v[column.field];
                            if (a === "asc") {
                              return { ...v, [column.field]: "desc" };
                            }
                            if (a === "desc") {
                              return { ...v, [column.field]: "" };
                            }
                            return { ...v, [column.field]: "asc" };
                          });
                        }}
                      >
                        <MDBIcon
                          fas
                          icon={`arrow-${
                            values[column.field] === "desc" ? "down" : "up"
                          }`}
                        />
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="border-0">
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
                        top: "40%",
                        left: "50%",
                      }}
                    >
                      <Loader />
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {rows?.length > 0 ? (
                  rows?.map((row: T, i) => {
                    return (
                      <tr
                        key={i}
                        style={
                          rowStyles?.indexes
                            ? rowStyles.indexes.includes(i)
                              ? rowStyles?.styles
                              : {}
                            : rowStyles?.styles
                        }
                      >
                        {columns?.map((col: column<T>, j) => {
                          return (
                            <td
                              key={`${col.field}${j}`}
                              className={`${
                                fixLastColumn && j + 1 === columns.length
                                  ? styles["column-last"]
                                  : ""
                              }
                              ${j === 0 ? "ps-0" : ""}`}
                            >
                              <span
                                className={
                                  "elipses-1 text-center " + styles["column"]
                                }
                              >
                                {typeof row[col.field] === "object" ||
                                typeof row[col.field] === "string" ||
                                typeof row[col.field] === "number"
                                  ? (row[col.field] as ReactNode)
                                  : ""}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="border-0">
                      <div
                        className="text-center"
                        style={{
                          margin: "2rem auto",
                        }}
                      >
                        <div
                          className=" d-block text-center my-2"
                          style={{
                            position: "absolute",
                            top: "40%",
                            left: "50%",
                          }}
                        >
                          {globalVariables.NoRecordFound}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                {renderSum()}
              </>
            )}
          </MDBTableBody>
        </MDBTable>
      </div>
      {/* ============================= Pagination =================== */}
      {setOffset && (
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
      )}
      <div>
        <TablePage
          showInfo={tableTitle ? true : false}
          // columns={columns.length > 8 ? columns.slice(0, 8) : columns}
          columns={columns}
          rows={rows}
          title={tableTitle}
        />
      </div>
    </div>
  );
}
const ForwardedDataTable = forwardRef(DataTable) as <T>(
  props: Props<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

export default ForwardedDataTable;
