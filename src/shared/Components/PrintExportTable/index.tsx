import React, { ForwardedRef, ReactNode, forwardRef } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import styles from "shared/Components/PrintExportTable/styles.module.css";
import * as XLSX from "xlsx";

export type column<K> = {
  label: string;
  field: keyof K & string;
  sortable?: boolean;
  showSum?: boolean;
};
interface TablePageProps<T> {
  title?: string;
  columns: column<T>[];
  rows: T[];
  showInfo?: boolean
}

function ImportExportTablePage<T>(
  { title, rows, columns, showInfo }: TablePageProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  function handleExportButtonClick() {
    if (rows && columns && rows.length > 0 && columns.length > 0) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);

      const headerCols: XLSX.ColInfo[] = columns.map((col, index) => ({
        wch: col.label.length + 2,
        hidden: false,
      }));
      ws["!cols"] = headerCols;

      const headerRow: XLSX.CellObject[] = columns.map((col) => ({
        v: col.label,
        t: "s",
      }));

      XLSX.utils.sheet_add_aoa(ws, [headerRow], { origin: "A1" });
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "revRecycle-exportedData" + ".xlsx");
    }
  }

  const renderSum = () => {
    return shouldRenderSum() ? (
      <tr>
        {columns.map((column) => {
          return (
            <td className={"fw-bold "+ styles["table-d"]}  style={{fontSize:'10px', maxWidth:'5rem'}} key={column.field}>
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

  const getPageMargins = () => {
    return `@page { 
      margin: ${"2rem"} ${0} ${"3rem"} ${0} !important; 
    }`;
  };

  return (
    <div className="d-none d-print-block fs12" ref={ref}>
      {showInfo && <style>{getPageMargins()}</style>}
      <div id="printable-table" className="px-3">
        {title && (
          <div className="text-center">
            <h5>{title}</h5>
          </div>
        )}
        <div style={{ overflowX: "hidden" }}>
          <MDBTable className="table">
            <MDBTableHead className={"text-muted"}>
              <tr>
                {columns.length > 0 ? (
                  columns?.map((column: column<T>, i) => {
                    return (
                      <th
                        key={column.field}
                        className={`text-uppercase text-wrap`}
                        style={{
                          padding: "2px 0px 2px 5px",
                          color: "#757575",
                          borderBottom: "3px solid #D3D3D3",
                          fontSize: "9.5px",
                          textAlign: "start",
                        }}
                      >
                        {column?.label?.replace(/ /g, "\u00A0")}
                      </th>
                    );
                  })
                ) : (
                  <th>hi</th>
                )}
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <>
                {rows?.map((row, i) => (
                  <tr key={i} className={styles["table-row"]}>
                    {columns.map((column, j) => (
                      <td key={j} className={"text-wrap " + styles["table-d"]}>
                        <span className={styles["column"]}>
                          {typeof (row as Record<string, T>)[column.field] ===
                            "object" ||
                          typeof (row as Record<string, T>)[column.field] ===
                            "string" ||
                          typeof (row as Record<string, T>)[column.field] ===
                            "number"
                            ? ((row as Record<string, T>)[
                                column.field
                              ] as ReactNode)
                            : ""}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
                {renderSum()}
              </>
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
      <button className="d-none" id="export-data-btn" onClick={handleExportButtonClick} />
    </div>
  );
}

const ForwardedDataTable = forwardRef(ImportExportTablePage) as <T>(
  props: TablePageProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

export default ForwardedDataTable;
