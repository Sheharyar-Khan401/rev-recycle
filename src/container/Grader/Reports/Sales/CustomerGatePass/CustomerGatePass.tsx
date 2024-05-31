import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import SalesReportsSideNav from "components/Reports/SalesReportsSidenav";
import { useLazyGetItemCustomerGatePassReportsQuery } from "redux/features/sales/Orders/saleOrdersApiSlice";
import { ItemCustomerGatePassReport } from "redux/types/Orders/saleOrders";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { MDBIcon, MDBSelect } from "mdb-react-ui-kit";
import { getDateFromMillis, roundValue } from "helper/utility";
import { useGetAllSaleInvoicesQuery } from "redux/features/sales/saleInvoicesApiSlice";
export default function CustomerGatePass() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [selectedField, setField] = useState<string | number>("item");
  const { data: supplierData } = useGetAllClientsQuery(null);
  const { data: invoiceTypeData } = useGetInvoiceTypesQuery(null);
  const { data: productionItemsData } = useGetAllProductionItemsQuery(null);
  const { data: categoryData } = useGetCategoryQuery(true);
  const { data: saleInvoiceData } = useGetAllSaleInvoicesQuery(null);
  const [triggerItemCustomerGatePassReports, getItemCustomerGatePassReports] =
    useLazyGetItemCustomerGatePassReportsQuery();
  const [queryParams, setQueryParams] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    field: selectedField
  });
  const SummarizeData = [
    {
      name: "None",
      id: "null",
      value: "null",
    },
    {
      name: "Item",
      id: "item",
      value: "item",
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
      id: "categoryName",
      value: "category",
    },
    {
      name: "Container",
      id: "containerNumber",
      value: "container",
    },
    {
      name: "Customer",
      id: "customer",
      value: "customer",
    },
    {
      name: "Date",
      id: "date",
      value: "date",
    },
    {
      name: "Department",
      id: "departmentName",
      value: "department",
    },
    {
      name: "Grade",
      id: "gradeName",
      value: "grade",
    },
    {
      name: "Invoice Container",
      id: "invoiceContainerNumber",
      value: "invoiceContainer",
    },
    {
      name: "Invoice Type",
      id: "invoiceType",
      value: "invoiceType",
    },
    {
      name: "Label Type",
      id: "labelType",
      value: "labelType",
    },
    {
      name: "Origin",
      id: "origin",
      value: "origin",
    },
    {
      name: "Reference",
      id: "referenceNumber",
      value: "reference",
    },
    {
      name: "Stock Room",
      id: "stockRoom",
      value: "stockRoom",
    },

    // Still need to implement on backend
    // {
    //   name: "Inward Gate Pass Reference",
    //   id: "inwardGatePassReference",
    // },
    // {
    //   name: "Inward Gate Pass Supplier",
    //   id: "inwardGatePassSupplier",
    // },
  ];
  useEffect(() => {
    triggerItemCustomerGatePassReports(queryParams);
  }, [queryParams, triggerItemCustomerGatePassReports]);

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
  const data = getItemCustomerGatePassReports?.data?.payLoad ?? [];
  const itemMap = new Map(); // Map to store items based on itemId

  data.forEach((item) => {
    const itemName = item?.itemName;
    if (itemName && !itemMap.has(itemName)) {
      itemMap.set(itemName, {
        itemName,
      });
    }
  });
  return (
    <div className="d-lg-flex">
      <SalesReportsSideNav type={2} />
      <div className="table-container">
        <Filters
          componentRef={ref}
          printAble={data.length > 0 && selectedField !== "null"}
          exportAble={data.length > 0}
          filters={[
            {
              label: "Client",
              name: "clientIds",
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
              label: "Invoice Type",
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
              label: "Invoice",
              name: "invoiceIds",
              inputType: "multiselect",
              options: saleInvoiceData
                ? saleInvoiceData?.payLoad?.map((item) => {
                    return {
                      text: item?.invoiceNo ? item?.invoiceNo : "",
                      value: item?.invoiceId ? item?.invoiceId : 0,
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
                let dataItem = SummarizeData.find((res) => res.id == data?.value)?.value ?? selectedField
                setQueryParams((prev) => {
                  return {
                    ...prev,
                    field: dataItem,
                  };
                });
              }
            }}
            size="sm"
            search
            label="Summarize By"
          />
        </Filters>

        {selectedField === "item" && (
          <DataTable
            ref={ref}
            tableTitle="Sales Customer Gate Pass"
            isLoading={getItemCustomerGatePassReports.isFetching}
            columns={[
              { label: "SR. NO.", field: "srNo" },
              { label: "Item Code", field: "itemCode" },
              { label: "Item Name", field: "item" },
              { label: "Units", field: "units", showSum: true },
              { label: "Weight(Kgs)", field: "weightKgs", showSum: true },
              { label: "Weight(Lbs)", field: "weightLbs", showSum: true },
              { label: "$COGS", field: "cogs", showSum: true },
              { label: "$FOB Amount", field: "fobAmount", showSum: true },
              { label: "PL", field: "pl", showSum: true },
            ]}
            rows={data.map(
              (item: ItemCustomerGatePassReport, index: number) => {
                return {
                  srNo: index + 1,
                  item: item?.itemName ? item?.itemName : "-",
                  itemCode: item?.itemCode ? item?.itemCode : "-",
                  units: item?.units ? item?.units : 0,
                  weightKgs: item?.weightKgs ? roundValue(item?.weightKgs) : 0,
                  weightLbs: item?.weightLbs ? roundValue(item?.weightLbs) : 0,
                  cogs: item?.cogs ? item?.cogs : 0,
                  fobAmount: item?.fobAmount ? roundValue(item?.fobAmount) : 0,
                  pl: item?.profitLoss ? item?.profitLoss : 0,
                };
              }
            )}
          />
        )}

        {(selectedField === "brand" || selectedField === "brandItem") && (
          <DataTable
            ref={ref}
            isLoading={getItemCustomerGatePassReports.isFetching}
            columns={[
              { label: "SR. NO.", field: "srNo" },
              { label: "Units", field: "units", showSum: true },
              { label: "Weight(Kgs)", field: "weightKgs", showSum: true },
              { label: "Weight(Lbs)", field: "weightLbs", showSum: true },
              { label: "$COGS", field: "cogs", showSum: true },
              { label: "$FOB Amount", field: "fobAmount", showSum: true },
              { label: "$Charges", field: "charges", showSum: true },
              { label: "$Net Amount", field: "netAmount", showSum: true },
              { label: "PL", field: "pl" },
            ]}
            rows={data.map(
              (item: ItemCustomerGatePassReport, index: number) => {
                return {
                  srNo: index + 1,
                  units: item?.units ? item?.units : 0,
                  weightKgs: item?.weightKgs ? roundValue(item?.weightKgs) : 0,
                  weightLbs: item?.weightLbs ? roundValue(item?.weightLbs) : 0,
                  cogs: item?.cogs ? item?.cogs : 0,
                  fobAmount: item?.fobAmount ? roundValue(item?.fobAmount) : 0,
                  charges: item?.charges ? roundValue(item?.charges) : 0,
                  netAmount: item?.netAmount ? roundValue(item?.netAmount) : 0,
                  pl: item?.profitLoss ? item?.profitLoss : 0,
                };
              }
            )}
          />
        )}
        {(selectedField === "categoryName" ||
          selectedField === "containerNumber" ||
          selectedField === "customer" ||
          selectedField === "date" ||
          selectedField === "departmentName" ||
          selectedField === "gradeName" ||
          selectedField === "invoiceContainerNumber" ||
          selectedField === "invoiceType" ||
          selectedField === "labelType" ||
          selectedField === "origin" ||
          selectedField === "referenceNumber" ||
          selectedField === "stockRoom") && (
          <DataTable
            ref={ref}
            isLoading={getItemCustomerGatePassReports.isFetching}
            columns={[
              { label: "SR. NO.", field: "srNo" },
              {
                label:
                  selectedField === "categoryName"
                    ? "Category"
                    : selectedField === "containerNumber"
                    ? "Container"
                    : selectedField === "customer"
                    ? "Customer"
                    : selectedField === "gradeName"
                    ? "Grade"
                    : selectedField === "departmentName"
                    ? "Department"
                    : selectedField === "invoiceContainerNumber"
                    ? "Invoice Container"
                    : selectedField === "invoiceType"
                    ? "Invoice Type"
                    : selectedField === "labelType"
                    ? "Label Type"
                    : selectedField === "origin"
                    ? "Origin"
                    : selectedField === "referenceNumber"
                    ? "Reference Number"
                    : "Stock Room",
                field: selectedField,
              },
              { label: "Units", field: "units", showSum: true },
              { label: "Weight(Kgs)", field: "weightKgs", showSum: true },
              { label: "Weight(Lbs)", field: "weightLbs", showSum: true },
              { label: "$COGS", field: "cogs", showSum: true },
              { label: "$FOB Amount", field: "fobAmount", showSum: true },
              { label: "$Charges", field: "charges", showSum: true },
              { label: "$Net Amount", field: "netAmount", showSum: true },
              { label: "PL", field: "pl" },
            ]}
            rows={data.map(
              (item: ItemCustomerGatePassReport, index: number) => {
                return {
                  srNo: index + 1,
                  [selectedField]:
                    selectedField === "date"
                      ? getDateFromMillis(+item?.[selectedField])
                      : item?.[selectedField]
                      ? item?.[selectedField]
                      : "-",

                  units: item?.units ? item?.units : 0,
                  weightKgs: item?.weightKgs ? roundValue(item?.weightKgs) : 0,
                  weightLbs: item?.weightLbs ? roundValue(item?.weightLbs) : 0,
                  cogs: item?.cogs ? item?.cogs : 0,
                  fobAmount: item?.fobAmount ? roundValue(item?.fobAmount) : 0,
                  charges: item?.charges ? roundValue(item?.charges) : 0,
                  netAmount: item?.netAmount ? roundValue(item?.netAmount) : 0,
                  pl: item?.profitLoss ? item?.profitLoss : 0,
                };
              }
            )}
          />
        )}
        {selectedField === "null" &&
          Array.from(itemMap.values()).map(
            (mainItem: ItemCustomerGatePassReport) => (
              <>
                <span className="d-flex align-items-center mt-4 mb-2 ">
                  <MDBIcon fab icon="dropbox" />
                  <div className="ms-2 fs-6 text-capitalize">
                    {mainItem.itemName}
                  </div>
                </span>
                <DataTable
                  ref={ref}
                  isLoading={getItemCustomerGatePassReports.isFetching}
                  columns={[
                    { label: "SR. NO.", field: "srNo" },
                    { label: "Unit Code", field: "code" },
                    { label: "Item Code", field: "itemCode" },
                    { label: "Item Name", field: "item" },
                    { label: "Category", field: "categoryName" },
                    { label: "Container", field: "containerNumber" },
                    { label: "Reference No", field: "referenceNumber" },
                    { label: "Date", field: "date" },
                    { label: "Supplier", field: "customer" },
                    { label: "Units", field: "units", showSum: true },
                    {
                      label: "Weight(Kgs)",
                      field: "weightKgs",
                      showSum: true,
                    },
                    {
                      label: "Weight(Lbs)",
                      field: "weightLbs",
                      showSum: true,
                    },
                    { label: "$COGS", field: "cogs", showSum: true },
                    {
                      label: "$FOB Amount",
                      field: "fobAmount",
                      showSum: true,
                    },
                    {
                      label: "$Charges",
                      field: "charges",
                      showSum: true,
                    },
                    {
                      label: "$Net Amount",
                      field: "netAmount",
                      showSum: true,
                    },
                    { label: "PL", field: "pl" },
                  ]}
                  rows={data
                    ?.filter((i) => i.itemName === mainItem.itemName)
                    .map((item: ItemCustomerGatePassReport, index: number) => {
                      return {
                        srNo: index + 1,
                        code: item?.unitCode ?? "-",
                        itemCode: item?.itemCode ? item?.itemCode : "-",
                        item: item?.itemName ? item?.itemName : "-",
                        categoryName: item?.categoryName
                          ? item?.categoryName
                          : "-",
                        containerNumber: item?.containerNumber
                          ? item?.containerNumber
                          : "-",
                        referenceNumber: item?.referenceNumber
                          ? item?.referenceNumber
                          : "-",
                        date: item?.date ? getDateFromMillis(+item?.date) : "-",
                        customer: item?.customer ? item.customer : "-",
                        units: item?.units ? item?.units : 0,
                        weightKgs: item?.weightKgs
                          ? roundValue(item?.weightKgs)
                          : 0,
                        weightLbs: item?.weightLbs
                          ? roundValue(item?.weightLbs)
                          : 0,
                        cogs: item?.cogs ? item?.cogs : 0,
                        fobAmount: item?.fobAmount
                          ? roundValue(item?.fobAmount)
                          : 0,
                        charges: item?.charges ? roundValue(item?.charges) : 0,
                        netAmount: item?.netAmount
                          ? roundValue(item?.netAmount)
                          : 0,
                        pl: item?.profitLoss ? item?.profitLoss : 0,
                      };
                    })}
                />
              </>
            )
          )}
      </div>
    </div>
  );
}
