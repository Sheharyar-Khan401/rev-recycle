import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import ProductionReportsSidenav from "components/Reports/ProductionReporsSidenav";
import { useLazyGetStockroomBalanceReportsQuery } from "redux/features/productions/Reports/StockroomBalanceApiSlice";
import { StockroomBalance } from "redux/types/Productions/Reports/StockroomBalance";
import { useGetGradesQuery } from "redux/features/common/gradeApiSlice";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetLabelTypesQuery } from "redux/features/Settings/Productions/labeltypesApiSlice";
import { useGetStockRoomsQuery } from "redux/features/Settings/Productions/stockroomsApiSlice";
import { useGetAllSaleOrdersQuery } from "redux/features/sales/Orders/saleOrdersApiSlice";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import { MDBSelect } from "mdb-react-ui-kit";
import { getDateFromMillis, roundValue } from "helper/utility";
export default function StockroomBalanceReports() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [getReports, reportsData] = useLazyGetStockroomBalanceReportsQuery();
  const { data: labelTypesData } = useGetLabelTypesQuery(null);
  const { data: stockRoomData } = useGetStockRoomsQuery(null);
  const { data: gradeData } = useGetGradesQuery(null);
  const { data: categoryData } = useGetCategoryQuery(true);
  const { data: saleOrderData } = useGetAllSaleOrdersQuery(null);
  const { data: productionItemsData } = useGetAllProductionItemsQuery(null);

  const [selectedField, setField] = useState<string>("item");
  const [queryParams, setQueryParams] = useState({ field: "item" });
  const SummarizeData = [
    {
      name: "Item",
      id: "item",
      value: "item",
    },
    {
      name: "None",
      id: "null",
      value: "null",
    },
    {
      name: "Label Type",
      id: "labelType",
      value: "labelType",
    },
    {
      name: "Label Type Item",
      id: "labelTypeItem",
      value: "labelTypeItem",
    },
    {
      name: "Category",
      id: "category",
      value: "category",
    },
    {
      name: "Stock Room",
      id: "stockRoom",
      value: "stockRoom",
    },
    {
      name: "Department Item",
      id: "departmentItem",
      value: "departmentItem",
    },
    {
      name: "Sale Order",
      id: "saleOrder",
      value: "saleOrder",
    },
    {
      name: "Brand",
      id: "brand",
      value: "brand",
    },
    {
      name: "Brand Item",
      id: "brandItem",
      value: "brandItem",
    },
    {
      name: "Packaging Unit",
      id: "unitName",
      value: "packagingUnit",
    },
    {
      name: "Packaging Unit Item",
      id: "packagingUnitItem",
      value: "packagingUnitItem",
    },
    {
      name: "Bundle Reference",
      id: "budleReference",
      value: "budleReference",
    },
    {
      name: "Bundle Reference Item",
      id: "budleReferenceItem",
      value: "budleReferenceItem",
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
    getReports(queryParams);
  }, [queryParams, getReports]);

  return (
    <>
      <div className="d-lg-flex">
        <div>
          <ProductionReportsSidenav type={5} />
        </div>
        <div className="table-container">
          <Filters
            componentRef={ref}
            printAble={(reportsData?.data?.payLoad && reportsData?.data?.payLoad.length > 0 )?? false}
            exportAble={(reportsData?.data?.payLoad && reportsData?.data?.payLoad.length > 0 )?? false}
            filters={[
              {
                label: "Grade",
                name: "gradeIds",
                inputType: "multiselect",
                options: gradeData
                  ? gradeData?.map((grade) => {
                      return {
                        text: grade?.name ? grade?.name : "",
                        value: grade?.gradeId ? grade?.gradeId : 0,
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
                label: "Sale Order",
                name: "saleOrderIds",
                inputType: "multiselect",
                options: saleOrderData
                  ? saleOrderData.payLoad?.map((saleOrder) => {
                      return {
                        text: saleOrder?.reference ? saleOrder?.reference : "",
                        value: saleOrder?.saleOrderId
                          ? saleOrder?.saleOrderId
                          : 0,
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
                label: "Label Type",
                name: "labelTypeIds",
                inputType: "multiselect",
                options: labelTypesData
                  ? labelTypesData?.map((labelType) => {
                      return {
                        text: labelType?.name ? labelType?.name : "",
                        value: labelType?.labelTypeId
                          ? labelType?.labelTypeId
                          : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Stock Room",
                name: "stockRoomIds",
                inputType: "multiselect",
                options: stockRoomData
                  ? stockRoomData?.map((stockRoom) => {
                      return {
                        text: stockRoom?.name ? stockRoom?.name : "",
                        value: stockRoom?.stockRoomId
                          ? stockRoom?.stockRoomId
                          : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Reference",
                name: "reference",
                inputType: "text",
              },
              {
                label: "Order Date",
                name: "orderDate",
                inputType: "date",
              },
            ]}
            onSubmit={(query) => {
              if (Object.keys(query).length === 0) {
                setQueryParams({
                  field:
                    SummarizeData.find((res) => res.id == selectedField)
                      ?.value ?? "",
                });
              } else setQueryParams({ ...queryParams, ...query });
            }}
          >
            <MDBSelect
              className="me-3"
              data={summarizeDataList(selectedField)}
              onValueChange={(data) => {
                if ("value" in data) {
                  setField(data.value ? data?.value + "" : "");
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
              search
              optionHeight={30}
              preventFirstSelection
              label="Summarize By"
            />
          </Filters>
          {selectedField === "null" && (
            <DataTable
              ref={ref}
              tableTitle="Stock Room Balance"
              isLoading={reportsData.isFetching}
              columns={[
                { label: "Sr. No.", field: "sr" },
                { label: "Item Name", field: "item" },
                { label: "Item Code", field: "itemCode" },
                { label: "Unit Code", field: "unitCode" },
                { label: "UOM", field: "uom" },
                { label: "Unit Pieces", field: "unitPieces", showSum: true },
                { label: "Units", field: "units", showSum: true },
                { label: "Weight KGS", field: "weightKgs", showSum: true },
                { label: "Weight LBS", field: "weightLbs", showSum: true },
                { label: "Prod. Rate", field: "prodRate", showSum: true },
                { label: "Amount", field: "amount", showSum: true },
                { label: "Grade", field: "grade" },
              ]}
              rows={
                reportsData?.data
                  ? reportsData?.data?.payLoad.map(
                      (item: StockroomBalance, index: number) => {

                        return {
                          sr: index + 1,
                          item: item?.itemName ? item?.itemName : "-",
                          itemCode: item?.itemCode ? item?.itemCode : "-",
                          unitCode: item?.unitCode ? item?.unitCode : "-",
                          uom: item?.unitOfMeasurement
                            ? item?.unitOfMeasurement
                            : "-",
                          unitPieces: item?.unitPieces ? item?.unitPieces : 0,
                          units: item?.units ? item?.units : 0,
                          weightKgs: item?.weightKgs
                            ? roundValue(item?.weightKgs)
                            : 0,
                          weightLbs: item?.weightLbs
                            ? roundValue(item?.weightLbs)
                            : 0,
                          prodRate: item?.prodRate ? item?.prodRate : 0,
                          amount: item?.amount ? roundValue(item?.amount) : 0,
                          grade: item?.grade ? item?.grade : "-",
                        };
                      }
                    )
                  : []
              }
            />
          )}
          {(selectedField === "item") && (
            <DataTable
              ref={ref}
              tableTitle="Stock Room Balance"
              isLoading={reportsData.isFetching}
              columns={[
                { label: "Sr. No.", field: "sr" },
                { label: "Item Name", field: "item" },
                { label: "Item Code", field: "itemCode" },
                { label: "UOM", field: "uom" },
                { label: "Unit Pieces", field: "unitPieces", showSum: true },
                { label: "Units", field: "units", showSum: true },
                { label: "Weight KGS", field: "weightKgs", showSum: true },
                { label: "Weight LBS", field: "weightLbs", showSum: true },
                { label: "Prod. Rate", field: "prodRate", showSum: true },
                { label: "Amount", field: "amount", showSum: true },
                { label: "Grade", field: "grade" },
              ]}
              rows={
                reportsData?.data
                  ? reportsData?.data?.payLoad.map(
                      (item: StockroomBalance, index: number) => {

                        return {
                          sr: index + 1,
                          item: item?.itemName ? item?.itemName : "-",
                          itemCode: item?.itemCode ? item?.itemCode : "-",
                          uom: item?.unitOfMeasurement
                            ? item?.unitOfMeasurement
                            : "-",
                          unitPieces: item?.unitPieces ? item?.unitPieces : 0,
                          units: item?.units ? item?.units : 0,
                          weightKgs: item?.weightKgs
                            ? roundValue(item?.weightKgs)
                            : 0,
                          weightLbs: item?.weightLbs
                            ? roundValue(item?.weightLbs)
                            : 0,
                          prodRate: item?.prodRate ? item?.prodRate : 0,
                          amount: item?.amount ? roundValue(item?.amount) : 0,
                          grade: item?.grade ? item?.grade : "-",
                        };
                      }
                    )
                  : []
              }
            />
          )}
          {selectedField === "brand" && (
            <DataTable
              ref={ref}
              isLoading={reportsData.isFetching}
              tableTitle="Stock Room Balance"
              columns={[
                { label: "Sr. No.", field: "sr" },
                { label: "Brand Code", field: "brandCode" },
                { label: "Brnad Name", field: "brandName" },
                { label: "Units", field: "units", showSum: true },
                { label: "Weight KGS", field: "weightKgs", showSum: true },
                { label: "Weight LBS", field: "weightLbs", showSum: true },
                { label: "Amount", field: "amount", showSum: true },
              ]}
              rows={
                reportsData?.data
                  ? reportsData?.data?.payLoad.map(
                      (item: StockroomBalance, index: number) => {
                        return {
                          sr: index + 1,
                          brandName: item?.brand ? item?.brand : "-",
                          brandCode: item?.brandCode ? item?.brandCode : "-",
                          units: item?.units ? item?.units : 0,
                          weightKgs: item?.weightKgs
                            ? roundValue(item?.weightKgs)
                            : 0,
                          weightLbs: item?.weightLbs
                            ? roundValue(item?.weightLbs)
                            : 0,

                          amount: item?.amount ? roundValue(item?.amount) : 0,
                        };
                      }
                    )
                  : []
              }
            />
          )}
          {(selectedField === "category" ||
            selectedField === "labelType" ||
            selectedField === "stockRoom" ||
            selectedField === "unitName") && (
            <DataTable
              ref={ref}
              isLoading={reportsData.isFetching}
              tableTitle="Stock Room Balance"
              columns={[
                { label: "Sr. No.", field: "sr" },
                {
                  label:
                    selectedField === "category"
                      ? "Category"
                      : selectedField === "labelType"
                      ? "Label Type"
                      : selectedField === "unitName"
                      ? "Unit Name"
                      : "Stock Room",
                  field: selectedField,
                },

                { label: "Units", field: "units", showSum: true },
                { label: "Weight KGS", field: "weightKgs", showSum: true },
                { label: "Weight LBS", field: "weightLbs", showSum: true },

                { label: "Amount", field: "amount", showSum: true },
              ]}
              rows={
                reportsData?.data
                  ? reportsData?.data?.payLoad.map(
                      (item: StockroomBalance, index: number) => {
                        return {
                          sr: index + 1,
                          [selectedField]: item?.[selectedField]
                            ? item?.[selectedField]
                            : "-",
                          units: item?.units ? item?.units : 0,
                          weightKgs: item?.weightKgs
                            ? roundValue(item?.weightKgs)
                            : 0,
                          weightLbs: item?.weightLbs
                            ? roundValue(item?.weightLbs)
                            : 0,
                          amount: item?.amount ? roundValue(item?.amount) : 0,
                        };
                      }
                    )
                  : []
              }
            />
          )}
          {selectedField === "bundleReference" && (
            <DataTable
              ref={ref}
              tableTitle="Stock Room Balance"
              isLoading={reportsData.isFetching}
              columns={[
                { label: "Sr. No.", field: "sr" },
                { label: "Bundle Reference", field: "bundleReference" },
                { label: "Production Rate", field: "prodDate" },
                { label: "Units", field: "units", showSum: true },
                { label: "Weight KGS", field: "weightKgs", showSum: true },
                { label: "Weight LBS", field: "weightLbs", showSum: true },
                { label: "Amount", field: "amount", showSum: true },
              ]}
              rows={
                reportsData?.data
                  ? reportsData?.data?.payLoad.map(
                      (item: StockroomBalance, index: number) => {
                        return {
                          sr: index + 1,
                          bundleReference: item?.bundleReference
                            ? item?.bundleReference
                            : "-",
                          prodDate: getDateFromMillis(item?.prodRate),
                          units: item?.units ? item?.units : 0,
                          weightKgs: item?.weightKgs
                            ? roundValue(item?.weightKgs)
                            : 0,
                          weightLbs: item?.weightLbs
                            ? roundValue(item?.weightLbs)
                            : 0,
                          amount: item?.amount ? roundValue(item?.amount) : 0,
                        };
                      }
                    )
                  : []
              }
            />
          )}
          {(selectedField === "budleReferenceItem" ||
            selectedField === "budleReference") && (
            <DataTable
              ref={ref}
              tableTitle="Stock Room Balance"
              isLoading={reportsData.isFetching}
              columns={[
                { label: "Sr. No.", field: "sr" },
                { label: "Bundle Reference", field: "bundleReference" },
                { label: "Bundle No.", field: "bundleNumber" },
                { label: "Item Name", field: "itemName" },
                { label: "unitCode", field: "unitCode" },
                { label: "Weight KGS", field: "weightKgs", showSum: true },
                { label: "Weight LBS", field: "weightLbs", showSum: true },
                { label: "Amount", field: "amount", showSum: true },
              ]}
              rows={
                reportsData?.data
                  ? reportsData?.data?.payLoad.map(
                      (item: StockroomBalance, index: number) => {
                        return {
                          sr: index + 1,
                          bundleReference: item?.bundleReference
                            ? item?.bundleReference
                            : "-",
                          bundleNumber: item?.bundleNumber
                            ? item?.bundleNumber
                            : "-",
                          itemName: item?.itemName ? item?.itemName : "-",
                          unitCode: item?.unitCode ? item?.unitCode : "-",
                          weightKgs: item?.weightKgs
                            ? roundValue(item?.weightKgs)
                            : 0,
                          weightLbs: item?.weightLbs
                            ? roundValue(item?.weightLbs)
                            : 0,
                          amount: item?.amount ? roundValue(item?.amount) : 0,
                        };
                      }
                    )
                  : []
              }
            />
          )}

          {(selectedField === "labelTypeItem" ||
            selectedField === "departmentItem" ||
            selectedField === "brandItem") && (
            <DataTable
              ref={ref}
              tableTitle="Stock Room Balance"
              isLoading={reportsData.isFetching}
              columns={[
                { label: "Sr. No.", field: "sr" },
                {
                  label:
                    selectedField === "departmentItem"
                      ? "Department Item"
                      : selectedField === "labelTypeItem"
                      ? "Label Type Item"
                      : "Brand Item",
                  field: selectedField,
                },
                { label: "Item Name", field: "itemName" },
                { label: "Unit Weight", field: "unitWeight", showSum: true },
                { label: "Units", field: "units", showSum: true },
                { label: "Weight KGS", field: "weightKgs", showSum: true },
                { label: "Weight LBS", field: "weightLbs", showSum: true },
                { label: "Prod. Rate", field: "Prodrate", showSum: true },
                { label: "Amount", field: "amount", showSum: true },
              ]}
              rows={
                reportsData?.data
                  ? reportsData?.data?.payLoad.map(
                      (item: StockroomBalance, index: number) => {
                        return {
                          sr: index + 1,
                          [selectedField]: item?.[selectedField]
                            ? item?.[selectedField]
                            : "-",
                          itemName: item?.itemName ? item?.itemName : "-",
                          unitWeight: item?.unitWeight
                            ? roundValue(item.unitWeight)
                            : 0,
                          units: item?.units ? item?.units : 0,
                          weightKgs: item?.weightKgs
                            ? roundValue(item?.weightKgs)
                            : 0,
                          weightLbs: item?.weightLbs
                            ? roundValue(item?.weightLbs)
                            : 0,
                          Prodrate: item?.prodRate ? item?.prodRate : 0,
                          amount: item?.amount ? roundValue(item?.amount) : 0,
                        };
                      }
                    )
                  : []
              }
            />
          )}
          {selectedField === "saleOrder" && (
            <DataTable
              ref={ref}
              tableTitle="Stock Room Balance"
              isLoading={reportsData.isFetching}
              columns={[
                { label: "Sr. No.", field: "sr" },
                { label: "Order Reference", field: "orderReference" },
                { label: "Bundles", field: "bundles" },
                { label: "S.O Quantity", field: "soQuantity", showSum: true },
                { label: "Balance", field: "balance", showSum: true },
                { label: "Units", field: "units", showSum: true },
                { label: "Weight KGS", field: "weightKgs", showSum: true },
                { label: "Weight LBS", field: "weightLbs", showSum: true },
                { label: "Amount", field: "amount", showSum: true },
              ]}
              rows={
                reportsData?.data
                  ? reportsData?.data?.payLoad.map(
                      (item: StockroomBalance, index: number) => {
                        return {
                          sr: index + 1,
                          orderReference: item?.orderReference
                            ? item?.orderReference
                            : "-",
                          bundles: item?.bundle ? item?.bundle : "-",
                          soQuantity: item?.soQuantity ? item?.soQuantity : 0,
                          balance: item?.balance ? item?.balance : 0,
                          units: item?.units ? item?.units : 0,
                          weightKgs: item?.weightKgs
                            ? roundValue(item?.weightKgs)
                            : 0,
                          weightLbs: item?.weightLbs
                            ? roundValue(item?.weightLbs)
                            : 0,
                          amount: item?.amount ? roundValue(item?.amount) : 0,
                        };
                      }
                    )
                  : []
              }
            />
          )}
          {selectedField === "packagingUnitItem" && (
            <DataTable
              ref={ref}
              tableTitle="Stock Room Balance"
              isLoading={reportsData.isFetching}
              columns={[
                { label: "Sr. No.", field: "sr" },
                { label: "Unit Name", field: "unitName" },
                { label: "Item", field: "itemName" },
                { label: "Unit Weight", field: "unitWeight", showSum: true },
                { label: "Units", field: "units", showSum: true },
                { label: "Weight KGS", field: "weightKgs", showSum: true },
                { label: "Weight LBS", field: "weightLbs", showSum: true },
                { label: "Production Rate", field: "prodRate", showSum: true },
                { label: "Amount", field: "amount", showSum: true },
              ]}
              rows={
                reportsData?.data
                  ? reportsData?.data?.payLoad.map(
                      (item: StockroomBalance, index: number) => {
                        return {
                          sr: index + 1,
                          unitName: item?.unitName ? item?.unitName : "-",
                          itemName: item?.itemName ? item?.itemName : "-",
                          unitWeight: item?.unitWeight ? item?.unitWeight : 0,
                          prodRate: item?.prodRate ? item?.prodRate : 0,
                          units: item?.units ? item?.units : 0,
                          weightKgs: item?.weightKgs
                            ? roundValue(item?.weightKgs)
                            : 0,
                          weightLbs: item?.weightLbs
                            ? roundValue(item?.weightLbs)
                            : 0,
                          amount: item?.amount ? roundValue(item?.amount) : 0,
                        };
                      }
                    )
                  : []
              }
            />
          )}
        </div>
      </div>
    </>
  );
}
