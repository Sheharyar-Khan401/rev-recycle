import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import Loader from "shared/Components/Loader/Loader";
import styles from "shared/Components/EditableDatatable/styles.module.css";

import {
  MDBCheckbox,
  MDBDatepicker,
  MDBFile,
  MDBIcon,
  MDBInput,
  MDBSelect,
  MDBSpinner,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTextArea,
} from "mdb-react-ui-kit";
import ActionDialog from "shared/Components/ActionDialog/ActionDialog";
import { globalVariables } from "helper/globalVariables";
import CustomButton from "../CustomButton";
import AddButton from "../AddButton";
export type column<
  T extends string,
  K extends Record<string, number | string | boolean | File>
> =
  | {
      label: string;
      field: string;
      sort?: boolean;
      disabled?: boolean;
      nullable?: boolean;
      uneditable?: boolean;
      showSum?: boolean;
      mutateFieldsCallback?: (
        value: string | number,
        row: row<T, K>
      ) => Record<string, number> | {};
      inputType: "number";
      min?: number;
      max?: number;
    }
  | {
      label: string;
      field: string;
      sort?: boolean;
      disabled?: boolean;
      nullable?: boolean;
      uneditable?: boolean;
      mutateFieldsCallback?: (
        value: string | boolean,
        row: row<T, K>
      ) => Record<string, string | boolean> | {};
      inputType: "text" | "textarea" | "checkbox" | "date";
    }
  | {
      label: string;
      field: string;
      fileNameField?: string;
      sort?: boolean;
      disabled?: boolean;
      nullable?: boolean;
      uneditable?: boolean;
      mutateFieldsCallback?: (
        value: File | null,
        row: row<T, K>
      ) => Record<string, File | null> | {};
      inputType: "file";
    }
  | {
      label: string;
      field: string;
      sort?: boolean;
      disabled?: boolean;
      nullable?: boolean;
      uneditable?: boolean;
      mutateFieldsCallback?: (
        value: string | number,
        row: row<T, K>
      ) => Record<string, number | string | boolean> | {};
      inputType: "select";
      options: { text: string; value: number }[];
      unselectable?: boolean;
      multiple?: boolean;
      children?: React.ReactNode;
    };

type row<
  T extends string,
  K extends Record<string, number | string | boolean | File>
> = {
  [X in T]: number;
} & K;

interface Props<
  T extends string,
  K extends Record<string, number | string | boolean | File>
> {
  identifier: T;
  rows: row<T, K>[];
  columns: column<T, K>[];
  isLoading?: boolean;
  submitLoading?: boolean;
  setRows: (rows: row<T, K>[]) => void;
  onSubmit?: () => void;
  showSerialNumbers?: boolean;
  defaultEditable?: boolean;
  showAddButton?: boolean;
  showDeleteButton?: boolean;
  showEditButton?: boolean;
  addText?: string;
  children?: JSX.Element;
  actionBtnTitle?: string;
  actionBtnHandler?: () => void;
}
function EditableDataTable<
  T extends string,
  K extends Record<string, number | string | boolean | File>
