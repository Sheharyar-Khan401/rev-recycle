import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import SalesReportsSideNav from "components/Reports/SalesReportsSidenav";
import { useLazyGetPriceComparisonReportsQuery } from "redux/features/sales/clientitemrates/clientitemratesApiSlice";
import { PriceComparisonReports } from "redux/types/Sales/ClientItemRates/clientitemsrates";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import { useGetLabelTypesQuery } from "redux/features/Settings/Productions/labeltypesApiSlice";
interface ResultItem {
  itemName: string;
  [key: string]: number | string; // Define the type for customerName properties
}
export default function PriceComparison() {
  const ref = useRef<HTMLInputElement | null>(null);
  const { data: categoryData } = useGetCategoryQuery(true);
  const { data: supplierData } = useGetAllClientsQuery(null);
  const { data: productionItemsData } = useGetAllProductionItemsQuery(null);
  const { data: labelTypesData } = useGetLabelTypesQuery(null);
  const [triggerPriceComparisonReports, getPriceComparisonReports] =
    useLazyGetPriceComparisonReportsQuery();

  const [queryParams, setQueryParams] = useState({});
  useEffect(() => {
    triggerPriceComparisonReports(queryParams);
  }, [queryParams]);

  function extractColumns(payLoad: PriceComparisonReports[]) {
    if (payLoad && payLoad?.length > 0) {
      const customerNamesSet = new Set<string>();
      let itemNameAdded = false; // Flag to track whether "ItemName" has been added

      const extractedPayload = payLoad.reduce(
        (
          result: {
            label: string;
            field: string;
          }[],
          item: PriceComparisonReports
        ) => {
          const customerName = item?.customerName;

          if (!customerNamesSet.has(customerName)) {
            customerNamesSet.add(customerName);

            // Add the hardcoded "ItemName" field and label only if it hasn't been added yet
            if (!itemNameAdded) {
              result.push({
                label: "Item Name",
                field: "itemName",
              });
              itemNameAdded = true; // Set the flag to true
            }

            result.push({
              label: customerName,
              field: customerName,
            });
          }

          return result;
        },
        []
      );

      return extractedPayload;
    } else {
      return [];
    }
  }
  function extractColumnsFoRFilters(payLoad: PriceComparisonReports[]) {
    if (payLoad && payLoad?.length > 0) {
      const customerNamesSet = new Set<string>();
      let itemNameAdded = false; // Flag to track whether "ItemName" has been added

      const extractedPayload = payLoad.reduce(
        (result: string[], item: PriceComparisonReports) => {
          const customerName = item?.customerName;

          if (!customerNamesSet.has(customerName)) {
            customerNamesSet.add(customerName);

            // Add the hardcoded "ItemName" field and label only if it hasn't been added yet
            if (!itemNameAdded) {
              result.push("Item Name");
              itemNameAdded = true; // Set the flag to true
            }

            result.push(customerName);
          }

          return result;
        },
        []
      );

      return extractedPayload;
    } else {
      return [];
    }
  }
  function extractRows(payLoad: PriceComparisonReports[]) {
    if (payLoad && payLoad.length > 0) {
      const extractedRows: ResultItem[] = [];

      payLoad.forEach((item) => {
        const existingItem = extractedRows.find(
          (resultItem) => resultItem.itemName === item.itemName
        );
        if (existingItem) {
          existingItem[item.customerName] = item?.price; // Set the customer's value to 0
        } else {
          const newItem: ResultItem = { itemName: item.itemName };
          newItem[item.customerName] = item?.price;
          extractedRows.push(newItem);
        }
      });
      return extractedRows;
    } else return [];
  }

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <SalesReportsSideNav type={10} />
          <div className="table-container">
            <Filters
              componentRef={ref}
              printAble={
                (getPriceComparisonReports?.data?.payLoad &&
                  getPriceComparisonReports?.data?.payLoad.length > 0) ??
                false
              }
              exportAble={
                (getPriceComparisonReports?.data?.payLoad &&
                  getPriceComparisonReports?.data?.payLoad.length > 0) ??
                false
              }
              filters={[
                {
                  label: "Client",
                  name: "customerIds",
                  inputType: "multiselect",
                  options: supplierData
                    ? supplierData?.map((supplier) => {
                        return {
                          text: supplier?.user ? supplier?.user?.fullName : "",
                          value: supplier?.clientId ? supplier?.clientId : 0,
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
                  label: "Production Item",
                  name: "itemIds",
                  inputType: "multiselect",
                  options: productionItemsData
                    ? productionItemsData?.map((productionItem) => {
                        return {
                          text: productionItem?.name
                            ? productionItem?.name
                            : "",
                          value: productionItem?.itemId
                            ? productionItem?.itemId
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
                          value: category?.categoryId
                            ? category?.categoryId
                            : 0,
                        };
                      })
                    : [],
                },
              ]}
              onSubmit={(query) => {
                if (Object.keys(query).length === 0) {
                  setQueryParams({});
                } else setQueryParams({ ...queryParams, ...query });
              }}
            />
            <DataTable
              ref={ref}
              tableTitle="Price Comparison"
              isLoading={getPriceComparisonReports.isFetching}
              columns={extractColumns(
                getPriceComparisonReports?.data?.payLoad ?? []
              )}
              rows={extractRows(getPriceComparisonReports?.data?.payLoad ?? [])}
            />
          </div>
        </div>
      </div>
    </>
  );
}
