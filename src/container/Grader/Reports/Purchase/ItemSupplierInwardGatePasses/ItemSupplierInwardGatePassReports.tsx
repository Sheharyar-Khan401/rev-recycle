import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import PurchaseReportsSideNav from "components/Reports/PurchaseReportsSidenav";
import { useLazyGetItemSupplierInwardGPReportsQuery } from "redux/features/purchase/ItemSupplierInwardGPApiSlice";
import { ItemSupplierInwardGP } from "redux/types/GatePasses/gatePasses";
import { useGetLocationQuery } from "redux/features/Settings/purchase/locationApiSlice";
import { useGetAllSupplierQuery } from "redux/features/Clients/Suppliers/suppliersApiSlice";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetAllItemsinPurchaseOrdersQuery } from "redux/features/Settings/purchase/itemApiSlice";
import { roundValue, convertWghtToLbs } from "helper/utility";

export default function ItemSupplierInwardGatePassReports() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [getReports, reportsData] =
    useLazyGetItemSupplierInwardGPReportsQuery();
  const { data: locationsData } = useGetLocationQuery(null);
  const { data: supplierData } = useGetAllSupplierQuery(null);
  const { data: categoryData } = useGetCategoryQuery(false);
  const { data: itemData } = useGetAllItemsinPurchaseOrdersQuery(null);
  const [queryParams, setQueryParams] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    getReports(queryParams);
  }, [queryParams, getReports]);

  const rows = reportsData?.data
    ? reportsData?.data?.payLoad.map(
        (item: ItemSupplierInwardGP, index: number) => {
          return {
            sr: index + 1,
            item: item?.itemName ? item?.itemName : "-",
            category: item?.categoryName ? item?.categoryName : "-",
            supplier: item?.supplier ? item?.supplier : "-",
            invoiceNo: item?.invoiceNo ? item?.invoiceNo : "-",
            origin: item?.origin ? item?.origin : "-",
            ref: item?.referenceNumber ? item?.referenceNumber : "-",
            curr: item?.currency ? item?.currency : "-",
            unitPrice: item?.unitPrice ? roundValue(item?.unitPrice) : 0,
            units: item?.units ? roundValue(item?.units) : 0,
            weightKgs: item?.weightKgs ? roundValue(item?.weightKgs) : "-",
            weightLbs: item?.weightKgs
              ? roundValue(convertWghtToLbs(item?.weightKgs))
              : "-",
          };
        }
      )
    : [];
  return (
    <div className="d-lg-flex">
      <div>
        <PurchaseReportsSideNav type={9} />
      </div>
      <div className="table-container">
        <Filters
          componentRef={ref}
          printAble={rows.length > 0}
          exportAble={rows.length > 0}
          filters={[
            {
              label: "Invoice No.",
              name: "invoiceNo",
              inputType: "text",
            },
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
              label: "Origin Location",
              name: "originLocationIds",
              inputType: "multiselect",
              options: locationsData
                ? locationsData?.map((origin) => {
                    return {
                      text: origin?.name ? origin?.name : "",
                      value: origin?.locationId ? origin?.locationId : 0,
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
              options: itemData
                ? itemData?.map((item) => {
                    return {
                      text: item?.name ? item?.name : "",
                      value: item?.itemId ? item?.itemId : 0,
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
          tableTitle="Item Supplier Inward Gate Pass"
          isLoading={reportsData.isFetching}
          columns={[
            { label: "Sr. No.", field: "sr" },
            { label: "Item", field: "item" },
            { label: "Category", field: "category" },
            { label: "Supplier", field: "supplier" },
            { label: "Invoice No.", field: "invoiceNo" },
            { label: "Origin", field: "origin" },
            { label: "Reference No.", field: "ref" },
            { label: "Currency", field: "curr" },
            { label: "Unit Price", field: "unitPrice" },
            { label: "Units", field: "units" },
            { label: "Weight (KGS)", field: "weightKgs", showSum: true },
            { label: "Weight (LBS)", field: "weightLbs", showSum: true },
          ]}
          rows={rows}
        />
      </div>
    </div>
  );
}
