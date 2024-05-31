import PurchaseReportsSideNav from "components/Reports/PurchaseReportsSidenav";
import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import { useLazyGetStockRoomItemsReportsQuery } from "redux/features/purchase/Order/OrderApiSlice";
import { StockRoomItemsReports } from "redux/types/Orders/orders";
import { useGetStockRoomsQuery } from "redux/features/Settings/Productions/stockroomsApiSlice";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { roundValue, convertWghtToLbs } from "helper/utility";
import { MDBIcon } from "mdb-react-ui-kit";
import { useGetAllItemsinPurchaseOrdersQuery } from "redux/features/Settings/purchase/itemApiSlice";
export default function StockRoomItems() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [triggerStockRoomItemsReports, getStockRoomItemsReports] =
    useLazyGetStockRoomItemsReportsQuery();
  const { data: stockRoomData } = useGetStockRoomsQuery(null);
  const { data: categoryData } = useGetCategoryQuery(false);
  const { data: invoiceTypeData } = useGetInvoiceTypesQuery(null);
  const { data: purchaseItemsData } = useGetAllItemsinPurchaseOrdersQuery(null);
  const [itemsData, setItemsData] = useState<StockRoomItemsReports[]>([]);

  const [queryParams, setQueryParams] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  useEffect(() => {
    triggerStockRoomItemsReports(queryParams);
  }, [queryParams]);

  useEffect(() => {
    if (getStockRoomItemsReports?.data && getStockRoomItemsReports?.data) {
      const itemMap = new Map(); // Map to store items based on itemId

      getStockRoomItemsReports?.data.payLoad?.forEach(
        (item: StockRoomItemsReports) => {
          const itemId = item?.itemId;
          if (itemId && !itemMap.has(itemId)) {
            itemMap.set(itemId, {
              item: item?.item ? item?.item : "-",
              category: item?.category ? item?.category : "-",
              itemId: item?.itemId,
              supplier: item?.supplier ? item?.supplier : "-",
              type: item?.type ? item?.type : "-",
              containerNo: item?.containerNo ? item?.containerNo : "-",
              referenceNo: item?.referenceNo ? item?.referenceNo : "-",
              stockRoom: item?.stockRoom ? item?.stockRoom : "-",
              quantity: item?.quantity ? item?.quantity : 0,
              weightKgs: item?.weightKgs ? item?.weightKgs : 0,
              weightLbs: item?.weightKgs ? item?.weightKgs : 0,
            });
          }
        }
      );

      const allUniqueItems = Array.from(itemMap.values());
      setItemsData(allUniqueItems);
    }
  }, [getStockRoomItemsReports]);
  return (
    <div className="d-lg-flex">
      <PurchaseReportsSideNav type={14} />
      <div className="table-container">
        <Filters
          componentRef={ref}
          printAble={
            false
          }
          exportAble={
            (getStockRoomItemsReports?.data &&
              getStockRoomItemsReports?.data?.payLoad.length > 0) ??
            false
          }
          filters={[
            {
              label: "Item",
              name: "itemIds",
              inputType: "multiselect",
              options: purchaseItemsData
                ? purchaseItemsData?.map((item) => {
                    return {
                      text: item?.name ? item?.name : "",
                      value: item?.itemId ? item?.itemId : 0,
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
              label: "Invoice Type",
              name: "invoiceTypeIds",
              inputType: "multiselect",
              options: invoiceTypeData
                ? invoiceTypeData?.map((invoicetype) => {
                    return {
                      text: invoicetype?.name ? invoicetype?.name : "",
                      value: invoicetype?.invoiceTypeId
                        ? invoicetype?.invoiceTypeId
                        : 0,
                    };
                  })
                : [],
            },

            {
              label: "Stock Room",
              name: "stockRoomId",
              inputType: "select",
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
                startDate: queryParams.startDate,
                endDate: queryParams.endDate,
              });
            } else setQueryParams({ ...queryParams, ...query });
          }}
        />
        {itemsData
          ? itemsData?.map((item: StockRoomItemsReports) => (
              <div className="mb-4">
                <span className="d-flex align-items-center mt-4 mb-2 ">
                  <MDBIcon fab icon="dropbox" />
                  <div className="ms-2 fs-6 text-capitalize">{item.item}</div>
                </span>
                <DataTable
                  key={item.item}
                  ref={ref}
                  tableTitle="Stock Room Items Reports"
                  isLoading={getStockRoomItemsReports.isFetching}
                  columns={[
                    { label: "Item", field: "item" },
                    { label: "Unit Code", field: "code" },
                    { label: "Category", field: "category" },
                    { label: "Supplier", field: "supplier" },
                    { label: "Type", field: "type" },
                    { label: "Container No", field: "containerNo" },
                    { label: "Reference No", field: "referenceNo" },
                    { label: "Stock Room", field: "stockRoom" },
                    { label: "Quantity", field: "quantity", showSum: true },
                    { label: "Weight(Kgs)", field: "weightKgs", showSum: true },
                    { label: "Weight(Lbs)", field: "weightLbs", showSum: true },
                  ]}
                  rows={
                    getStockRoomItemsReports?.data
                      ? getStockRoomItemsReports?.data?.payLoad
                          .filter(
                            (rowItem: StockRoomItemsReports) =>
                              item.itemId == rowItem.itemId
                          )
                          .map((item: StockRoomItemsReports) => ({
                            item: item?.item ? item?.item : "-",
                            code: item?.code ? item?.code : "-",
                            category: item?.category ? item?.category : "-",
                            supplier: item?.supplier ? item?.supplier : "-",
                            type: item?.type ? item?.type : "-",
                            containerNo: item?.containerNo
                              ? item?.containerNo
                              : "-",
                            referenceNo: item?.referenceNo
                              ? item?.referenceNo
                              : "-",
                            stockRoom: item?.stockRoom ? item?.stockRoom : "-",
                            quantity: item?.quantity ? item?.quantity : 0,
                            weightKgs: item?.weightKgs
                              ? roundValue(item?.weightKgs)
                              : 0,
                            weightLbs: item?.weightKgs
                              ? roundValue(convertWghtToLbs(item?.weightKgs))
                              : 0,
                          }))
                      : []
                  }
                />
              </div>
            ))
          : []}
      </div>
    </div>
  );
}
