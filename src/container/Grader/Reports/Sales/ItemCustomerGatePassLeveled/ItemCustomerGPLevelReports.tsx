import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import SalesReportsSideNav from "components/Reports/SalesReportsSidenav";
import { useLazyGetItemCustomerGPLevelReportsQuery } from "redux/features/sales/Reports/ItemCustomerGPLevelApiSlice";
import { ItemCustomerGPLevel } from "redux/types/Sales/Reports/ItemCustomerGPLevel";
import {
  getDateFromMillis,
  roundValue,
  convertWghtToLbs,
} from "helper/utility";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useLazyGetAllInvoicesQuery } from "redux/features/sales/saleInvoicesApiSlice";

export default function ItemCustomerGPLevelReports() {
  const ref = useRef<HTMLInputElement | null>(null);
  const { data: categoryData } = useGetCategoryQuery(true);
  const { data: supplierData } = useGetAllClientsQuery(null);
  const { data: productionItemsData } = useGetAllProductionItemsQuery(null);
  const { data: invoiceTypeData } = useGetInvoiceTypesQuery(null);
  const [triggerSaleInvoices, saleInvoiceData] = useLazyGetAllInvoicesQuery();
  const [getReports, reportsData] = useLazyGetItemCustomerGPLevelReportsQuery();
  const [queryParams, setQueryParams] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    getReports(queryParams);
  }, [queryParams, getReports]);

  useEffect(() => {
    triggerSaleInvoices({ systemInvoiceId: 5 });
  }, []);

  const rows = reportsData?.data
    ? reportsData?.data?.payLoad.map(
        (item: ItemCustomerGPLevel, index: number) => {
          return {
            sr: index + 1,
            ref: item?.referenceNo ? item?.referenceNo : "-",
            date: getDateFromMillis(item?.date),
            customer: item?.customer ? item?.customer : "-",
            containerNo: item?.containerNo ? item?.containerNo : "-",
            units: item?.units ? item?.units : 0,
            weightKgs: item?.weightKgs ? roundValue(item?.weightKgs) : 0,
            weightLbs: item?.weightKgs
              ? roundValue(convertWghtToLbs(item?.weightKgs))
              : 0,
            dept: item?.department ? item?.department : "-",
            labelType: item?.labelType ? item?.labelType : "-",
            itemCode: item?.itemCode ? item?.itemCode : "-",
            item: item?.item ? item?.item : "-",
            category: item?.category ? item?.category : "-",
            unitCode: item?.unitCode ? item?.unitCode : "-",
            fobAmount: item?.fobAmount ? roundValue(item?.fobAmount) : 0,
            discount: item?.discount ? roundValue(item?.discount) : 0,
            charges: item?.charges ? roundValue(item?.charges) : 0,
            expenses: item?.expenses ? roundValue(item?.expenses) : 0,
            netAmount: item?.netAmount ? roundValue(item?.netAmount) : 0,
            cogs: item?.cogs ? item?.cogs : "-",
            pl: item?.profitLoss ? roundValue(item?.profitLoss) : 0,
            plKgs: item?.profitLossPerKgs
              ? roundValue(item?.profitLossPerKgs)
              : 0,
            plLbs: item?.profitLossPerLbs
              ? roundValue(item?.profitLossPerLbs)
              : 0,
          };
        }
      )
    : [];
  return (
    <>
      <div className="d-lg-flex">
        <div>
          <SalesReportsSideNav type={8} />
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
                label: "invoiceTypeData",
                name: "invoiceTypeIds",
                inputType: "multiselect",
                options: invoiceTypeData
                  ? invoiceTypeData?.map((invoiceType) => {
                      return {
                        text: invoiceType?.name ? invoiceType?.name : "",
                        value: invoiceType?.invoiceTypeId
                          ? invoiceType?.invoiceTypeId
                          : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Invoice",
                name: "invoiceIds",
                inputType: "multiselect",
                options: saleInvoiceData?.data
                  ? saleInvoiceData?.data?.payLoad?.map((invoice) => {
                      return {
                        text: invoice?.invoiceNo ? invoice?.invoiceNo : "",
                        value: invoice?.invoiceId ? invoice?.invoiceId : 0,
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
          <DataTable
            ref={ref}
            tableTitle="Sales Item Cusomer Gate Pass Leveled"
            isLoading={reportsData.isFetching}
            columns={[
              { label: "Sr. No.", field: "sr" },
              { label: "Reference No.", field: "ref" },
              { label: "Date", field: "date" },
              { label: "Customer", field: "customer" },
              { label: "Container No.", field: "containerNo" },
              { label: "Units", field: "units" },
              { label: "Weight (KGS)", field: "weightKgs" },
              { label: "Weight (LBS)", field: "weightLbs" },
              { label: "Department", field: "dept" },
              { label: "Label Type", field: "labelType" },
              { label: "Item Code", field: "itemCode" },
              { label: "Item", field: "item" },
              { label: "Category", field: "category" },
              { label: "Unit Code", field: "unitCode" },
              { label: "FOB Amount", field: "fobAmount" },
              { label: "Discount", field: "discount" },
              { label: "Charges", field: "charges" },
              { label: "Expenses", field: "expenses" },
              { label: "Net Amount", field: "netAmount" },
              { label: "COGS", field: "cogs" },
              { label: "PL", field: "pl" },
              { label: "PL/KGS", field: "plKgs" },
              { label: "PL/LBS", field: "plLbs" },
            ]}
            rows={rows}
          />
        </div>
      </div>
    </>
  );
}
