import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import React, { ReactNode } from "react";
import styles from "shared/Components/FreightDataTable/styles.module.css";
import AddButton from "../AddButton";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";

export type column<K> = {
  label: string;
  field: keyof K & string;
  nestedColumns?: string[];
};

type rowsType = {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
  G: string;
  H: string;
  I: string;
  J: string;
  K: string;
  L: string;
  M: string;
  N: string;
};
interface Props<T> {
  columns: column<T>[];
  rows: rowsType[];
  fixLastColumn?: boolean;
  addRedirectPath?: string;
  importAble?: boolean;
}
function FreightDataTable<T>(props: Props<T>) {
  const { columns, rows, fixLastColumn, addRedirectPath, importAble } = props;
  const navigate = useNavigate();

  return (
    <div className="w-100 fs12">
      <div className="d-flex justify-content-between mt-3">
        {addRedirectPath && (
          <AddButton
            size="sm"
            title="Add New"
            type="solid"
            onClick={() => {
              navigate("#");
            }}
          />
        )}
        {importAble && (
          <CustomButton
            size="sm"
            type="hollow"
            // onClick={() => setImportModalOpen(true)}
            title="Import"
          ></CustomButton>
        )}
      </div>
      <div id="custom-datatable" className={"fixed-length-table mt-3"}>
        <MDBTable
          small
          responsive
          className="fs12 border-none"
          classNameResponsive={
            rows.length === 0 ? "overflow-auto" : "overflow-visible"
          }
        >
          <MDBTableHead className={styles["header"] + " text-muted"}>
            <tr>
              {columns?.map((column: column<T>, i) => {
                if (i === 0 || i === columns.length - 1) {
                  return (
                    <th
                      rowSpan={2}
                      key={column.field}
                      className={`text-uppercase border-top ${
                        fixLastColumn && (i === 0 || i === columns.length - 1)
                          ? styles["header-column-last"]
                          : ""
                      } ${i === 0 ? "ps-0" : ""} text-left`}
                    >
                      {column?.label?.replace(/ /g, "\u00A0")}
                    </th>
                  );
                } else {
                  return (
                    <th
                      colSpan={2}
                      key={column.field}
                      className={`text-uppercase border-top text-center`}
                    >
                      {column?.label?.replace(/ /g, "\u00A0")}
                    </th>
                  );
                }
              })}
            </tr>
            <tr>
              {columns?.map((column: column<T>, i) => {
                if (i !== 0 && i !== columns.length - 1) {
                  if (column.nestedColumns?.length)
                    return (
                      <React.Fragment key={column.field}>
                        <th className={`text-center text-uppercase`}>
                          {"Port"}
                        </th>
                        <th className={`text-center text-uppercase`}>
                          {"Door"}
                        </th>
                      </React.Fragment>
                    );
                } else {
                  return;
                }
              })}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {rows.map((res, i) => {
              return (
                <tr className="">
                  <td>{res.A}</td>
                  <td className="text-center">{res.B}</td>
                  <td className="text-center">{res.C}</td>
                  <td className="text-center">{res.D}</td>
                  <td className="text-center">{res.E}</td>
                  <td className="text-center">{res.F}</td>
                  <td className="text-center">{res.G}</td>
                  <td className="text-center">{res.H}</td>
                  <td className="text-center">{res.I}</td>
                  <td className="text-center">{res.J}</td>
                  <td className="text-center">{res.K}</td>
                  <td className="text-center">{res.L}</td>
                  <td className="text-center">{res.M}</td>
                  <td>{res.N}</td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
}

export default FreightDataTable;
