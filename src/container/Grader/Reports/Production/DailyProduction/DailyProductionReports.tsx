import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import ProductionReportsSidenav from "components/Reports/ProductionReporsSidenav";
import { DailyProduction } from "redux/types/Productions/Reports/DailyProduction";
import { useLazyGetDailyProductionReportsQuery } from "redux/features/productions/Reports/DailyProductionReportsApiSlice";
import { MDBIcon, MDBSelect } from "mdb-react-ui-kit";
import { getDateFromMillis, roundValue } from "helper/utility";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetLabelTypesQuery } from "redux/features/Settings/Productions/labeltypesApiSlice";
import { useGetStockRoomsQuery } from "redux/features/Settings/Productions/stockroomsApiSlice";
import { useGetFloorsQuery } from "redux/features/Settings/Productions/floorApiSlice";
import { useGetGradesQuery } from "redux/features/common/gradeApiSlice";
import { useGetStationsQuery } from "redux/features/Settings/Productions/stationsApiSlice";
import { useGetAllDepartmentQuery } from "redux/features/Settings/Department/departmentApiSlice";
import { useGetQuantityUnitsQuery } from "redux/features/common/quantityUnitApiSlice";
import { useGetAllSaleOrdersQuery } from "redux/features/sales/Orders/saleOrdersApiSlice";
export default function DailyProductionReports() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [getReports, reportsData] = useLazyGetDailyProductionReportsQuery();
  const { data: categoryData } = useGetCategoryQuery(true);
  const { data: itemsData } = useGetAllProductionItemsQuery(null);
  const { data: labelTypesData } = useGetLabelTypesQuery(null);
  const { data: stockRoomsData } = useGetStockRoomsQuery(null);
  const { data: floorsData } = useGetFloorsQuery(null);
  const { data: gradesData } = useGetGradesQuery(null);
  const { data: quantityUnitData } = useGetQuantityUnitsQuery(null);
  const { data: stationsData } = useGetStationsQuery(null);
  const { data: departmentsData } = useGetAllDepartmentQuery(null);
  const { data: saleOrderData } = useGetAllSaleOrdersQuery(null);
  const [selectedField, setField] = useState<string | number>("item");
  const [categoryItemSelectedData, setCategoryItemSelectedData] = useState<
    DailyProduction[]
  >([]);
  const [nullSelectedData, setNullSelectedData] = useState<DailyProduction[]>(
    []
  );
  const [quantityUnitSelectedData, setQuantityUnitSelectedData] = useState<
    DailyProduction[]
  >([]);

  const [queryParams, setQueryParams] = useState({
    field: "item",
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
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
      name: "Category",
      id: "category",
      value: "category",
    },
    {
      name: "Floor",
      id: "floorName",
      value: "floor",
    },

    {
      name: "Grade",
      id: "gradeName",
      value: "grade",
    },
    {
      name: "Label Type",
      id: "labelType",
      value: "labelType",
    },
    {
      name: "Sale Order",
      id: "saleOrder",
      value: "saleOrder",
    },
    {
      name: "Stockroom",
      id: "stockRoom",
      value: "stockRoom",
    },
    {
      name: "Variance",
      id: "variance",
      value: "variance",
    },
    {
      name: "Category Item",
      id: "categoryItem",
      value: "categoryItem",
    },
    {
      name: "Date",
      id: "date",
      value: "date",
    },
    {
      name: "Department",
      id: "department",
      value: "department",
    },
    {
      name: "Packaging Unit",
      id: "packagingUnitName",
      value: "packagingUnit",
    },
    {
      name: "Packaging Unit Item",
      id: "packagingUnitItem",
      value: "packagingUnitItem",
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

  useEffect(() => {
    if (reportsData?.data && reportsData?.data) {
      const itemMap = new Map(); // Map to store items based on itemId

      reportsData?.data.payLoad?.forEach((item: DailyProduction) => {
        const itemName = item?.itemName;
        if (itemName && !itemMap.has(itemName)) {
          itemMap.set(itemName, {
            itemName: item?.itemName ? item?.itemName : "-",
          });
        }
      });

      const allUniqueItems = Array.from(itemMap.values());
      setNullSelectedData(allUniqueItems);
      const categeoryMap = new Map(); // Map to store items based on itemId

      reportsData?.data.payLoad?.forEach((item: DailyProduction) => {
        const categoryName = item?.categoryName;
        if (categoryName && !categeoryMap.has(categoryName)) {
          categeoryMap.set(categoryName, {
            categoryName: item?.categoryName ? item?.categoryName : "-",
          });
        }
      });
      const allUniqueItemsOnCategory = Array.from(categeoryMap.values());
      setCategoryItemSelectedData(allUniqueItemsOnCategory);

      const packagingUnitMap = new Map(); // Map to store items based on itemId

      reportsData?.data.payLoad?.forEach((item: DailyProduction) => {
        const packagingUnitName = item?.packagingUnitName;
        if (packagingUnitName && !packagingUnitMap.has(packagingUnitName)) {
          packagingUnitMap.set(packagingUnitName, {
            packagingUnitName: item?.packagingUnitName
              ? item?.packagingUnitName
              : "-",
          });
        }
      });
      const allUniqueItemsOnPackagingUnit = Array.from(
        packagingUnitMap.values()
      );
      setQuantityUnitSelectedData(allUniqueItemsOnPackagingUnit);
    }
  }, [reportsData]);
  return (
    <div className="d-lg-flex">
      <ProductionReportsSidenav type={6} />
      <div className="table-container">
        <Filters
          componentRef={ref}
          printAble={
            (reportsData?.data?.payLoad &&
              reportsData?.data?.payLoad.length > 0 &&
              selectedField !== "null") ??
            false
          }
          exportAble={
            (reportsData?.data?.payLoad &&
              reportsData?.data?.payLoad.length > 0) ??
            false
          }
          filters={[
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
              label: "Item",
              name: "itemIds",
              inputType: "multiselect",
              options: itemsData
                ? itemsData?.map((item) => {
                    return {
                      text: item?.name ? item?.name : "",
                      value: item?.itemId ? item?.itemId : 0,
                    };
                  })
                : [],
            },
            {
              label: "Label Type",
              name: "labelTypeIds",
              inputType: "multiselect",
              options: labelTypesData
                ? labelTypesData?.map((label) => {
                    return {
                      text: label?.name ? label?.name : "",
                      value: label?.labelTypeId ? label?.labelTypeId : 0,
                    };
                  })
                : [],
            },
            {
              label: "Stock Room",
              name: "stockRoomIds",
              inputType: "multiselect",
              options: stockRoomsData
                ? stockRoomsData?.map((item) => {
                    return {
                      text: item?.name ? item?.name : "",
                      value: item?.stockRoomId ? item?.stockRoomId : 0,
                    };
                  })
                : [],
            },
            {
              label: "Sale Order",
              name: "saleOrderIds",
              inputType: "multiselect",
              options: saleOrderData
                ? saleOrderData?.payLoad?.map((saleOrder) => {
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
              label: "Floor",
              name: "floorIds",
              inputType: "multiselect",
              options: floorsData
                ? floorsData?.map((floor) => {
                    return {
                      text: floor?.name ? floor?.name : "",
                      value: floor?.floorId ? floor?.floorId : 0,
                    };
                  })
                : [],
            },
            {
              label: "Grade",
              name: "gradeIds",
              inputType: "multiselect",
              options: gradesData
                ? gradesData?.map((grade) => {
                    return {
                      text: grade?.name ? grade?.name : "",
                      value: grade?.gradeId ? grade?.gradeId : 0,
                    };
                  })
                : [],
            },
            {
              label: "Station",
              name: "stationIds",
              inputType: "multiselect",
              options: stationsData
                ? stationsData?.map((station) => {
                    return {
                      text: station?.name ? station?.name : "",
                      value: station?.stationId ? station?.stationId : 0,
                    };
                  })
                : [],
            },
            {
              label: "Department",
              name: "departmentIds",
              inputType: "multiselect",
              options: departmentsData
                ? departmentsData?.map((department) => {
                    return {
                      text: department?.name ? department?.name : "",
                      value: department?.departmentId
                        ? department?.departmentId
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
              label: "Unit Code",
              name: "unitCode",
              inputType: "text",
            },
            {
              label: "Quantity Unit",
              name: "quantityUnitIds",
              inputType: "select",
              options: quantityUnitData
                ? quantityUnitData?.map((quantityUnit) => {
                    return {
                      text: quantityUnit?.name ? quantityUnit?.name : "",
                      value: quantityUnit?.quantityUnitId
                        ? quantityUnit?.quantityUnitId
                        : 0,
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
                field:
                  SummarizeData.find((res) => res.id == selectedField)?.value ??
                  "",
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
                setField(data.value ? data?.value : 0);
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
        {selectedField === "item" && (
          <DataTable
            ref={ref}
            tableTitle="Daily Production Report"
            isLoading={reportsData.isFetching}
            columns={[
              { label: "Sr. No.", field: "sr" },
              { label: "Item Code", field: "itemCode" },
              { label: "Item Name", field: "itemName" },
              { label: "Grade", field: "grade" },
              { label: "Qty", field: "qty", showSum: true },
              { label: "UOM", field: "uom" },
              { label: "Unit Pieces", field: "unitPieces", showSum: true },
              { label: "Production Rate", field: "prodRate" },
              { label: "Weight KGS", field: "weightKgs", showSum: true },
              { label: "Weight LBS", field: "weightLbs", showSum: true },
              { label: "Cost Price", field: "costPrice", showSum: true },
              { label: "Prod. Value", field: "prodValue", showSum: true },
              { label: "Amount/KGS", field: "amountKgs", showSum: true },
              { label: "Amount/LBS", field: "amountLbs", showSum: true },
              { label: "Amount/Iss. KGS", field: "amountIssKgs" },
              { label: "Amount/Iss. LBS", field: "amountIssLbs" },
              { label: "Pro. %", field: "pro" },
              { label: "Iss. %", field: "iss" },
              { label: "Sale Rate", field: "saleRate", showSum: true },
              { label: "Sale Amount", field: "saleAmount", showSum: true },
            ]}
            rows={
              reportsData?.data
                ? reportsData?.data?.payLoad.map(
                    (item: DailyProduction, index: number) => {
                      return {
                        sr: index + 1,
                        itemCode: item?.itemCode ? item?.itemCode : "-",
                        itemName: item?.itemName ? item?.itemName : "-",
                        grade: item?.gradeName ? item?.gradeName : "-",
                        qty: item?.quantity ? item?.quantity : 0,
                        uom: item?.unitOfMeasurement
                          ? item?.unitOfMeasurement
                          : "-",
                        weightLbs: item?.weightLbs
                          ? roundValue(item?.weightLbs)
                          : 0,
                        weightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        amountKgs: item?.amountkgs
                          ? roundValue(item?.amountkgs)
                          : 0,
                        unitPieces: item?.unitPieces ? item?.unitPieces : 0,
                        amountLbs: item?.amountlbs
                          ? roundValue(item?.amountlbs)
                          : 0,
                        prodRate: item?.prodRate
                          ? roundValue(item?.prodRate)
                          : 0,
                        prodValue: item?.prodValue
                          ? roundValue(item?.prodValue)
                          : 0,
                        amountIssKgs: "-",
                        amountIssLbs: "-",
                        pro: "-",
                        iss: "-",
                        costPrice: item?.costPrice
                          ? roundValue(item?.costPrice)
                          : 0.0,
                        saleRate: 0.0,
                        saleAmount: 0.0,
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
            tableTitle="Daily Production Report"
            isLoading={reportsData.isFetching}
            columns={[
              { label: "Sr. No.", field: "sr" },
              { label: "Brand Code", field: "brandCode" },
              { label: "Brand Name", field: "brandName" },
              { label: "Qty", field: "qty", showSum: true },
              { label: "Weight KGS", field: "weightKgs", showSum: true },
              { label: "Weight LBS", field: "weightLbs", showSum: true },
              { label: "Prod. Value", field: "prodValue", showSum: true },
              { label: "Amount/KGS", field: "amountKgs", showSum: true },
              { label: "Amount/LBS", field: "amountLbs", showSum: true },
              { label: "Amount/Iss. KGS", field: "amountIssKgs" },
              { label: "Amount/Iss. LBS", field: "amountIssLbs" },
              { label: "Pro. %", field: "pro" },
              { label: "Iss. %", field: "iss" },
              { label: "Sale Amount", field: "saleAmount", showSum: true },
            ]}
            rows={
              reportsData?.data
                ? reportsData?.data?.payLoad.map(
                    (item: DailyProduction, index: number) => {
                      return {
                        sr: index + 1,
                        brandCode: item?.brandItemCode
                          ? item?.brandItemCode
                          : "-",
                        brandName: item?.brandName ? item?.brandName : "-",
                        qty: item?.quantity ? item?.quantity : 0,
                        weightLbs: item?.weightLbs
                          ? roundValue(item?.weightLbs)
                          : 0,
                        weightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        amountKgs: item?.amountkgs
                          ? roundValue(item?.amountkgs)
                          : 0,
                        amountLbs: item?.amountlbs
                          ? roundValue(item?.amountlbs)
                          : 0,
                        prodValue: item?.prodValue
                          ? roundValue(item?.prodValue)
                          : 0,
                        amountIssKgs: "-",
                        amountIssLbs: "-",
                        pro: "-",
                        iss: "-",
                        saleAmount: 0.0,
                      };
                    }
                  )
                : []
            }
          />
        )}
        {selectedField === "brandItem" && (
          <DataTable
            ref={ref}
            tableTitle="Daily Production Report"
            isLoading={reportsData.isFetching}
            columns={[
              { label: "Sr. No.", field: "sr" },
              { label: "Item Code", field: "itemCode" },

              { label: "Item Name", field: "itemName" },
              { label: "Grade", field: "grade" },
              { label: "Qty", field: "qty", showSum: true },
              { label: "Weight KGS", field: "weightKgs", showSum: true },
              { label: "Weight LBS", field: "weightLbs", showSum: true },
              { label: "Prod. Value", field: "prodValue", showSum: true },
              { label: "Amount/KGS", field: "amountKgs", showSum: true },
              { label: "Amount/LBS", field: "amountLbs", showSum: true },
              { label: "Amount/Iss. KGS", field: "amountIssKgs" },
              { label: "Amount/Iss. LBS", field: "amountIssLbs" },
              { label: "Pro. %", field: "pro" },
              { label: "Iss. %", field: "iss" },
              { label: "Sale Amount", field: "saleAmount", showSum: true },
            ]}
            rows={
              reportsData?.data
                ? reportsData?.data?.payLoad.map(
                    (item: DailyProduction, index: number) => {
                      return {
                        sr: index + 1,
                        itemCode: item?.itemCode ? item?.itemCode : "-",
                        itemName: item?.itemName ? item?.itemName : "-",
                        grade: item?.gradeName ? item?.gradeName : "-",
                        qty: item?.quantity ? item?.quantity : 0,
                        weightLbs: item?.weightLbs
                          ? roundValue(item?.weightLbs)
                          : 0,
                        weightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        amountKgs: item?.amountkgs
                          ? roundValue(item?.amountkgs)
                          : 0,
                        amountLbs: item?.amountlbs
                          ? roundValue(item?.amountlbs)
                          : 0,
                        prodValue: item?.prodValue
                          ? roundValue(item?.prodValue)
                          : 0,
                        amountIssKgs: "-",
                        amountIssLbs: "-",
                        pro: "-",
                        iss: "-",
                        saleAmount: 0.0,
                      };
                    }
                  )
                : []
            }
          />
        )}
        {selectedField === "category" && (
          <DataTable
            ref={ref}
            isLoading={reportsData.isFetching}
            tableTitle="Daily Production Report"
            columns={[
              { label: "Sr. No.", field: "sr" },
              { label: "category", field: "categoryName" },
              { label: "Qty", field: "qty" },
              { label: "Weight KGS", field: "weightKgs", showSum: true },
              { label: "Weight LBS", field: "weightLbs", showSum: true },
              { label: "Prod. Value", field: "prodValue", showSum: true },
              { label: "Amount/KGS", field: "amountKgs", showSum: true },
              { label: "Amount/LBS", field: "amountLbs", showSum: true },
              { label: "Amount/Iss. KGS", field: "amountIssKgs" },
              { label: "Amount/Iss. LBS", field: "amountIssLbs" },
              { label: "Pro. %", field: "pro" },
              { label: "Iss. %", field: "iss" },
              { label: "Sale Amount", field: "saleAmount", showSum: true },
              { label: "Man Power", field: "manPower" },
              { label: "LBS/Man Power", field: "lbsManPower" },
            ]}
            rows={
              reportsData?.data
                ? reportsData?.data?.payLoad.map(
                    (item: DailyProduction, index: number) => {
                      return {
                        sr: index + 1,
                        categoryName: item?.categoryName
                          ? item?.categoryName
                          : "-",
                        grade: item?.gradeName ? item?.gradeName : "-",
                        qty: item?.quantity ? item?.quantity : 0,
                        weightLbs: item?.weightLbs
                          ? roundValue(item?.weightLbs)
                          : 0,
                        weightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        amountKgs: item?.amountkgs
                          ? roundValue(item?.amountkgs)
                          : 0,
                        amountLbs: item?.amountlbs
                          ? roundValue(item?.amountlbs)
                          : 0,
                        prodValue: item?.prodValue
                          ? roundValue(item?.prodValue)
                          : 0,
                        amountIssKgs: "-",
                        amountIssLbs: "-",
                        pro: "-",
                        iss: "-",
                        saleAmount: 0.0,
                        manPower: item?.manPower
                          ? roundValue(item?.manPower)
                          : 0,
                        lbsManPower: item?.lbsManPower
                          ? roundValue(item?.lbsManPower)
                          : 0,
                      };
                    }
                  )
                : []
            }
          />
        )}
        {(selectedField === "floorName" ||
          selectedField === "gradeName" ||
          selectedField === "labelType" ||
          selectedField === "stockRoom" ||
          selectedField === "packagingUnitName") && (
          <DataTable
            ref={ref}
            tableTitle="Daily Production Report"
            isLoading={reportsData.isFetching}
            columns={[
              { label: "Sr. No.", field: "sr" },
              {
                label:
                  selectedField === "gradeName"
                    ? "Grade"
                    : selectedField === "floorName"
                    ? "Floor"
                    : selectedField === "labelType"
                    ? "Label Type"
                    : selectedField === "stockRoom"
                    ? " Stock Room"
                    : "Packaging Unit",
                field: selectedField,
              },
              { label: "Qty", field: "qty", showSum: true },
              { label: "Weight KGS", field: "weightKgs", showSum: true },
              { label: "Weight LBS", field: "weightLbs", showSum: true },
              { label: "Prod. Value", field: "prodValue,showSum: true" },
              { label: "Amount/KGS", field: "amountKgs", showSum: true },
              { label: "Amount/LBS", field: "amountLbs", showSum: true },
              { label: "Amount/Iss. KGS", field: "amountIssKgs" },
              { label: "Amount/Iss. LBS", field: "amountIssLbs" },
              { label: "Pro. %", field: "pro" },
              { label: "Iss. %", field: "iss" },
              { label: "Sale Amount", field: "saleAmount,showSum: true" },
            ]}
            rows={
              reportsData?.data
                ? reportsData?.data?.payLoad.map(
                    (item: DailyProduction, index: number) => {
                      return {
                        sr: index + 1,
                        [selectedField]: item?.[selectedField]
                          ? item?.[selectedField]
                          : "-",
                        qty: item?.quantity ? item?.quantity : 0,
                        weightLbs: item?.weightLbs
                          ? roundValue(item?.weightLbs)
                          : 0,
                        weightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        amountKgs: item?.amountkgs
                          ? roundValue(item?.amountkgs)
                          : 0,
                        amountLbs: item?.amountlbs
                          ? roundValue(item?.amountlbs)
                          : 0,
                        prodValue: item?.prodValue
                          ? roundValue(item?.prodValue)
                          : 0,
                        amountIssKgs: "-",
                        amountIssLbs: "-",
                        pro: "-",
                        iss: "-",
                        saleAmount: 0.0,
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
            isLoading={reportsData.isFetching}
            tableTitle="Daily Production Report"
            columns={[
              { label: "Sr. No.", field: "sr" },
              { label: "Sale Order Reference", field: "saleOrderReference" },
              { label: "Bundles", field: "bundles" },
              { label: "Qty", field: "qty", showSum: true },
              { label: "Weight KGS", field: "weightKgs", showSum: true },
              { label: "Weight LBS", field: "weightLbs", showSum: true },
              { label: "Prod. Value", field: "prodValue", showSum: true },
              { label: "Amount/KGS", field: "amountKgs", showSum: true },
              { label: "Amount/LBS", field: "amountLbs", showSum: true },
              { label: "Amount/Iss. KGS", field: "amountIssKgs" },
              { label: "Amount/Iss. LBS", field: "amountIssLbs" },
              { label: "Pro. %", field: "pro" },
              { label: "Iss. %", field: "iss" },
              { label: "Sale Amount", field: "saleAmount", showSum: true },
            ]}
            rows={
              reportsData?.data
                ? reportsData?.data?.payLoad.map(
                    (item: DailyProduction, index: number) => {
                      return {
                        sr: index + 1,
                        saleOrderReference: item?.saleOrderReference
                          ? item?.saleOrderReference
                          : "-",
                        bundles: "-",
                        qty: item?.quantity ? item?.quantity : 0,
                        weightLbs: item?.weightLbs
                          ? roundValue(item?.weightLbs)
                          : 0,
                        weightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        amountKgs: item?.amountkgs
                          ? roundValue(item?.amountkgs)
                          : 0,
                        amountLbs: item?.amountlbs
                          ? roundValue(item?.amountlbs)
                          : 0,
                        prodValue: item?.prodValue
                          ? roundValue(item?.prodValue)
                          : 0,
                        amountIssKgs: "-",
                        amountIssLbs: "-",
                        pro: "-",
                        iss: "-",
                        saleAmount: 0.0,
                      };
                    }
                  )
                : []
            }
          />
        )}
        {selectedField === "variance" && (
          <DataTable
            ref={ref}
            tableTitle="Daily Production Report"
            isLoading={reportsData.isFetching}
            columns={[
              { label: "Sr. No.", field: "sr" },
              { label: "Item Code", field: "itemCode" },
              { label: "Item Name", field: "itemName" },
              { label: "Grade", field: "grade" },
              { label: "Budget Qty", field: "budgetQty", showSum: true },
              { label: "Pro Qty", field: "proQty", showSum: true },
              { label: "Variance", field: "variance" },
              { label: "Weight KGS", field: "weightKgs", showSum: true },
              { label: "Weight LBS", field: "weightLbs", showSum: true },
              { label: "Prod. Value", field: "prodValue", showSum: true },
              { label: "Amount/KGS", field: "amountKgs", showSum: true },
              { label: "Amount/LBS", field: "amountLbs", showSum: true },
              { label: "Amount/Iss. KGS", field: "amountIssKgs" },
              { label: "Amount/Iss. LBS", field: "amountIssLbs" },
              { label: "Pro. %", field: "pro" },
              { label: "Iss. %", field: "iss" },
              { label: "Sale Amount", field: "saleAmount", showSum: true },
            ]}
            rows={
              reportsData?.data
                ? reportsData?.data?.payLoad.map(
                    (item: DailyProduction, index: number) => {
                      return {
                        sr: index + 1,
                        itemCode: item?.itemCode ? item?.itemCode : "-",
                        itemName: item?.itemName ? item?.itemName : "-",
                        grade: item?.gradeName ? item?.gradeName : "-",
                        budgetQty: item?.budgetQty ? item?.budgetQty : 0,
                        proQty: item?.proQty ? item?.proQty : 0,
                        variance: item?.variance ? item?.variance : 0,
                        weightLbs: item?.weightLbs
                          ? roundValue(item?.weightLbs)
                          : 0,
                        weightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        amountKgs: item?.amountkgs
                          ? roundValue(item?.amountkgs)
                          : 0,
                        amountLbs: item?.amountlbs
                          ? roundValue(item?.amountlbs)
                          : 0,
                        prodValue: item?.prodValue
                          ? roundValue(item?.prodValue)
                          : 0,
                        amountIssKgs: "-",
                        amountIssLbs: "-",
                        pro: "-",
                        iss: "-",
                        saleAmount: 0.0,
                      };
                    }
                  )
                : []
            }
          />
        )}
        {selectedField === "date" && (
          <DataTable
            ref={ref}
            tableTitle="Daily Production Report"
            isLoading={reportsData.isFetching}
            columns={[
              { label: "Sr. No.", field: "sr" },
              { label: "Date", field: "date" },
              { label: "Qty", field: "qty" },
              { label: "Weight KGS", field: "weightKgs", showSum: true },
              { label: "Weight LBS", field: "weightLbs", showSum: true },
              { label: "Cost Price", field: "costPrice", showSum: true },
              { label: "Cost Price/LBS", field: "costPerLbs", showSum: true },
              { label: "Prod. Value", field: "prodValue", showSum: true },
              { label: "Amount/KGS", field: "amountKgs", showSum: true },
              { label: "Amount/LBS", field: "amountLbs", showSum: true },
              { label: "Amount/Iss. KGS", field: "amountIssKgs" },
              { label: "Amount/Iss. LBS", field: "amountIssLbs" },
              { label: "Pro. %", field: "pro" },
              { label: "Iss. %", field: "iss" },
              { label: "Sale Amount", field: "saleAmount", showSum: true },
            ]}
            rows={
              reportsData?.data
                ? reportsData?.data?.payLoad.map(
                    (item: DailyProduction, index: number) => {
                      return {
                        sr: index + 1,
                        date: item?.date ? getDateFromMillis(item?.date) : "-",
                        qty: item?.quantity ? item?.quantity : "-",
                        weightLbs: item?.weightLbs
                          ? roundValue(item?.weightLbs)
                          : 0,
                        weightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        costPrice: item?.costPrice
                          ? roundValue(item?.costPrice)
                          : 0,
                        costPerLbs: item?.costPrice
                          ? roundValue(item?.costPrice)
                          : 0,
                        amountKgs: item?.amountkgs
                          ? roundValue(item?.amountkgs)
                          : 0,
                        amountLbs: item?.amountlbs
                          ? roundValue(item?.amountlbs)
                          : 0,
                        prodValue: item?.prodValue
                          ? roundValue(item?.prodValue)
                          : 0,
                        amountIssKgs: "-",
                        amountIssLbs: "-",
                        pro: "-",
                        iss: "-",
                        saleAmount: 0.0,
                      };
                    }
                  )
                : []
            }
          />
        )}
        {selectedField == "department" && (
          <DataTable
            ref={ref}
            tableTitle="Daily Production Report"
            isLoading={reportsData.isFetching}
            columns={[
              { label: "Sr. No.", field: "sr" },
              {
                label: "Department",

                field: "department",
              },
              { label: "Qty", field: "qty" },
              { label: "Weight KGS", field: "weightKgs", showSum: true },
              { label: "Weight LBS", field: "weightLbs", showSum: true },
              { label: "Prod. Value", field: "prodValue", showSum: true },
              { label: "Cost Price", field: "costPrice", showSum: true },
              { label: "Amount/KGS", field: "amountKgs", showSum: true },
              { label: "Amount/LBS", field: "amountLbs", showSum: true },
              { label: "Amount/Iss. KGS", field: "amountIssKgs" },
              { label: "Amount/Iss. LBS", field: "amountIssLbs" },
              { label: "Pro. %", field: "pro" },
              { label: "Iss. %", field: "iss" },
              { label: "Sale Amount", field: "saleAmount", showSum: true },
            ]}
            rows={
              reportsData?.data
                ? reportsData?.data?.payLoad.map(
                    (item: DailyProduction, index: number) => {
                      return {
                        sr: index + 1,
                        department: item?.departmentName
                          ? item?.departmentName
                          : "-",
                        qty: item?.quantity ? item?.quantity : 0,
                        weightLbs: item?.weightLbs
                          ? roundValue(item?.weightLbs)
                          : 0,
                        weightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        amountKgs: item?.amountkgs
                          ? roundValue(item?.amountkgs)
                          : 0,
                        amountLbs: item?.amountlbs
                          ? roundValue(item?.amountlbs)
                          : 0,
                        prodValue: item?.prodValue
                          ? roundValue(item?.prodValue)
                          : 0,
                        costPrice: item?.costPrice
                          ? roundValue(item?.costPrice)
                          : 0,
                        amountIssKgs: "-",
                        amountIssLbs: "-",
                        pro: "-",
                        iss: "-",
                        saleAmount: 0.0,
                      };
                    }
                  )
                : []
            }
          />
        )}

        {selectedField === "null" && nullSelectedData
          ? nullSelectedData.map((outeritem: DailyProduction) => (
              <>
                <span className="d-flex align-items-center mt-4 mb-2 ">
                  <MDBIcon fab icon="dropbox" />
                  <div className="ms-2 fs-6 text-capitalize">
                    {outeritem.itemName}
                  </div>
                </span>
                <DataTable
                  ref={ref}
                  tableTitle="Daily Production Report"
                  isLoading={reportsData.isFetching}
                  columns={[
                    { label: "Sr. No.", field: "sr" },
                    { label: "Unit Code", field: "code" },
                    { label: "category", field: "category" },
                    { label: "Item", field: "itemName" },
                    { label: "Label Type", field: "labelType" },
                    { label: "Stock Room", field: "stockRoom" },
                    { label: "Brand Item Code", field: "brandCodeName" },
                    { label: "Brand Code", field: "brandName" },
                    { label: "Qty", field: "qty", showSum: true },
                    {
                      label: "Weight KGS",
                      field: "weightKgs",
                      showSum: true,
                    },
                    {
                      label: "Weight LBS",
                      field: "weightLbs",
                      showSum: true,
                    },
                    {
                      label: "Prod. Value",
                      field: "prodValue",
                      showSum: true,
                    },
                    {
                      label: "Amount/KGS",
                      field: "amountKgs",
                      showSum: true,
                    },
                    {
                      label: "Amount/LBS",
                      field: "amountLbs",
                      showSum: true,
                    },
                    {
                      label: "Sale Amount",
                      field: "saleAmount",
                      showSum: true,
                    },
                    {
                      label: "Sale Rate",
                      field: "saleRate",
                      showSum: true,
                    },
                  ]}
                  rows={(reportsData?.data?.payLoad ?? [])
                    .filter((item: DailyProduction) => {
                      return outeritem.itemName === item.itemName;
                    })
                    .map((filteredItem, index) => {
                      return {
                        sr: index + 1,
                        code: filteredItem?.unitCode ?? "-",
                        category: filteredItem?.categoryName ?? "-",
                        itemName: filteredItem?.itemName ?? "-",
                        labelType: filteredItem?.labelType ?? "-",
                        stockRoom: filteredItem?.stockRoom ?? "-",
                        brandName: filteredItem?.brandName ?? "-",
                        brandCodeName: filteredItem?.brandCode ?? "-",
                        qty: filteredItem?.quantity ?? 0,
                        weightLbs: filteredItem?.weightLbs
                          ? roundValue(filteredItem?.weightLbs)
                          : 0,
                        weightKgs: filteredItem?.weightKgs
                          ? roundValue(filteredItem?.weightKgs)
                          : 0,
                        amountKgs: filteredItem?.amountkgs
                          ? roundValue(filteredItem?.amountkgs)
                          : 0,
                        amountLbs: filteredItem?.amountlbs
                          ? roundValue(filteredItem?.amountlbs)
                          : 0,
                        prodRate: filteredItem?.prodRate
                          ? roundValue(filteredItem?.prodRate)
                          : 0,
                        prodValue: filteredItem?.prodValue
                          ? roundValue(filteredItem?.prodValue)
                          : 0,
                        costPrice: filteredItem?.costPrice
                          ? roundValue(filteredItem?.costPrice)
                          : 0.0,
                        saleRate: 0.0,
                        saleAmount: 0.0,
                      };
                    })}
                />
              </>
            ))
          : null}

        {selectedField === "categoryItem" && categoryItemSelectedData
          ? categoryItemSelectedData.map((outeritem: DailyProduction) => (
              <DataTable
                ref={ref}
                isLoading={reportsData.isFetching}
                tableTitle="Daily Production Report"
                columns={[
                  { label: "Sr. No.", field: "sr" },
                  { label: "Item Code", field: "itemCode" },
                  { label: "Item", field: "itemName" },
                  { label: "Grade", field: "grade" },
                  { label: "Qty", field: "qty", showSum: true },
                  { label: "UOM", field: "uom" },
                  {
                    label: "Unit Pieces",
                    field: "unitPieces",
                    showSum: true,
                  },
                  { label: "Prod. Rate", field: "prodRate", showSum: true },
                  { label: "Weight KGS", field: "weightKgs", showSum: true },
                  { label: "Weight LBS", field: "weightLbs", showSum: true },
                  { label: "Prod. Value", field: "prodValue", showSum: true },
                  { label: "Amount/KGS", field: "amountKgs", showSum: true },
                  { label: "Amount/LBS", field: "amountLbs", showSum: true },
                  {
                    label: "Amount/Issu. KGS",
                    field: "amountKgs",
                    showSum: true,
                  },
                  {
                    label: "Amount/Issu. LBS",
                    field: "amountLbs",
                    showSum: true,
                  },
                  { label: "Prod. %", field: "prodpercentage" },
                  { label: "Issuance %", field: "issupercentage" },
                  {
                    label: "Sale Amount",
                    field: "saleAmount",
                    showSum: true,
                  },
                ]}
                rows={(reportsData?.data?.payLoad ?? [])
                  .filter((item: DailyProduction) => {
                    return outeritem.categoryName == item.categoryName;
                  })
                  .map((filteredItem, index) => {
                    return {
                      sr: index + 1,
                      itemCode: filteredItem?.itemCode ?? "-",
                      itemName: filteredItem?.itemName ?? "-",
                      grade: filteredItem?.gradeName ?? "-",
                      qty: filteredItem?.quantity ?? 0,
                      uom: filteredItem?.unitOfMeasurement
                        ? filteredItem?.unitOfMeasurement
                        : "",
                      unitPieces: filteredItem?.unitPieces
                        ? filteredItem?.unitPieces
                        : "",
                      weightLbs: filteredItem?.weightLbs
                        ? roundValue(filteredItem?.weightLbs)
                        : 0,
                      weightKgs: filteredItem?.weightKgs
                        ? roundValue(filteredItem?.weightKgs)
                        : 0,
                      amountKgs: filteredItem?.amountkgs
                        ? roundValue(filteredItem?.amountkgs)
                        : 0,
                      amountLbs: filteredItem?.amountlbs
                        ? roundValue(filteredItem?.amountlbs)
                        : 0,
                      prodRate: filteredItem?.prodRate
                        ? roundValue(filteredItem?.prodRate)
                        : 0,
                      prodValue: filteredItem?.prodValue
                        ? roundValue(filteredItem?.prodValue)
                        : 0,
                      costPrice: filteredItem?.costPrice
                        ? roundValue(filteredItem?.costPrice)
                        : 0.0,
                      prodpercentage: "-",
                      issupercentage: "-",
                      saleRate: 0.0,
                      saleAmount: 0.0,
                    };
                  })}
              />
            ))
          : null}

        {selectedField === "packagingUnitItem" && quantityUnitSelectedData
          ? quantityUnitSelectedData.map(
              (quantityUnitItem: DailyProduction) => (
                <DataTable
                  ref={ref}
                  tableTitle="Daily Production Report"
                  isLoading={reportsData.isFetching}
                  columns={[
                    { label: "Sr. No.", field: "sr" },
                    { label: "Quantity Unit", field: "quantityUnit" },
                    { label: "Item", field: "itemName" },
                    { label: "Qty", field: "qty" },
                    {
                      label: "Weight KGS",
                      field: "weightKgs",
                      showSum: true,
                    },
                    {
                      label: "Weight LBS",
                      field: "weightLbs",
                      showSum: true,
                    },
                    {
                      label: "Prod. Value",
                      field: "prodValue",
                      showSum: true,
                    },
                    {
                      label: "Amount/KGS",
                      field: "amountKgs",
                      showSum: true,
                    },
                    {
                      label: "Amount/LBS",
                      field: "amountLbs",
                      showSum: true,
                    },
                    { label: "Amount/Issu. KGS", field: "amountKgs" },
                    { label: "Amount/Issu. LBS", field: "amountLbs" },
                    { label: "Prod. %", field: "prodpercentage" },
                    { label: "Issuance %", field: "issupercentage" },
                    {
                      label: "Sale Amount",
                      field: "saleAmount",
                      showSum: true,
                    },
                  ]}
                  rows={(reportsData?.data?.payLoad ?? [])
                    .filter((item: DailyProduction) => {
                      return (
                        quantityUnitItem.packagingUnitName ===
                        item.packagingUnitName
                      );
                    })
                    .map((filteredItem, index) => {
                      return {
                        sr: index + 1,
                        quantityUnit: filteredItem?.packagingUnitName ?? "-",
                        itemName: filteredItem?.itemName ?? "-",
                        qty: filteredItem?.quantity ?? 0,
                        weightLbs: filteredItem?.weightLbs
                          ? roundValue(filteredItem?.weightLbs)
                          : 0,
                        weightKgs: filteredItem?.weightKgs
                          ? roundValue(filteredItem?.weightKgs)
                          : 0,
                        amountKgs: filteredItem?.amountkgs
                          ? roundValue(filteredItem?.amountkgs)
                          : 0,
                        amountLbs: filteredItem?.amountlbs
                          ? roundValue(filteredItem?.amountlbs)
                          : 0,
                        prodValue: filteredItem?.prodValue
                          ? roundValue(filteredItem?.prodValue)
                          : 0,
                        costPrice: filteredItem?.costPrice
                          ? roundValue(filteredItem?.costPrice)
                          : 0.0,
                        prodpercentage: "-",
                        issupercentage: "-",
                        saleAmount: 0.0,
                      };
                    })}
                />
              )
            )
          : null}
      </div>
    </div>
  );
}
