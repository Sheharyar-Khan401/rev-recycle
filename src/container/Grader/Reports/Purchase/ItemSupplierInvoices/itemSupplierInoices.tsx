import PurchaseReportsSideNav from "components/Reports/PurchaseReportsSidenav";
import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import { useLazyGetSupplierInvoicesReportsQuery } from "redux/features/purchase/Order/OrderApiSlice";
import { SupplierInvoicesReports } from "redux/types/Orders/orders";
import { useGetCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { useGetLocationQuery } from "redux/features/Settings/purchase/locationApiSlice";
import { useGetAllSupplierQuery } from "redux/features/Clients/Suppliers/suppliersApiSlice";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetAllItemsinPurchaseOrdersQuery } from "redux/features/Settings/purchase/itemApiSlice";
import { useGetLabelTypesQuery } from "redux/features/Settings/Productions/labeltypesApiSlice";
import { roundValue, convertWghtToLbs } from "helper/utility";
export default function ItemSupplierInvoices() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [queryParams, setQueryParams] = useState({});
  const { data: currencyData } = useGetCurrrencyQuery(null);
  const { data: locationsData } = useGetLocationQuery(null);
  const { data: supplierData } = useGetAllSupplierQuery(null);
  const { data: categoryData } = useGetCategoryQuery(true);
  const { data: itemData } = useGetAllItemsinPurchaseOrdersQuery(null);
  const { data: labelTypesData } = useGetLabelTypesQuery(null);
  const [triggerGetSupplierInvoiceaItems, getSupplierInvoicesItem] =
    useLazyGetSupplierInvoicesReportsQuery();
  useEffect(() => {
    triggerGetSupplierInvoiceaItems(queryParams);
  }, [queryParams]);
  const rows = getSupplierInvoicesItem?.data
    ? getSupplierInvoicesItem?.data?.payLoad?.map(
        (item: SupplierInvoicesReports) => {
          return {
            item: item?.item ? item?.item : "-",
            category: item?.category ? item?.category : "-",
            supplier: item?.supplier ? item?.supplier : "-",
            origin: item?.origin ? item?.origin : "-",
            referenceNo: item?.referenceNo ? item?.referenceNo : "-",
            currency: item?.currency ? item?.currency : "-",
            unitPrice: item?.unitPrice ? roundValue(item?.unitPrice) : 0,
            units: item?.units ? roundValue(item?.units) : 0,
            weightKgs: item?.weightKgs ? roundValue(item?.weightKgs) : 0,
            weightLbs: item?.weightKgs
              ? roundValue(convertWghtToLbs(item?.weightKgs))
              : 0,
          };
        }
      )
    : [];
  return (
    <div className="d-lg-flex">
      <div>
        <PurchaseReportsSideNav type={10} />
      </div>
      <div className="table-container">
        <Filters
          componentRef={ref}
          printAble={rows.length > 0}
          exportAble={rows.length > 0}
          filters={[
            {
              label: "Currency",
              name: "businesscurrencyId",
              inputType: "select",
              options: currencyData
                ? currencyData?.map((currency) => {
                    return {
                      text: currency?.name ? currency?.name : "",
                      value: currency?.currencyId ? currency?.currencyId : 0,
                    };
                  })
                : [],
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

            {
              label: "Order Date",
              name: "orderDate",
              inputType: "date",
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
          tableTitle="Item Supplier Invoices"
          isLoading={getSupplierInvoicesItem.isFetching}
          columns={[
            { label: "Item", field: "item" },
            { label: "Category", field: "category" },
            { label: "Supplier", field: "supplier" },
            { label: "Origin", field: "origin" },
            { label: "Reference No", field: "referenceNo" },
            { label: "Currency", field: "currency" },
            { label: "Unit Price", field: "unitPrice" },
            { label: "Units", field: "units" },
            { label: "Weight(Kgs)", field: "weightKgs", showSum: true },
            { label: "Weight(Lbs)", field: "weightLbs", showSum: true },
          ]}
          rows={rows}
        />
      </div>
    </div>
  );
}
