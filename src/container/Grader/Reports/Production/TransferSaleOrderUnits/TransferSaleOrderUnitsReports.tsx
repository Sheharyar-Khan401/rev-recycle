import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import ProductionReportsSidenav from "components/Reports/ProductionReporsSidenav";
import { useLazyGetTransferSaleOrderUnitsReportsQuery } from "redux/features/productions/Reports/TransferSaleOrderUnitsReportsApiSlice";
import { TransferSaleOrderUnits } from "redux/types/Productions/Reports/TransferSaleOrderUnits";
import { getDateFromMillis } from "helper/utility";
import { useGetStockRoomsQuery } from "redux/features/Settings/Productions/stockroomsApiSlice";
import { useGetAllSaleOrdersQuery } from "redux/features/sales/Orders/saleOrdersApiSlice";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";

export default function TransferSaleOrderUnitsReports() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [getReports, reportsData] =
    useLazyGetTransferSaleOrderUnitsReportsQuery();
  const { data: stockRoomData } = useGetStockRoomsQuery(null);
  const { data: saleOrderData } = useGetAllSaleOrdersQuery(null);
  const { data: productionItemsData } = useGetAllProductionItemsQuery(null);
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  useEffect(() => {
    getReports(queryParams);
  }, [queryParams, getReports]);
  return (
    <>
      <div className="d-lg-flex">
        <div>
          <ProductionReportsSidenav type={7} />
        </div>
        <div className="table-container">
          <Filters
            componentRef={ref}
            printAble={(reportsData?.data
              && reportsData?.data?.payLoad.length > 0)??false}
            exportAble={(reportsData?.data
              && reportsData?.data?.payLoad.length > 0)??false}
            filters={[
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
                label: "From Sale Order",
                name: "fromSaleOrderIds",
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
                label: "To Sale Order",
                name: "toSaleOrderIds",
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
                label: "From Stock Room",
                name: "fromStockRoomIds",
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
                label: "To Stock Room",
                name: "toStockRoomIds",
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
                  pageNumber: queryParams.pageNumber,
                  pageSize: queryParams.pageSize,
                  startDate: queryParams.startDate,
                  endDate: queryParams.endDate,
                });
              } else setQueryParams({ ...queryParams, ...query });
            }}
          />

          <DataTable
            ref={ref}
            tableTitle="Transfer Sale Order Units Reports"
            isLoading={reportsData.isFetching}
            columns={[
              { label: "Sr. No.", field: "sr" },
              { label: "Scan Date", field: "scanDate" },
              { label: "Item Name", field: "item" },
              { label: "Unit Code", field: "unitcode" },
              { label: "From SO Ref", field: "fromSoRef" },
              { label: "To SO Ref", field: "toSoRef" },
              { label: "From Stockroom", field: "fromStockroom" },
              { label: "To Stockroom", field: "toStockroom" },
            ]}
            rows={
              reportsData?.data
                ? reportsData?.data?.payLoad.map(
                    (item: TransferSaleOrderUnits, index: number) => {
                      return {
                        sr: index + 1,
                        scanDate: getDateFromMillis(item?.scanDate),
                        item: item?.itemName ? item?.itemName : "-",
                        unitcode: item?.unitCode ? item?.unitCode : "-",
                        fromSoRef: item?.fromSaleorder
                          ? item?.fromSaleorder
                          : "-",
                        toSoRef: item?.toSaleOrder ? item?.toSaleOrder : "-",
                        fromStockroom: item?.fromStockRoom
                          ? item?.fromStockRoom
                          : "-",
                        toStockroom: item?.toStockRoom
                          ? item?.toStockRoom
                          : "-",
                      };
                    }
                  )
                : []
            }
          />
        </div>
      </div>
    </>
  );
}