>(
  {
    columns,
    rows,
    isLoading = false,
    submitLoading = false,
    setRows,
    onSubmit,
    defaultEditable,
    identifier,
    showSerialNumbers = false,
    showAddButton = true,
    showDeleteButton = true,
    showEditButton = true,
    addText,
    children,
    actionBtnHandler,
    actionBtnTitle,
  }: Props<T, K>,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const [submitting, setSubmitting] = useState(false);
  const [editable, setEditable] = useState(false);
  const [rowToAdd, setRowToAdd] = useState<row<T, K> | null>(null);
  const [rowToAddSubmitted, setRowToAddSubmitted] = useState(false);
  const [rowToEdit, setRowToEdit] = useState<row<T, K> | null>(null);
  const [rowToEditSubmitted, setRowToEditSubmitted] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<row<T, K> | null>(null);
  const [rowToAddErrors, setRowToAddErrors] = useState<string[]>([]);
  const [rowToEditErrors, setRowToEditErrors] = useState<string[]>([]);
  const addRowBtnRef = useRef<HTMLSpanElement>(null);
  const editRowBtnRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!editable) {
      setRowToEdit(null);
      setRowToAdd(null);
    }
  }, [editable]);

  useEffect(() => {
    validateRowToAdd();
    validateRowToEdit();
  }, [rowToAdd, rowToEdit]);

  useEffect(() => {
    if (typeof defaultEditable === "boolean") {
      setEditable(defaultEditable);
    }
  }, [defaultEditable]);

  useEffect(() => {
    if (submitLoading) {
      setSubmitting(true);
    } else if (submitting && typeof defaultEditable === "undefined")
      setEditable(false);
  }, [submitLoading, submitting, defaultEditable]);

  function validateRowToAdd() {
    if (rowToAdd) {
      let errs: string[] = [];

      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        if (
          !column.disabled &&
          !column.nullable &&
          typeof rowToAdd[column.field] === "undefined"
        ) {
          errs = [...errs, column.field];
        }
      }
      setRowToAddErrors([...errs]);
    } else {
      setRowToAddErrors([]);
    }
  }
  function validateRowToEdit() {
    if (rowToEdit) {
      let errs: string[] = [];

      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        if (
          !column.disabled &&
          !column.nullable &&
          typeof rowToEdit[column.field] === "undefined"
        ) {
          errs = [...errs, column.field];
        }
      }
      setRowToEditErrors([...errs]);
    } else {
      setRowToEditErrors([]);
    }
  }

  const renderSum = () => {
    return shouldRenderSum() ? (
      <tr className="border-bottom">
        {showSerialNumbers && <td></td>}
        {columns.map((column) => {
          return (
            <td className="fw-bold" key={column.field}>
              {column.inputType === "number" && column.showSum
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
        <td></td>
      </tr>
    ) : (
      ""
    );
  };

  const showAddRow = () => {
    return !!rowToAdd ? (
      <tr>
        {showSerialNumbers && <td></td>}

        {columns.map((column) => {
          const value = rowToAdd[column.field];

          return (
            <td key={column.field} style={{ minWidth: "10rem" }}>
              {column.inputType === "text" ? (
                <MDBInput
                  size="sm"
                  className={
                    rowToAddSubmitted && rowToAddErrors.includes(column.field)
                      ? "is-invalid"
                      : ""
                  }
                  type={column.inputType}
                  value={value.toString()}
                  onChange={(e) => {
                    let newRowToAdd: row<T, K> = {
                      ...rowToAdd,
                      [column.field]: e.target.value,
                    };
                    if (column.mutateFieldsCallback) {
                      const values = column.mutateFieldsCallback(
                        e.target.value,
                        rowToAdd
                      );
                      newRowToAdd = {
                        ...newRowToAdd,
                        ...values,
                      };
                    }
                    setRowToAdd(newRowToAdd);
                  }}
                  disabled={column.disabled}
                />
              ) : column.inputType === "number" ? (
                <MDBInput
                  size="sm"
                  className={
                    rowToAddSubmitted && rowToAddErrors.includes(column.field)
                      ? "is-invalid"
                      : ""
                  }
                  type={column.inputType}
                  value={typeof value === "number" ? value : ""}
                  onChange={(e) => {
                    if (
                      (typeof column.min === "number" &&
                        +e.target.value < column.min) ||
                      (typeof column.max === "number" &&
                        +e.target.value > column.max)
                    )
                      return;
                    try {
                      let newRowToAdd: row<T, K> = {
                        ...rowToAdd,
                        [column.field]: +e.target.value,
                      };
                      if (column.mutateFieldsCallback) {
                        const values = column.mutateFieldsCallback(
                          e.target.value,
                          rowToAdd
                        );
                        newRowToAdd = {
                          ...newRowToAdd,
                          ...values,
                        };
                      }
                      setRowToAdd(newRowToAdd);
                    } catch (error) {}
                  }}
                  disabled={column.disabled}
                />
              ) : column.inputType === "textarea" ? (
                <MDBTextArea
                  size="sm"
                  className={
                    rowToAddSubmitted && rowToAddErrors.includes(column.field)
                      ? "is-invalid"
                      : ""
                  }
                  value={value?.toString()}
                  onChange={(e) => {
                    let newRowToAdd: row<T, K> = {
                      ...rowToAdd,
                      [column.field]: e.target.value,
                    };
                    if (column.mutateFieldsCallback) {
                      const values = column.mutateFieldsCallback(
                        e.target.value,
                        rowToAdd
                      );
                      newRowToAdd = {
                        ...newRowToAdd,
                        ...values,
                      };
                    }
                    setRowToAdd(newRowToAdd);
                  }}
                  disabled={column.disabled}
                />
              ) : column.inputType === "select" ? (
                <MDBSelect
                  size="sm"
                  search
                  multiple={column.multiple}
                  inputClassName={
                    rowToAddSubmitted && rowToAddErrors.includes(column.field)
                      ? "is-invalid"
                      : ""
                  }
                  data={column.options.map((option) => {
                    return {
                      ...option,
                      defaultSelected:
                        column.multiple && typeof value == "string"
                          ? value.split(",").includes(option.value.toString())
                          : option.value === value,
                    };
                  })}
                  onValueChange={(data) => {
                    let newValue: string | number | undefined;
                    if ("value" in data) newValue = data?.value;
                    else if ("length" in data) {
                      newValue = data.map((d) => d.value).join(",");
                    }

                    let newRowToAdd: row<T, K> = {
                      ...rowToAdd,
                      [column.field]: newValue,
                    };
                    if (column.mutateFieldsCallback) {
                      const values = column.mutateFieldsCallback(
                        newValue ?? "",
                        rowToAdd
                      );

                      newRowToAdd = {
                        ...newRowToAdd,
                        ...values,
                      };
                    }
                    setRowToAdd(newRowToAdd);
                  }}
                  clearBtn={column.unselectable}
                  disabled={column.disabled}
                  preventFirstSelection
                >
                  {column.children}
                </MDBSelect>
              ) : column.inputType === "checkbox" ? (
                <MDBCheckbox
                  checked={!!value}
                  onChange={(e) => {
                    let newRowToAdd: row<T, K> = {
                      ...rowToAdd,
                      [column.field]: e.target.checked,
                    };
                    if (column.mutateFieldsCallback) {
                      const values = column.mutateFieldsCallback(
                        e.target.checked,
                        rowToAdd
                      );
                      newRowToAdd = {
                        ...newRowToAdd,
                        ...values,
                      };
                    }
                    setRowToAdd(newRowToAdd);
                  }}
                  disabled={column.disabled}
                />
              ) : column.inputType === "date" ? (
                <MDBDatepicker
                  size="sm"
                  value={value as string}
                  format="yyyy-mm-dd"
                  inline
                  onChange={(date) => {
                    let newRowToAdd: row<T, K> = {
                      ...rowToAdd,
                      [column.field]: date,
                    };
                    if (column.mutateFieldsCallback) {
                      const values = column.mutateFieldsCallback(
                        date,
                        rowToAdd
                      );
                      newRowToAdd = {
                        ...newRowToAdd,
                        ...values,
                      };
                    }
                    setRowToAdd(newRowToAdd);
                  }}
                  disabled={column.disabled}
                />
              ) : column.inputType === "file" ? (
                <MDBFile
                  size="sm"
                  multiple={false}
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    let newRowToAdd: row<T, K> = {
                      ...rowToAdd,
                      [column.field]: file,
                    };
                    if (column.mutateFieldsCallback) {
                      const values = column.mutateFieldsCallback(
                        file,
                        rowToAdd
                      );
                      newRowToAdd = {
                        ...newRowToAdd,
                        ...values,
                      };
                    }
                    setRowToAdd(newRowToAdd);
                  }}
                  disabled={column.disabled}
                />
              ) : (
                ""
              )}
              {rowToAddSubmitted && rowToAddErrors.includes(column.field) && (
                <div className={styles["validation"]}>
                  {column.label} is required
                </div>
              )}
            </td>
          );
        })}
        <td>
          <div className="text-nowrap">
            <span
              ref={addRowBtnRef}
              role={"button"}
              className={"mx-2"}
              onClick={() => {
                if (rowToAddErrors.length > 0) {
                  setRowToAddSubmitted(true);
                } else {
                  // Duplicate identifiers check
                  if (
                    !!rows.find(
                      (row) => row[identifier] === rowToAdd[identifier]
                    )
                  ) {
                    return;
                  }
                  setRows([rowToAdd, ...rows]);
                  setRowToAdd(null);
                  setRowToAddSubmitted(false);
                }
              }}
            >
              <MDBIcon fas icon="check" />
            </span>
            <span
              role="button"
              className="mx-2"
              onClick={() => {
                setRowToAdd(null);
                setRowToAddSubmitted(false);
              }}
            >
              <MDBIcon fas icon="times" />{" "}
            </span>
          </div>
        </td>
      </tr>
    ) : (
      ""
    );
  };

  const showEditRow = (column: column<T, K>, row: row<T, K>) => {
    const value = rowToEdit ? rowToEdit[column.field] : "";
    return !!rowToEdit &&
      !rowToAdd &&
      rowToEdit[identifier] === row[identifier] ? (
      <>
        {column.inputType === "text" ? (
          <MDBInput
            size="sm"
            className={
              rowToEditSubmitted && rowToEditErrors.includes(column.field)
                ? "is-invalid"
                : ""
            }
            type={column.inputType}
            value={value?.toString()}
            onChange={(e) => {
              let newRowToEdit: row<T, K> = {
                ...rowToEdit,
                [column.field]: e.target.value,
              };
              if (column.mutateFieldsCallback) {
                const values = column.mutateFieldsCallback(
                  e.target.value,
                  rowToEdit
                );
                newRowToEdit = {
                  ...newRowToEdit,
                  ...values,
                };
              }
              setRowToEdit(newRowToEdit);
            }}
            disabled={!editable || column.disabled || column.uneditable}
          />
        ) : column.inputType === "number" ? (
          <MDBInput
            size="sm"
            className={
              rowToEditSubmitted && rowToEditErrors.includes(column.field)
                ? "is-invalid"
                : ""
            }
            type={column.inputType}
            value={typeof value === "number" ? value : ""}
            onChange={(e) => {
              if (
                (typeof column.min === "number" &&
                  +e.target.value < column.min) ||
                (typeof column.max === "number" && +e.target.value > column.max)
              )
                return;
              try {
                let newRowToEdit: row<T, K> = {
                  ...rowToEdit,
                  [column.field]: +e.target.value,
                };
                if (column.mutateFieldsCallback) {
                  const values = column.mutateFieldsCallback(
                    e.target.value,
                    rowToEdit
                  );
                  newRowToEdit = {
                    ...newRowToEdit,
                    ...values,
                  };
                }
                setRowToEdit(newRowToEdit);
              } catch (error) {}
            }}
            disabled={!editable || column.disabled || column.uneditable}
          />
        ) : column.inputType === "textarea" ? (
          <MDBTextArea
            size="sm"
            className={
              rowToEditSubmitted && rowToEditErrors.includes(column.field)
                ? "is-invalid"
                : ""
            }
            value={rowToEdit[column.field]?.toString()}
            onChange={(e) => {
              let newRowToEdit: row<T, K> = {
                ...rowToEdit,
                [column.field]: e.target.value,
              };
              if (column.mutateFieldsCallback) {
                const values = column.mutateFieldsCallback(
                  e.target.value,
                  rowToEdit
                );
                newRowToEdit = {
                  ...newRowToEdit,
                  ...values,
                };
              }
              setRowToEdit(newRowToEdit);
            }}
            disabled={!editable || column.disabled || column.uneditable}
          />
        ) : column.inputType === "select" ? (
          <MDBSelect
            size="sm"
            search
            multiple={column.multiple}
            inputClassName={
              rowToEditSubmitted && rowToEditErrors.includes(column.field)
                ? "is-invalid"
                : ""
            }
            data={column.options.map((option) => {
              return {
                ...option,
                defaultSelected:
                  column.multiple && typeof value == "string"
                    ? value.split(",").includes(option.value.toString())
                    : option.value === value,
              };
            })}
            onValueChange={(data) => {
              let newValue: string | number | undefined;
              if ("value" in data) newValue = data?.value;
              else if ("length" in data) {
                newValue = data.map((d) => d.value).join(",");
              }
              let newRowToEdit: row<T, K> = {
                ...rowToEdit,
                [column.field]: newValue,
              };
              if (column.mutateFieldsCallback) {
                const values = column.mutateFieldsCallback(
                  newValue ?? "",
                  rowToEdit
                );
                newRowToEdit = {
                  ...newRowToEdit,
                  ...values,
                };
              }

              setRowToEdit(newRowToEdit);
            }}
            disabled={!editable || column.disabled || column.uneditable}
            clearBtn={column.unselectable}
            preventFirstSelection
          >
            {column.children}
          </MDBSelect>
        ) : column.inputType === "checkbox" ? (
          <MDBCheckbox
            checked={!!value}
            onChange={(e) => {
              let newRowToEdit: row<T, K> = {
                ...rowToEdit,
                [column.field]: e.target.checked,
              };
              if (column.mutateFieldsCallback) {
                const values = column.mutateFieldsCallback(
                  e.target.checked,
                  rowToEdit
                );
                newRowToEdit = {
                  ...newRowToEdit,
                  ...values,
                };
              }
              setRowToEdit(newRowToEdit);
            }}
            disabled={!editable || column.disabled || column.uneditable}
          />
        ) : column.inputType === "date" ? (
          <MDBDatepicker
            size="sm"
            value={value as string}
            format="yyyy-mm-dd"
            inline
            onChange={(date) => {
              let newRowToEdit: row<T, K> = {
                ...rowToEdit,
                [column.field]: date,
              };
              if (column.mutateFieldsCallback) {
                const values = column.mutateFieldsCallback(date, rowToEdit);
                newRowToEdit = {
                  ...newRowToEdit,
                  ...values,
                };
              }
              setRowToEdit(newRowToEdit);
            }}
            disabled={!editable || column.disabled || column.uneditable}
          />
        ) : column.inputType === "file" ? (
          <MDBFile
            size="sm"
            multiple={false}
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              let newRowToEdit: row<T, K> = {
                ...rowToEdit,
                [column.field]: file,
              };
              if (column.mutateFieldsCallback) {
                const values = column.mutateFieldsCallback(file, rowToEdit);
                newRowToEdit = {
                  ...newRowToEdit,
                  ...values,
                };
              }
              setRowToEdit(newRowToEdit);
            }}
            disabled={!editable || column.disabled || column.uneditable}
          />
        ) : (
          ""
        )}
        {rowToEditSubmitted && rowToEditErrors.includes(column.field) && (
          <div className={styles["validation"]}>{column.label} is required</div>
        )}
      </>
    ) : null;
  };

  const shouldRenderSum = () => {
    return (
      rows.length > 1 &&
      !!columns.find(
        (column) => column.inputType === "number" && column.showSum
      )
    );
  };
  const handleKeyDownEvent:
    | React.KeyboardEventHandler<HTMLDivElement>
    | undefined = (e) => {
    if (e.key === "Enter") {
      if (addRowBtnRef?.current) addRowBtnRef.current.click();
      if (editRowBtnRef?.current) editRowBtnRef.current.click();
    }
  };

  return (
    <div className="w-100 my-2" onKeyDown={handleKeyDownEvent}>
      <div className="d-flex justify-content-between mb-4">
        <div className="d-flex align-items-center">
          {showAddButton && (
            <AddButton
              size="sm"
              type="solid"
              onClick={() => {
                let defaultRow: row<T, K> = {
                  [identifier]: Math.floor(Math.random() * -9999),
                } as row<T, K>;
                columns.map((col) => {
                  if (
                    col.inputType === "text" ||
                    col.inputType === "textarea"
                  ) {
                    defaultRow = { ...defaultRow, [col.field]: "" };
                  } else if (col.inputType === "checkbox") {
                    defaultRow = { ...defaultRow, [col.field]: false };
                  }
                });
                !rowToAdd && setRowToAdd(defaultRow);
                setRowToEdit(null);
              }}
              disabled={
                typeof defaultEditable === "undefined"
                  ? !editable
                  : !defaultEditable
              }
              title={addText ?? "Add New"}
            />
          )}
          {children}
        </div>
        <div>
          {typeof defaultEditable === "undefined" ? (
            editable ? (
              <>
                <div className="d-flex">
                  <CustomButton
                    size="sm"
                    type="hollow"
                    className={"mx-2"}
                    onClick={() => {
                      setEditable(false);
                    }}
                    title="Cancel"
                  />

                  <CustomButton
                    size="sm"
                    type="solid"
                    className={"ms-2 px-2 d-flex align-items-center"}
                    disabled={submitLoading}
                    onClick={onSubmit}
                    title={submitLoading ? "Saving..." : "Save"}
                  >
                    {submitLoading && (
                      <MDBSpinner
                        size="sm"
                        role="status"
                        tag="span"
                        className="me-2"
                      />
                    )}
                  </CustomButton>
                </div>
              </>
            ) : (
              <div className="d-flex">
                <CustomButton
                  size="sm"
                  type="hollow"
                  onClick={() => {
                    setEditable(true);
                  }}
                  title="Edit"
                />
                {actionBtnHandler && actionBtnTitle && (
                  <div className="ms-3">
                    <CustomButton
                      title="Import"
                      type="hollow"
                      size="sm"
                      onClick={() => actionBtnHandler()}
                    />
                  </div>
                )}
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <div id="custom-editabledatatable" ref={ref}>
        <MDBTable
          responsive
          small
          className="fs12"
          classNameResponsive={
            rows.length === 0 || isLoading
              ? "overflow-auto"
              : "overflow-visible"
          }
        >
          <MDBTableHead className={`${styles["header"]}  text-muted`}>
            <tr>
              {showSerialNumbers && (
                <th
                  scope="col"
                  className={`text-uppercase border-top ${styles["header-column"]} ps-0 `}
                >
                  Sr.
                </th>
              )}
              {columns.map((column, i) => {
                return (
                  <th
                    key={column.field}
                    scope="col"
                    className={`text-uppercase border-top ${
                      styles["header-column"]
                    } ${i === 0 && !showSerialNumbers ? "ps-0" : ""}`}
                  >
                    {column.label}
                  </th>
                );
              })}

              <th
                scope="col"
                className={`text-uppercase border-top ${styles["header-column"]}`}
              >
                Action
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length}>
                  <div style={{ margin: "20rem auto" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "48%",
                        left: "48%",
                      }}
                    >
                      <Loader />
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {showAddRow()}
                {rows.length > 0
                  ? rows.map((row, i) => {
                      return (
                        <tr key={row[identifier]}>
                          {showSerialNumbers && (
                            <td className="ps-0">{i + 1}.</td>
                          )}
                          {columns.map((column, j) => {
                            return (
                              <td
                                key={row[identifier] + column.field}
                                className={
                                  j === 0 && !showSerialNumbers ? "ps-0" : ""
                                }
                                style={{
                                  minWidth: !!rowToEdit ? "10rem" : "inherit",
                                }}
                              >
                                {showEditRow(column, row) ? (
                                  showEditRow(column, row)
                                ) : column.inputType === "select" ? (
                                  <span
                                    className={"elipses-1 " + styles["column"]}
                                  >
                                    {column.multiple && row[column.field]
                                      ? column.options
                                          .filter((col) =>
                                            row[column.field]
                                              .toString()
                                              .split(",")
                                              .includes(col.value.toString())
                                          )
                                          .map((o) => o.text)
                                          .join(", ")
                                      : column.options.find(
                                          (col) =>
                                            col.value === row[column.field]
                                        )?.text}
                                  </span>
                                ) : column.inputType === "file" ? (
                                  column.fileNameField &&
                                  row[column.fileNameField] ? (
                                    <a
                                      href={row[
                                        column.fileNameField
                                      ].toString()}
                                    >
                                      Download
                                    </a>
                                  ) : (
                                    (row[column.field] as File).name
                                  )
                                ) : column.inputType === "checkbox" ? (
                                  row[column.field] ? (
                                    "Yes"
                                  ) : (
                                    "No"
                                  )
                                ) : (
                                  <span
                                    className={"elipses-1 " + styles["column"]}
                                  >
                                    {row[column.field]?.toString()}
                                  </span>
                                )}
                              </td>
                            );
                          })}
                          <td className={styles["actions-column"]}>
                            {!!rowToEdit &&
                            !rowToAdd &&
                            rowToEdit[identifier] === row[identifier] ? (
                              <>
                                <span
                                  ref={editRowBtnRef}
                                  className="mx-2"
                                  role="button"
                                  onClick={() => {
                                    if (rowToEditErrors.length > 0) {
                                      setRowToEditSubmitted(true);
                                    } else {
                                      setRows(
                                        rows.map((row) => {
                                          return row[identifier] ===
                                            rowToEdit[identifier]
                                            ? rowToEdit
                                            : row;
                                        })
                                      );
                                      setRowToEdit(null);
                                      setRowToEditSubmitted(false);
                                    }
                                  }}
                                >
                                  <MDBIcon fas icon="check" />
                                </span>
                                <span
                                  className="mx-2"
                                  role="button"
                                  onClick={() => {
                                    setRowToEdit(null);
                                    setRowToEditSubmitted(false);
                                  }}
                                >
                                  <MDBIcon fas icon="times" />
                                </span>
                              </>
                            ) : (
                              <>
                                {showEditButton && (
                                  <span
                                    className={`${
                                      !!editable && !rowToAdd
                                        ? ""
                                        : "text-muted"
                                    } mx-2`}
                                    role={
                                      !!editable && !rowToAdd ? "button" : ""
                                    }
                                    onClick={() =>
                                      !!editable &&
                                      !rowToAdd &&
                                      setRowToEdit(row)
                                    }
                                  >
                                    <MDBIcon fas icon="edit" />
                                  </span>
                                )}
                                {showDeleteButton && (
                                  <span
                                    className={`${
                                      editable && !rowToAdd ? "" : "text-muted"
                                    } mx-2`}
                                    role={
                                      !!editable && !rowToAdd ? "button" : ""
                                    }
                                    onClick={() => {
                                      editable &&
                                        !rowToAdd &&
                                        setRowToDelete(row);
                                    }}
                                  >
                                    <MDBIcon far icon="trash-alt" />
                                  </span>
                                )}
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : !rowToAdd && (
                      <tr>
                        <td
                          colSpan={
                            columns.length + 1 + (showSerialNumbers ? 1 : 0)
                          }
                          className="border-0"
                        >
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
                                top: "50%",
                                left: "45%",
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
      <ActionDialog
        isOpen={!!rowToDelete}
        onClose={() => setRowToDelete(null)}
        onOk={() => {
          if (rowToDelete) {
            setRows(
              rows.filter((d) => d[identifier] !== rowToDelete[identifier])
            );
            setRowToDelete(null);
          }
        }}
        title="Delete Alert"
        message={"Are you sure you want to delete this record?"}
      />
    </div>
  );
}
const ForwardedEditableDataTable = forwardRef(EditableDataTable) as <
  T extends string,
  K extends Record<string, number | string | boolean | File>
>(
  props: Props<T, K> & { ref?: ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

export default ForwardedEditableDataTable;
