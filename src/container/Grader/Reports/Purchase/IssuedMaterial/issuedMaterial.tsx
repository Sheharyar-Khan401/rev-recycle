import PurchaseReportsSideNav from "components/Reports/PurchaseReportsSidenav";
import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import { useLazyGetIssuedMaterialReportsQuery } from "redux/features/productions/issuanceApiSlice";
import { IssuedMaterialReports } from "redux/types/Productions/issuance";
import {
  getDateFromMillis,
  roundValue,
  convertWghtToLbs,
} from "helper/utility";
import { useGetCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { useGetLocationQuery } from "redux/features/Settings/purchase/locationApiSlice";
import { useGetAllSupplierQuery } from "redux/features/Clients/Suppliers/suppliersApiSlice";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetLabelTypesQuery } from "redux/features/Settings/Productions/labeltypesApiSlice";
import { useGetAllItemsinPurchaseOrdersQuery } from "redux/features/Settings/purchase/itemApiSlice";
import { MDBSelect } from "mdb-react-ui-kit";
export default function IssuedMaterial() {
  const [field, setField] = useState<string>("item");
  const ref = useRef<HTMLInputElement | null>(null);
  const [triggerIssuedMaterialReports, getIssuedMaterialReports] =
    useLazyGetIssuedMaterialReportsQuery();
  const { data: currencyData } = useGetCurrrencyQuery(null);
  const { data: locationsData } = useGetLocationQuery(null);
  const { data: supplierData } = useGetAllSupplierQuery(null);
  const { data: categoryData } = useGetCategoryQuery(true);
  const { data: itemData } = useGetAllItemsinPurchaseOrdersQuery(null);
  const { data: labelTypesData } = useGetLabelTypesQuery(null);
  const [queryParams, setQueryParams] = useState({ field: "item" });
  const SummarizeData = [
    {
      name: "Item",
      id: "item",
    },
    {
      name: "None",
      id: "null",
    },
    {
      name: "Balance",
      id: "balance",
    },
    // {
    //   name: "Customer",
    //   id: "customer",
    // },
    // {
    //   name: "Month",
    //   id: "month",
    // },
    // {
    //   name: "Origin",
    //   id: "origin",
    // },
    {
      name: "Reference",
      id: "reference",
    },
    {
      name: "Stock Room Item",
      id: "stockRoomItem",
    },
    // {
    //   name: "Supplier",
    //   id: "supplier",
    // },
    {
      name: "Supplier Item",
      id: "supplierItem",
    },
    // {
    //   name: "Supplier Month",
    //   id: "supplierMonth",
    // },
    {
      name: "Unit Code",
      id: "unitCode",
    },
    {
      name: "Category",
      id: "category",
    },
  ];
  useEffect(() => {
    triggerIssuedMaterialReports(queryParams);
  }, [queryParams, triggerIssuedMaterialReports]);

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

  return (
    <div className="d-lg-flex">
      <div>
        <PurchaseReportsSideNav type={8} />
      </div>
      <div className="table-container">
        <Filters
          printAble={(getIssuedMaterialReports?.data
            && getIssuedMaterialReports?.data?.payLoad.length > 0)??false}
          exportAble={(getIssuedMaterialReports?.data
            && getIssuedMaterialReports?.data?.payLoad.length > 0)??false}
          componentRef={ref}
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
              setQueryParams({ field });
            } else setQueryParams({ ...queryParams, ...query });
          }}
        >
          <MDBSelect
            className="me-3"
            data={summarizeDataList(field)}
            onValueChange={(data) => {
              if ("value" in data) {
                setField(data.value ? data?.value.toString() : "");
                setQueryParams((prev) => {
                  return {
                    ...prev,
                    field: data.value ? data?.value.toString() : "",
                  };
                });
              }
            }}
            size="sm"
            search
            label="Summarize By"
          />
        </Filters>
        {(field === "item" || field === "unitCode") && (
          <DataTable
            ref={ref}
            tableTitle="Issued Material"
            isLoading={getIssuedMaterialReports.isFetching}
            columns={[
              { label: "Item", field: "item" },
              { label: "Quantity", field: "quantity", showSum: true },
              { label: "Balance(Kgs)", field: "weightKgs", showSum: true },
              { label: "Balance(Lbs)", field: "weightLbs", showSum: true },
              { label: "Cost(Kgs)", field: "balKgs", showSum: true },
              { label: "Cost(Lbs)", field: "balLbs", showSum: true },
              { label: "Amount", field: "amount", showSum: true },
            ]}
            rows={
              getIssuedMaterialReports?.data
                ? getIssuedMaterialReports?.data?.payLoad?.map(
                    (item: IssuedMaterialReports) => {
                      return {
                        item: item?.itemName ? item?.itemName : "-",

                        weightKgs: item?.weightKg
                          ? roundValue(item?.weightKg)
                          : 0,
                        weightLbs: item?.weightKg
                          ? roundValue(convertWghtToLbs(item?.weightKg))
                          : 0,

                        quantity: item?.quantity
                          ? roundValue(item?.quantity)
                          : 0,
                        balKgs: item?.costPerKg
                          ? roundValue(item?.costPerKg)
                          : 0,
                        balLbs: item?.costPerLbs
                          ? roundValue(item?.costPerLbs)
                          : 0,
                        amount: item?.amount ? roundValue(item?.amount) : 0,
                      };
                    }
                  )
                : []
            }
          />
        )}
        {(field === "null" ||
          field === "balance" ||
          field === "reference" ||
          field === "stockRoom" ||
          field === "stockRoomItem" ||
          field === "supplierItem" ||
          field === "category") && (
          <DataTable
            ref={ref}
            tableTitle="Issued Material"
            isLoading={getIssuedMaterialReports.isFetching}
            columns={[
              { label: "Item", field: "item" },
              { label: "Unit Code", field: "unitCode" },
              { label: "Category", field: "category" },
              { label: "Supplier", field: "supplier" },
              { label: "Type", field: "type" },
              { label: "Conatiner", field: "container" },
              { label: "Origin", field: "origin" },
              { label: "Term", field: "term" },
              { label: "Currency", field: "currency" },
              { label: "Date", field: "date" },
              { label: "Reference", field: "reference" },
              { label: "Rate", field: "rate", showSum: true },
              { label: "Rate I.C", field: "rateIc", showSum: true },
              { label: "Quantity", field: "quantity", showSum: true },
              { label: "Balance(Kgs)", field: "balanceWeightKgs", showSum: true },
              { label: "Balance(Lbs)", field: "balanceWeightLbs", showSum: true },

              { label: "Amount", field: "amount", showSum: true },
            ]}
            rows={
              getIssuedMaterialReports?.data
                ? getIssuedMaterialReports?.data?.payLoad?.map(
                    (item: IssuedMaterialReports) => {
                      return {
                        item: item?.itemName ? item?.itemName : "-",
                        unitCode: item?.code ? item?.code : "-",
                        category: item?.categoryName ? item?.categoryName : "-",
                        supplier: item?.supplierName ? item?.supplierName : "-",
                        type: item?.type ? item?.type : "-",
                        container: item?.container ? item?.container : "-",
                        origin: item?.origin ? item?.origin : "-",
                        term: item?.term ? item?.term : "-",
                        balanceWeightKgs: item?.weightKg
                          ? roundValue(item?.weightKg)
                          : 0,
                        balanceWeightLbs: item?.weightKg
                          ? roundValue(convertWghtToLbs(item?.weightKg))
                          : 0,
                        currency: item?.currency ? item?.currency : "-",
                        date: getDateFromMillis(item?.date),
                        reference: item?.reference ? item?.reference : "-",
                        rate: item?.rate ? roundValue(item?.rate) : 0,
                        rateIc: item?.rateIC ? roundValue(item?.rateIC) : 0,
                        quantity: item?.quantity
                          ? roundValue(item?.quantity)
                          : 0,
                        balKgs: item?.costPerKg
                          ? roundValue(item?.costPerKg)
                          : 0,
                        balLbs: item?.costPerLbs
                          ? roundValue(item?.costPerLbs)
                          : 0,
                        amount: item?.amount ? roundValue(item?.amount) : 0,
                      };
                    }
                  )
                : []
            }
          />
        )}
      </div>
    </div>
  );
}
