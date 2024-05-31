import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import SalesReportsSideNav from "components/Reports/SalesReportsSidenav";
import { useLazyGetPriceListQuery } from "redux/features/sales/Reports/PriceListApiSlice";
import { PriceList } from "redux/types/Sales/Reports/PriceList";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import { useGetOrderStatusQuery } from "redux/features/purchase/Order/OrderStatusApiSlice";
import { useGetuomQuery } from "redux/features/uom/uomApiSlice";

export default function PriceListReports() {
  const ref = useRef<HTMLInputElement | null>(null);
  const { data: categoryData } = useGetCategoryQuery(true);
  const { data: supplierData } = useGetAllClientsQuery(null);
  const { data: orderStatusData } = useGetOrderStatusQuery(null);
  const { data: productionItemsData } = useGetAllProductionItemsQuery(null);
  const { data: uomData } = useGetuomQuery(null);
  const [getPriceList, reportsData] = useLazyGetPriceListQuery();
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    getPriceList(queryParams);
  }, [queryParams, getPriceList]);

  const rows = reportsData?.data
    ? reportsData?.data?.payLoad.map((item: PriceList, index: number) => {
        return {
          sr: index + 1,
          item: item?.itemName ? item?.itemName : "-",
          category: item?.categoryName ? item?.categoryName : "-",
          labelType: item?.labelType ? item?.labelType : "-",
          weightLbs: item?.weightLbs ? item?.weightLbs : "-",
          itemCode: item?.itemCode ? item?.itemCode : "-",
          status: item?.status === "act" ? "Yes" : "No",
          uom: item?.unitOfMeasurement ? item?.unitOfMeasurement : "-",
          unitPieces: item?.unitPieces ? item?.unitPieces : 0,
          grade: item?.grade ? item?.grade : "-",
        };
      })
    : [];

  return (
    <>
      <div className="d-lg-flex">
        <div>
          <SalesReportsSideNav type={3} />
        </div>
        <div className="table-container">
          <Filters
            componentRef={ref}
            printAble={rows.length > 0}
            exportAble={rows.length > 0}
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
                label: "Production Item",
                name: "itemIds",
                inputType: "multiselect",
                options: productionItemsData
                  ? productionItemsData?.map((productionItem) => {
                      return {
                        text: productionItem?.name ? productionItem?.name : "",
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
                        value: category?.categoryId ? category?.categoryId : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Order Status",
                name: "orderStatusId",
                inputType: "select",
                options: orderStatusData
                  ? orderStatusData?.map((orderStatus) => {
                      return {
                        text: orderStatus?.name ? orderStatus?.name : "",
                        value: orderStatus?.orderStatusId
                          ? orderStatus?.orderStatusId
                          : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Unit of Measurement",
                name: "unitIds",
                inputType: "multiselect",
                options: uomData
                  ? uomData?.map((uom) => {
                      return {
                        text: uom?.name ? uom?.name : "",
                        value: uom?.unitId ? uom?.unitId : 0,
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
            tableTitle="Sales Price List"
            isLoading={reportsData.isFetching}
            columns={[
              { label: "Sr. No.", field: "sr" },
              { label: "Item", field: "item" },
              { label: "Category", field: "category" },
              { label: "Label Type", field: "labelType" },
              { label: "Weight LBS", field: "weightLbs" },
              { label: "Item Code", field: "itemCode" },
              { label: "Status", field: "status" },
              { label: "UOM", field: "uom" },
              { label: "Unit Pieces", field: "unitPieces" },
              { label: "Grade", field: "grade" },
            ]}
            rows={rows}
          />
        </div>
      </div>
    </>
  );
}
