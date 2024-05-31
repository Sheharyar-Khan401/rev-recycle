import { useEffect, useRef, useState } from "react";
import { useLazyGetIssuanceReportsQuery } from "redux/features/productions/Reports/IssuanceReportsApiSlice";
import { globalVariables } from "helper/globalVariables";
import ProductionReportsSidenav from "components/Reports/ProductionReporsSidenav";
import Filters from "shared/Components/Filters";
import Issuance from "redux/types/Productions/Reports/Issuance";
import DataTable from "shared/Components/DataTable";
import { MDBIcon, MDBSelect } from "mdb-react-ui-kit";
import {
  SummarizeData,
  getFilterColumns,
  getTableDataColumns,
} from "container/Grader/Reports/Production/Issuance/SummarizeData";
import {
  getDateFromMillis,
  roundValue,
  convertWghtToLbs,
} from "helper/utility";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import { useGetFloorsQuery } from "redux/features/Settings/Productions/floorApiSlice";
import { useGetBeltsQuery } from "redux/features/Settings/Productions/beltsApiSlice";
import { useGetCustomersQuery } from "redux/features/Settings/Productions/customerApiSlice";

interface WiperIssuanceProps {
  issuanceTypeId: number;
}

export default function IssuanceReports({
  issuanceTypeId,
}: WiperIssuanceProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [getReports, reportsData] = useLazyGetIssuanceReportsQuery();
  const [selectedField, setField] = useState<string>("itemName");
  const [queryParams, setQueryParams] = useState({
    issuanceTypeId: issuanceTypeId,
    field: "item",
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const { data: categoryData } = useGetCategoryQuery(true);
  const { data: productionItemsData } = useGetAllProductionItemsQuery(null);
  const { data: floorData } = useGetFloorsQuery(null);
  const { data: beltData } = useGetBeltsQuery(null);
  const { data: customerData } = useGetCustomersQuery(null);
  const [nullSelectedData, setNullSelectedData] = useState<Issuance[]>([]);

  useEffect(() => {
    getReports({ ...queryParams, issuanceTypeId: issuanceTypeId });
  }, [queryParams, issuanceTypeId]);

  const summarizeDataList = (id: string) => {
    return SummarizeData
      ? SummarizeData?.map((item: { name: string; id: string }) => {
          return {
            text: item?.name ?? "",
            value: item?.id,
            defaultSelected: item?.id == id,
          };
        })
      : [];
  };
  useEffect(() => {
    if (reportsData?.data && reportsData?.data) {
      const itemMap = new Map(); // Map to store items based on itemId

      reportsData?.data.payLoad?.forEach((item: Issuance) => {
        const itemName = item?.itemName;
        if (itemName && !itemMap.has(itemName)) {
          itemMap.set(itemName, {
            itemName: item?.itemName ? item?.itemName : "-",
          });
        }
      });

      const allUniqueItems = Array.from(itemMap.values());
      setNullSelectedData(allUniqueItems);
    }
  }, [reportsData]);

  return (
    <>
      <div className="d-lg-flex">
        <div>
          <ProductionReportsSidenav type={issuanceTypeId} />
        </div>
        <div className="table-container">
          <Filters
            printAble={
              (reportsData?.data?.payLoad &&
                reportsData?.data?.payLoad.length > 0 &&
                selectedField !== "null") ??
              false
            }
            exportAble={
              reportsData?.data?.payLoad.length &&
              reportsData?.data?.payLoad.length > 0
                ? true
                : false
            }
            componentRef={ref}
            filters={[
              {
                label: "Belt",
                name: "beltIds",
                inputType: "multiselect",
                options: beltData
                  ? beltData?.map((belt) => {
                      return {
                        text: belt?.name ? belt?.name : "",
                        value: belt?.beltId ? belt?.beltId : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Production Item",
                name: "itemIds",
                inputType: "multiselect",
                options: productionItemsData
                  ? productionItemsData?.map((item) => {
                      return {
                        text: item?.name ? item?.name : "",
                        value: item?.itemId ? item?.itemId : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Floor",
                name: "floorIds",
                inputType: "multiselect",
                options: floorData
                  ? floorData.map((floor) => {
                      return {
                        text: floor?.name ? floor?.name : "",
                        value: floor?.floorId ? floor?.floorId : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Category",
                name: "categoryIds",
                inputType: "multiselect",
                options: categoryData
                  ? categoryData?.map((category) => {
                      return {
                        text: category?.name ? category?.name : "",
                        value: category?.categoryId ? category?.categoryId : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Customer",
                name: "customerIds",
                inputType: "multiselect",
                options: customerData
                  ? customerData?.map((customer) => {
                      return {
                        text: customer?.name ? customer?.name : "",
                        value: customer?.clientId ? customer?.clientId : 0,
                      };
                    })
                  : [],
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
                  field: selectedField,
                  issuanceTypeId: queryParams.issuanceTypeId,
                  startDate: queryParams.startDate,
                  endDate: queryParams.endDate,
                });
              } else setQueryParams({ ...queryParams, ...query });
            }}
          >
            <MDBSelect
              className="me-3"
              data={summarizeDataList(selectedField)}
              onValueChange={(data) => {
                if ("value" in data) {
                  setField(data.value ? data?.value.toString() : "");
                  setQueryParams((prev) => {
                    return {
                      ...prev,
                      field:
                        SummarizeData.find((res) => res.id == data?.value)
                          ?.value ?? "",
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
          {selectedField !== "null" && (
            <DataTable
              ref={ref}
              tableTitle={
                issuanceTypeId === 1
                  ? "Production Issuance Report"
                  : issuanceTypeId === 3
                  ? "Wiper Issuance Report"
                  : issuanceTypeId === 2
                  ? "Reproduction Issuance Report"
                  : issuanceTypeId === 4
                  ? "Mutility Issuance Report"
                  : ""
              }
              isLoading={reportsData.isFetching}
              columns={getTableDataColumns(selectedField)}
              rows={
                reportsData?.data
                  ? reportsData?.data?.payLoad?.map(
                      (item: Issuance, index: number) => {
                        return {
                          sr: index + 1,
                          itemName: item?.itemName ?? "-",
                          categoryName: item?.categoryName ?? "-",
                          grade: item?.gradeName ?? "-",
                          floorName: item?.floorName ?? "-",
                          itemFloor: item?.floorName ?? "-",
                          date: getDateFromMillis(item?.date),
                          supplier: item?.supplierName ?? "-",
                          qty: item?.quantity ? item?.quantity : 0,
                          weightKgs: item?.weightKg
                            ? roundValue(item?.weightKg)
                            : 0,
                          weightLbs: item?.weightLbs
                            ? roundValue(item?.weightLbs)
                            : 0,
                          amount: item?.amount ? roundValue(item?.amount) : 0,
                          foh: "-",
                          totalamt: item?.amount ? roundValue(item?.amount) : 0,
                          percentage: item?.percentage
                            ? roundValue(item?.percentage)
                            : 0,
                          amtkg: item?.amtPerKg
                            ? roundValue(item?.amtPerKg)
                            : 0,
                          amtlbs: item?.amtPerLbs
                            ? roundValue(item?.amtPerLbs)
                            : 0,
                          referenceNo: item?.reference ?? "-",
                          container:
                            item?.containerNo?.length > 0
                              ? item?.containerNo
                              : "-",
                        };
                      }
                    )
                  : []
              }
            />
          )}
          {selectedField === "null" && nullSelectedData
            ? nullSelectedData.map((outeritem: Issuance) => (
                <>
                  <span className="d-flex align-items-center mt-4 mb-2 ">
                    <MDBIcon fab icon="dropbox" />
                    <div className="ms-2 fs-6 text-capitalize">
                      {outeritem.itemName}
                    </div>
                  </span>
                  <DataTable
                    ref={ref}
                    isLoading={reportsData.isFetching}
                    columns={[
                      { label: "SR No.", field: "sr" },
                      { label: "Unit Code", field: "code" },
                      { label: "Item", field: "itemName" },
                      { label: "Category", field: "categoryName" },
                      { label: "Supplier", field: "supplierName" },
                      { label: "Date", field: "date" },
                      { label: "Reference", field: "referenceNo" },
                      { label: "Container", field: "container" },
                      { label: "grade", field: "gradeName" },
                      { label: "Quantity", field: "quantity", showSum: true },
                      {
                        label: "Weight(Kgs)",
                        field: "weightKg",
                        showSum: true,
                      },
                      {
                        label: "Weight(Lbs)",
                        field: "weightLbs",
                        showSum: true,
                      },
                      {
                        label: "Manual Weight(Lbs)",
                        field: "manualWeight",
                        showSum: true,
                      },
                      { label: "amount", field: "totalAmount", showSum: true },
                      {
                        label: "Amount/Kgs",
                        field: "amountkgs",
                        showSum: true,
                      },
                      {
                        label: "Amount/Lbs",
                        field: "amountLbs",
                        showSum: true,
                      },
                    ]}
                    rows={(reportsData?.data?.payLoad ?? [])
                      .filter((item: Issuance) => {
                        return outeritem.itemName === item.itemName;
                      })
                      .map((filteredItem, index: number) => {
                        return {
                          sr: index + 1,
                          code: filteredItem?.unitCode ?? "-",
                          itemName: filteredItem?.itemName ?? "-",
                          categoryName: filteredItem?.categoryName ?? "-",
                          referenceNo: filteredItem?.reference ?? "-",
                          gradeName: filteredItem?.gradeName ?? "-",
                          floorName: filteredItem?.floorName ?? "-",
                          container: filteredItem?.containerNo ?? "-",
                          date: getDateFromMillis(filteredItem?.date),
                          supplierName: filteredItem?.supplierName ?? "-",
                          quantity: filteredItem?.quantity
                            ? filteredItem?.quantity
                            : 0,
                          weightKg: filteredItem?.weightKg
                            ? roundValue(filteredItem?.weightKg)
                            : 0,
                          manualWeight: filteredItem?.weightKg
                            ? roundValue(filteredItem?.weightKg)
                            : 0,
                          weightLbs: filteredItem?.weightLbs
                            ? roundValue(filteredItem?.weightLbs)
                            : 0,
                          amount: filteredItem?.amount
                            ? roundValue(filteredItem?.amount)
                            : 0,
                          totalAmount: filteredItem?.amount
                            ? roundValue(filteredItem?.amount)
                            : 0,
                          amountkgs: filteredItem?.amtPerKg
                            ? roundValue(filteredItem?.amtPerKg)
                            : 0,
                          amountLbs: filteredItem?.amtPerLbs
                            ? roundValue(filteredItem?.amtPerLbs)
                            : 0,
                        };
                      })}
                  />
                </>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
