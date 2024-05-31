import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import {
  MDBCheckbox,
  MDBDatepicker,
  MDBInput,
  MDBSelect,
} from "mdb-react-ui-kit";
import styles from "shared/Components/Filters/styles.module.css";
import MDBSearchInput from "shared/Components/MDBSearchInput";
import { FilterIcon } from "helper/icons";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import CustomButton from "../CustomButton";
import AddButton from "../AddButton";
import RangePicker from "../RangePicker";
import { format } from "date-fns";

type Filter =
  | {
      label: string;
      name: string;
      inputType: "text" | "date" | "boolean";
    }
  | {
      label: string;
      name: string;
      inputType: "select" | "multiselect";
      options: { text: string; value: number }[];
    };

type Query = Record<string, number | string | boolean | number[]>;
interface Props<T> {
  componentRef?: RefObject<HTMLDivElement | null>;
  addRedirectPath?: string;
  filters?: Filter[];
  defaultFilters?: Query;
  Dates?: Query;
  onSearch?: (query: string) => void;
  onSubmit?: (query: Query) => void;
  children?: ReactNode;
  printAble: boolean;
  exportAble: boolean;
  onDateChange?: (startDate: string, endDate: string) => void;
}

export default function Filters<T>({
  componentRef,
  addRedirectPath,
  filters,
  defaultFilters,
  onSearch,
  onSubmit,
  children,
  printAble,
  exportAble,
  onDateChange,
  Dates,
}: Props<T>) {
  const [values, setValues] = useState<
    Record<string, number | string | boolean | number[]>
  >({});
  const ref = useRef<HTMLDivElement | null>(null);
  const printableTableRef =
    (componentRef?.current?.ownerDocument.getElementById(
      "printable-table"
    ) as HTMLDivElement) ?? null;

  const navigate = useNavigate();
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);

  function resetValues() {
    if (filters && filters.length > 0) {
      setValues({});
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current) {
        if (
          !ref?.current?.contains(event.target as Node) &&
          (event.target as HTMLElement)?.className?.includes &&
          !(event.target as HTMLElement)?.className?.includes(
            "select-option"
          ) &&
          !(event.target as HTMLElement)?.className?.includes("datepicker") &&
          !(
            (event.target as HTMLElement)?.parentNode as HTMLElement
          ).className?.includes("select-option") &&
          !(
            (event.target as HTMLElement)?.parentNode as HTMLElement
          ).className?.includes("input-group")
        )
          ref.current.style.display = "none";
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (defaultFilters) {
      setValues(defaultFilters);
      applyFilters(defaultFilters);
    }
  }, [defaultFilters]);

  function handleExportButtonClick() {
    componentRef?.current?.ownerDocument
      .getElementById("export-data-btn")
      ?.click();
  }
  const applyFilters = (values: Query) => {
    onSubmit && onSubmit(values);
    setAppliedFiltersCount(Object.keys(values).length);
    if (ref.current) ref.current.style.display = "none";
  };

  return (
    <div className="d-flex justify-content-between mt-2 mb-4">
      <div className="d-flex">
        {addRedirectPath && (
          <AddButton
            size="sm"
            title="Add New"
            type="solid"
            onClick={() => {
              navigate(addRedirectPath);
            }}
          />
        )}
        {children}

        <>
          {filters && filters.length > 0 && (
            <div className={styles["dropdown"]}>
              <CustomButton
                size="sm"
                type="hollow"
                className={`${addRedirectPath ? "ms-3" : ""} me-3 px-2`}
                onClick={() => {
                  if (ref.current) {
                    ref.current.style.display = "inherit";
                  }
                }}
              >
                <FilterIcon />
                <span className={styles["button-content"]}>Filters</span>
                {appliedFiltersCount > 0 && (
                  <span className={styles["badge"]}>{appliedFiltersCount}</span>
                )}
              </CustomButton>
              <div ref={ref} className={styles["dropdown-content"]}>
                <div className={styles["menu-container"]}>
                  <div className="d-flex justify-content-between mb-2">
                    <div className="fs-6 text-black">Filters</div>
                    {appliedFiltersCount > 0 && (
                      <div
                        className="d-flex align-items-center text-primary"
                        role="button"
                        onClick={() => {
                          if (ref.current) {
                            ref.current.style.display = "none";
                          }
                          resetValues();
                          onSubmit && onSubmit({});
                          setAppliedFiltersCount(0);
                        }}
                      >
                        <div className="ms-1" style={{ fontSize: "13px" }}>
                          Clear Filters
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles["filters-container"]}>
                    {filters?.map((filter, i) => {
                      return (
                        <div key={i} className="mb-2">
                          <div className={styles["label"]}>{filter.label}</div>
                          {filter?.inputType === "select" ? (
                            <MDBSelect
                              size="sm"
                              search
                              clearBtn
                              data={filter.options.map((option) => {
                                return {
                                  ...option,
                                  defaultSelected: values[filter.name]
                                    ? option.value === values[filter.name]
                                    : false,
                                };
                              })}
                              onValueChange={(data) => {
                                if ("value" in data && data.value) {
                                  setValues({
                                    ...values,
                                    [filter.name]: data.value,
                                  });
                                } else {
                                  delete values[filter.name];
                                  setValues({
                                    ...values,
                                  });
                                }
                              }}
                              preventFirstSelection
                            />
                          ) : filter?.inputType === "multiselect" ? (
                            <MDBSelect
                              size="sm"
                              selectAll={false}
                              search
                              multiple
                              displayedLabels={2}
                              data={filter.options.map((option) => {
                                let defaultSelected = false;
                                let value = values[filter.name];
                                if (
                                  typeof value === "object" &&
                                  "length" in value
                                ) {
                                  defaultSelected = !!value.find(
                                    (v) => v === option.value
                                  );
                                }
                                return {
                                  ...option,
                                  defaultSelected,
                                };
                              })}
                              onValueChange={(data) => {
                                if ("length" in data) {
                                  if (data.length > 0)
                                    setValues({
                                      ...values,
                                      [filter.name]: data.map((d) =>
                                        d.value ? +d.value : 0
                                      ),
                                    });
                                  else {
                                    delete values[filter.name];
                                    setValues({
                                      ...values,
                                    });
                                  }
                                }
                              }}
                              preventFirstSelection
                            />
                          ) : filter.inputType === "text" ? (
                            <MDBInput
                              size="sm"
                              value={
                                values[filter.name]
                                  ? values[filter.name].toString()
                                  : ""
                              }
                              onChange={(e) => {
                                setValues({
                                  ...values,
                                  [filter.name]: e.target.value,
                                });
                              }}
                            />
                          ) : filter.inputType === "date" ? (
                            <MDBDatepicker
                              size="sm"
                              format="yyyy-mm-dd"
                              inline
                              value={
                                values[filter.name]
                                  ? values[filter.name].toString()
                                  : ""
                              }
                              onChange={(data) => {
                                if (data)
                                  setValues({
                                    ...values,
                                    [filter.name]: data,
                                  });
                              }}
                            />
                          ) : filter.inputType === "boolean" ? (
                            <MDBCheckbox
                              checked={
                                values[filter.name]
                                  ? !!values[filter.name]
                                  : false
                              }
                              onChange={(e) => {
                                setValues({
                                  ...values,
                                  [filter.name]: e.target.checked,
                                });
                              }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    }) ?? <div className="text-center">No filters Found</div>}
                  </div>
                  <CustomButton
                    type="solid"
                    size="sm"
                    className="w-100 my-3"
                    onClick={() => applyFilters(values)}
                    disabled={Object.keys(values).length === 0}
                    title="Apply Filters"
                  />
                </div>
              </div>
            </div>
          )}
          {onDateChange && (
            <div className="ms-1">
              <RangePicker
                value={[
                  Dates?.fromDate
                    ? format(
                        new Date(Dates?.fromDate?.toString()),
                        "dd MMM, yyyy"
                      )
                    : format(new Date(), "dd MMM, yyyy"),
                  Dates?.toDate
                    ? format(
                        new Date(Dates?.toDate?.toString()),
                        "dd MMM, yyyy"
                      )
                    : format(new Date(), "dd MMM, yyyy"),
                ]}
                onChange={(value) => {
                  let startValue = value[0];
                  let endValue = value[1];
                  if (startValue && endValue) {
                    onDateChange(
                      format(new Date(startValue), "yyyy-MM-dd"),
                      format(new Date(endValue), "yyyy-MM-dd")
                    );
                  }
                }}
              />
            </div>
          )}
        </>

        {onSearch && (
          <div className="mx-1">
            <MDBSearchInput
              onSearch={(value) => (onSearch ? onSearch(value) : () => {})}
            />
          </div>
        )}
      </div>
      <div className="d-flex">
        {componentRef?.current && printableTableRef && printAble && (
          <>
            <ReactToPrint
              trigger={() => (
                <CustomButton
                  size="sm"
                  className={"ms-1 px-2"}
                  titleClass="mx-1"
                  type="hollow"
                  title="Print"
                />
              )}
              content={() => printableTableRef}
            />
          </>
        )}

        {exportAble && (
          <CustomButton
            size="sm"
            className={"ms-3 px-2"}
            titleClass="mx-1"
            // disabled={rows.length === 0}
            type="hollow"
            onClick={handleExportButtonClick}
            title="Export"
          />
        )}
      </div>
    </div>
  );
}
