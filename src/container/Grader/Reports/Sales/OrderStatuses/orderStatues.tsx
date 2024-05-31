import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import SalesReportsSideNav from "components/Reports/SalesReportsSidenav";
import {
  useGetAllSaleOrdersQuery,
  useLazyGetOrderStatusesReportsQuery,
} from "redux/features/sales/Orders/saleOrdersApiSlice";
import { OrderStatusesReport } from "redux/types/Orders/saleOrders";
import { getDateFromMillis } from "helper/utility";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
export default function OrderStatuses() {
  const [triggerOrderStatusesReports, getOrderStatusesReports] =
    useLazyGetOrderStatusesReportsQuery();
  const ref = useRef<HTMLInputElement | null>(null);
  const { data: categoryData } = useGetCategoryQuery(true);
  const { data: supplierData } = useGetAllClientsQuery(null);
  const { data: saleOrderData } = useGetAllSaleOrdersQuery(null);
  const { data: productionItemsData } = useGetAllProductionItemsQuery(null);
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    triggerOrderStatusesReports(queryParams);
  }, [queryParams]);

  const rows = getOrderStatusesReports?.data
    ? getOrderStatusesReports?.data?.payLoad?.map(
        (item: OrderStatusesReport) => {
          return {
            date: getDateFromMillis(item?.date),
            customer: item?.customer ? item?.customer : "-",
            reference: item?.reference ? item?.reference : "-",
            totalQuantity: item?.total ? item?.total : 0,
            proQuantity: item?.pro ? item?.pro : 0,
            balanceQuantity: item?.bal ? item?.bal : 0,
            soldQuantity: item?.sold ? item?.sold : 0,
            psQuantity: item?.ps ? item?.ps : 0,
          };
        }
      )
    : [];
  return (
    <>
      <div>
        <div className="d-lg-flex">
          <SalesReportsSideNav type={9} />
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
                  label: "Sale Order",
                  name: "saleOrderIds",
                  inputType: "multiselect",
                  options: saleOrderData
                    ? saleOrderData?.payLoad?.map((saleOrder) => {
                        return {
                          text: saleOrder?.reference
                            ? saleOrder?.reference
                            : "",
                          value: saleOrder?.saleOrderId
                            ? saleOrder?.saleOrderId
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
              tableTitle="Sales Order Statuses"
              isLoading={getOrderStatusesReports.isFetching}
              columns={[
                { label: "Date", field: "date" },
                { label: "Customer", field: "customer" },
                { label: "Reference", field: "reference" },
                { label: "Total Quantity", field: "totalQuantity" },
                { label: "Pro Quantity", field: "proQuantity" },
                { label: "Balance Quantity", field: "balanceQuantity" },
                { label: "Sold Quantity", field: "soldQuantity" },
                { label: "PS Quantity", field: "psQuantity" },
              ]}
              rows={rows}
            />
          </div>
        </div>
      </div>
    </>
  );
}
