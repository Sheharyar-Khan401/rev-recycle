import PurchaseReportsSideNav from "components/Reports/PurchaseReportsSidenav";
import Filters from "shared/Components/Filters";
import { useEffect, useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
import { useLazyGetPurchaseOrderReportsQuery } from "redux/features/purchase/Order/OrderApiSlice";
import { PurchaseOrderReports } from "redux/types/Orders/orders";
import { useGetCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { CurrencyRequest } from "redux/types/Settings/Finance/currency";
import { MDBIcon, MDBSelect } from "mdb-react-ui-kit";
import {
  getDateFromMillis,
  roundValue,
  convertWghtToLbs,
} from "helper/utility";
import { useGetLabelTypesQuery } from "redux/features/Settings/Productions/labeltypesApiSlice";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetPaymentTermsQuery } from "redux/features/common/paymentTermApiSlice";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { useGetLocationQuery } from "redux/features/Settings/purchase/locationApiSlice";
import { useGetAllItemsinPurchaseOrdersQuery } from "redux/features/Settings/purchase/itemApiSlice";
export default function RawMaterial() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [groupedData, setGroupedData] = useState<PurchaseOrderReports[]>([]);
  const [selectedField, setField] = useState<string | number>("itemName");
  const { data: locationsData } = useGetLocationQuery(null);
  const { data: clientData } = useGetAllClientsQuery(null);
  const { data: paymentTermData } = useGetPaymentTermsQuery(null);
  const { data: categoryData } = useGetCategoryQuery(true);
  const { data: labelTypesData } = useGetLabelTypesQuery(null);
  const { data: purchaseItemsData } = useGetAllItemsinPurchaseOrdersQuery(null);

  const [queryParams, setQueryParams] = useState({});
  const [triggerGetPurchaseOrderReports, getPurchaseOrderReports] =
    useLazyGetPurchaseOrderReportsQuery();
  const { data: currencyList } = useGetCurrrencyQuery(null);

  const SummarizeData = [
    {
      name: "Item",
      id: "itemName",
      value: "item",
    },
    {
      name: "None",
      id: "null",
      value: "null",
    },
    {
      name: "Balance",
      id: "balance",
      value: "balance",
    },
    {
      name: "Container",
      id: "container",
      value: "container",
    },
    {
      name: "Month",
      id: "month",
      value: "month",
    },
    {
      name: "Origin",
      id: "origin",
      value: "origin",
    },

    {
      name: "Reference",
      id: "reference",
      value: "reference",
    },

    {
      name: "Stockroom",
      id: "stockroom",
      value: "stockroom",
    },
    {
      name: "Stock Room Item",
      id: "stockRoomItem",
      value: "stockRoomItem",
    },
    {
      name: "Supplier",
      id: "supplier",
      value: "supplier",
    },
    {
      name: "Supplier Item",
      id: "supplierItem",
      value: "supplierItem",
    },

    {
      name: "Supplier Month",
      id: "supplierMonth",
      value: "supplierMonth",
    },
    {
      name: "Unit Code",
      id: "unitCode",
      value: "unitCode",
    },
    {
      name: "Category",
      id: "category",
      value: "category",
    },
  ];

  useEffect(() => {
    triggerGetPurchaseOrderReports(queryParams);
  }, [queryParams, triggerGetPurchaseOrderReports]);

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

  useEffect(() => {
    if (getPurchaseOrderReports?.data && getPurchaseOrderReports?.data) {
      const itemMap = new Map(); // Map to store items based on itemId
      getPurchaseOrderReports?.data.payLoad?.forEach(
        (item: PurchaseOrderReports) => {
          const itemName = item?.itemName;
          if (itemName && !itemMap.has(itemName)) {
            itemMap.set(itemName, {
              itemName: item?.itemName ? item?.itemName : "-",
            });
          }
        }
      );
      const allUniqueItems = Array.from(itemMap.values());
      setGroupedData(allUniqueItems);
    }
  }, [getPurchaseOrderReports]);

  return (
    <div className="d-lg-flex">
      <div>
        <PurchaseReportsSideNav type={3} />
      </div>
      <div className="table-container">
        <Filters
          componentRef={ref}
          printAble={
            (getPurchaseOrderReports?.data?.payLoad &&
              getPurchaseOrderReports?.data?.payLoad.length > 0 && selectedField !== "null") ??
            false
          }
          exportAble={
            (getPurchaseOrderReports?.data?.payLoad &&
              getPurchaseOrderReports?.data?.payLoad.length > 0) ??
            false
          }
          filters={[
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
              label: "Client",
              name: "clientIds",
              inputType: "multiselect",
              options: clientData
                ? clientData?.map((client) => {
                    return {
                      text: client?.user?.fullName
                        ? client?.user?.fullName
                        : "",
                      value: client.clientId ? client.clientId : 0,
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
              label: "Payment Term",
              name: "paymentTermIds",
              inputType: "multiselect",
              options: paymentTermData
                ? paymentTermData?.map((item) => {
                    return {
                      text: item?.paymentTermDescription,
                      value: item?.paymentTermId,
                    };
                  })
                : [],
            },
            {
              label: "Code Date",
              name: "codeDate",
              inputType: "date",
            },
            {
              label: "Currency",
              name: "businesscurrencyId",
              inputType: "select",
              options: currencyList
                ? currencyList?.map((item: CurrencyRequest) => {
                    return {
                      text: item?.name ? item?.name : "",
                      value: item?.currencyId ? item?.currencyId : 0,
                    };
                  })
                : [],
            },
          ]}
          onSubmit={(query) => {
            if (Object.keys(query).length === 0) {
              setQueryParams({
                field: selectedField,
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
                setQueryParams((prev) => {
                  return {
                    ...prev,
                    field: SummarizeData.find((res) => res.id == data?.value)
                      ?.value,
                  };
                });
              }
            }}
            size="sm"
            preventFirstSelection
            search
            label="Summarize By"
          />
        </Filters>
        {(selectedField === "itemName" ||
          selectedField === "month" ||
          selectedField === "origin" ||
          selectedField === "reference" ||
          selectedField === "stockroom" ||
          selectedField === "supplier" ||
          selectedField === "category") && (
          <DataTable
            tableTitle="Raw Material"
            ref={ref}
            isLoading={getPurchaseOrderReports.isFetching}
            columns={[
              {
                label:
                  selectedField === "itemName"
                    ? "Item"
                    : selectedField === "month"
                    ? "Month"
                    : selectedField === "origin"
                    ? "Origin"
                    : selectedField === "reference"
                    ? "Reference"
                    : selectedField === "stockroom"
                    ? "Stock Room"
                    : selectedField === "supplier"
                    ? "Supplier"
                    : "Category",
                field: selectedField,
              },
              { label: "Bal(Kgs)", field: "balKgs", showSum: true },
              { label: "Bal(Lbs)", field: "balLbs", showSum: true },
              { label: "amount", field: "amount", showSum: true },
              { label: "Cost/Kgs", field: "costKgs", showSum: true },
              { label: "Cost/Lbs", field: "costLbs", showSum: true },
            ]}
            rows={
              getPurchaseOrderReports?.data
                ? getPurchaseOrderReports?.data?.payLoad?.map(
                    (item: PurchaseOrderReports) => {
                      return {
                        [selectedField]: item?.[selectedField]
                          ? item?.[selectedField]
                          : "-",
                        balKgs: item?.kgs ? roundValue(item?.kgs) : 0,
                        balLbs: item?.kgs
                          ? roundValue(convertWghtToLbs(item?.kgs))
                          : 0,
                        amount: item?.amount ? roundValue(item?.amount) : 0,
                        costKgs: item?.costKgs ? roundValue(item?.costKgs) : 0,
                        costLbs: item?.costKgs
                          ? roundValue(convertWghtToLbs(item?.costKgs))
                          : 0,
                      };
                    }
                  )
                : []
            }
          />
        )}
        {(selectedField === "balance" || selectedField === "unitCode") && (
          <DataTable
            tableTitle="Raw Material"
            ref={ref}
            isLoading={getPurchaseOrderReports.isFetching}
            columns={[
              { label: "SR. No.", field: "srNo" },
              { label: "Item", field: "item" },
              { label: "Category", field: "category" },
              { label: "Supplier", field: "supplier" },
              { label: "Type", field: "type" },
              { label: "Container", field: "container" },
              { label: "Origin", field: "origin" },
              { label: "Term", field: "term" },
              { label: "Currency", field: "currency" },
              { label: "Date", field: "date" },
              { label: "Reference", field: "reference" },
              { label: "Rate", field: "rate", showSum: true },
              { label: "Rate I.C", field: "rateIc", showSum: true },
              { label: "Quantity", field: "quantity", showSum: true },
              { label: "Bal(Kgs)", field: "balKgs", showSum: true },
              { label: "Bal(Lbs)", field: "balLbs", showSum: true },
              { label: "amount", field: "amount", showSum: true },
            ]}
            rows={
              getPurchaseOrderReports?.data
                ? getPurchaseOrderReports?.data?.payLoad?.map(
                    (item: PurchaseOrderReports, index: number) => {
                      return {
                        srNo: index + 1,
                        item: item?.itemName ? item?.itemName : "-",
                        category: item?.category ? item?.category : "-",
                        supplier: item?.supplier ? item?.supplier : "-",
                        type: item?.type ? item?.type : "-",
                        container: item?.container ? item?.container : "-",
                        origin: item?.origin ? item?.origin : "-",
                        term: item?.term ? item?.term : "-",
                        currency: item?.currency ? item?.currency : "-",
                        date: item?.date ? getDateFromMillis(item?.date) : "-",
                        reference: item?.reference ? item?.reference : "-",
                        rate: item?.rate ? roundValue(item?.rate) : 0,
                        rateIc: item?.rateIc ? roundValue(item?.rateIc) : 0,
                        quantity: item?.quantity ? item?.quantity : 0,
                        balKgs: item?.kgs ? roundValue(item?.kgs) : 0,
                        balLbs: item?.kgs
                          ? roundValue(convertWghtToLbs(item?.kgs))
                          : 0,
                        amount: item?.amount ? roundValue(item?.amount) : 0,
                      };
                    }
                  )
                : []
            }
          />
        )}
        {selectedField === "supplierMonth" && (
          <DataTable
            tableTitle="Raw Material"
            ref={ref}
            isLoading={getPurchaseOrderReports.isFetching}
            columns={[
              {
                label: "Supplier",
                field: "supplier",
              },
              {
                label: "Month",
                field: "month",
              },
              { label: "Bal(Kgs)", field: "balKgs" },
              { label: "Bal(Lbs)", field: "balLbs" },
              { label: "amount", field: "amount" },
              { label: "Cost/Kgs", field: "costKgs" },
              { label: "Cost/Lbs", field: "costLbs" },
            ]}
            rows={
              getPurchaseOrderReports?.data
                ? getPurchaseOrderReports?.data?.payLoad?.map(
                    (item: PurchaseOrderReports) => {
                      return {
                        supplier: item?.supplier ? item?.supplier : "-",
                        month: item?.month ? item?.month : "-",
                        balKgs: item?.kgs ? roundValue(item?.kgs) : 0,
                        balLbs: item?.kgs
                          ? roundValue(convertWghtToLbs(item?.kgs))
                          : 0,
                        amount: item?.amount ? roundValue(item?.amount) : 0,
                        costKgs: item?.costKgs ? roundValue(item?.costKgs) : 0,
                        costLbs: item?.costKgs
                          ? roundValue(convertWghtToLbs(item?.costKgs))
                          : 0,
                      };
                    }
                  )
                : []
            }
          />
        )}
        {selectedField === "null" && groupedData
          ? groupedData.map((outeritem: PurchaseOrderReports) => (
              <>
                <span className="d-flex align-items-center mt-4 mb-2 ">
                  <MDBIcon fab icon="dropbox" />
                  <div className="ms-2 fs-6 text-capitalize">
                    {outeritem.itemName}
                  </div>
                </span>
                <DataTable
                  tableTitle="Raw Material"
                  ref={ref}
                  isLoading={getPurchaseOrderReports.isFetching}
                  columns={[
                    { label: "SR. No.", field: "srNo" },
                    { label: "Item", field: "item" },
                    { label: "Unit Code", field: "unitCode" },
                    { label: "Category", field: "category" },
                    { label: "Supplier", field: "supplier" },
                    { label: "Type", field: "type" },
                    { label: "Container", field: "container" },
                    { label: "Origin", field: "origin" },
                    { label: "Term", field: "term" },
                    { label: "Currency", field: "currency" },
                    { label: "Date", field: "date" },
                    { label: "Reference", field: "reference" },
                    { label: "Rate", field: "rate", showSum: true },
                    { label: "Rate I.C", field: "rateIc", showSum: true },
                    { label: "Quantity", field: "quantity", showSum: true },
                    { label: "Bal(Kgs)", field: "balKgs", showSum: true },
                    { label: "Bal(Lbs)", field: "balLbs", showSum: true },
                    { label: "amount", field: "amount", showSum: true },
                  ]}
                  rows={(getPurchaseOrderReports?.data?.payLoad ?? [])
                    .filter((item: PurchaseOrderReports) => {
                      return outeritem.itemName === item.itemName;
                    })
                    .map((filteredItem, index) => {
                      return {
                        srNo: index + 1,
                        item: filteredItem?.itemName
                          ? filteredItem?.itemName
                          : "-",
                        unitCode: filteredItem.code ?? "-",
                        category: filteredItem?.category
                          ? filteredItem?.category
                          : "-",
                        supplier: filteredItem?.supplier
                          ? filteredItem?.supplier
                          : "-",
                        type: filteredItem?.type ? filteredItem?.type : "-",
                        container: filteredItem?.container
                          ? filteredItem?.container
                          : "-",
                        origin: filteredItem?.origin
                          ? filteredItem?.origin
                          : "-",
                        term: filteredItem?.term ? filteredItem?.term : "-",
                        currency: filteredItem?.currency
                          ? filteredItem?.currency
                          : "-",
                        date: filteredItem?.date
                          ? getDateFromMillis(filteredItem?.date)
                          : "-",
                        reference: filteredItem?.reference
                          ? filteredItem?.reference
                          : "-",
                        rate: filteredItem?.rate
                          ? roundValue(filteredItem?.rate)
                          : 0,
                        rateIc: filteredItem?.rateIc
                          ? roundValue(filteredItem?.rateIc)
                          : 0,
                        quantity: filteredItem?.quantity
                          ? filteredItem?.quantity
                          : 0,
                        balKgs: filteredItem?.kgs
                          ? roundValue(filteredItem?.kgs)
                          : 0,
                        balLbs: filteredItem?.kgs
                          ? roundValue(convertWghtToLbs(filteredItem?.kgs))
                          : 0,
                        amount: filteredItem?.amount
                          ? roundValue(filteredItem?.amount)
                          : 0,
                      };
                    })}
                />
              </>
            ))
          : null}
        {(selectedField === "stockRoomItem" ||
          selectedField === "supplierItem") &&
        groupedData
          ? groupedData.map((outeritem: PurchaseOrderReports) => (
              <DataTable
                ref={ref}
                tableTitle="Raw Material"
                isLoading={getPurchaseOrderReports.isFetching}
                columns={[
                  { label: "Item", field: "item" },
                  { label: "Quantity", field: "quantity" },
                  { label: "Bal(Kgs)", field: "balKgs" },
                  { label: "Bal(Lbs)", field: "balLbs" },
                  { label: "amount", field: "amount" },
                  { label: "Cost/Kgs", field: "costKgs" },
                  { label: "Cost/Lbs", field: "costLbs" },
                ]}
                rows={(getPurchaseOrderReports?.data?.payLoad ?? [])
                  .filter((item: PurchaseOrderReports) => {
                    return outeritem.itemName === item.itemName;
                  })
                  .map((filteredItem) => {
                    return {
                      item: filteredItem?.itemName
                        ? filteredItem?.itemName
                        : "-",
                      quantity: filteredItem?.quantity
                        ? filteredItem?.quantity
                        : 0,
                      balKgs: filteredItem?.kgs
                        ? roundValue(filteredItem?.kgs)
                        : 0,
                      balLbs: filteredItem?.kgs
                        ? roundValue(convertWghtToLbs(filteredItem?.kgs))
                        : 0,
                      amount: filteredItem?.amount
                        ? roundValue(filteredItem?.amount)
                        : 0,
                      costKgs: filteredItem?.costKgs
                        ? roundValue(filteredItem?.costKgs)
                        : 0,
                      costLbs: filteredItem?.costKgs
                        ? roundValue(convertWghtToLbs(filteredItem?.costKgs))
                        : 0,
                    };
                  })}
              />
            ))
          : null}
        {selectedField === "container" && (
          <DataTable
            ref={ref}
            tableTitle="Raw Material"
            isLoading={getPurchaseOrderReports.isFetching}
            columns={[
              { label: "SR. No.", field: "srNo" },
              { label: "Container", field: "container" },
              { label: "Reference", field: "reference" },
              { label: "Supplier", field: "supplier" },
              { label: "Last Unit Issued", field: "lastUnitIssued" },
              { label: "Last Unit Issued On", field: "lastUnitIssuedOn" },
              { label: "Last Unit Issued To", field: "lastUnitIssuedTo" },
              {
                label: "Purchase Quantity",
                field: "purchaseQuantity",
                showSum: true,
              },
              { label: "Purchase(Kgs)", field: "purchaseKgs", showSum: true },
              { label: "Purchase(Lbs)", field: "purchaseLbs", showSum: true },
              {
                label: "Purchase Amount",
                field: "purchaseAmount",
                showSum: true,
              },
              { label: "Iss. Quantity", field: "issuQuantity", showSum: true },
              { label: "Iss.(Kgs)", field: "issuKgs", showSum: true },
              { label: "Issu.(Lbs)", field: "issuLbs", showSum: true },
              { label: "Issu. Amount", field: "issuAmount", showSum: true },
              { label: "Quantity", field: "quantity", showSum: true },
              { label: "Bal(Kgs)", field: "balKgs", showSum: true },
              { label: "Bal(Lbs)", field: "balLbs", showSum: true },
              { label: "amount", field: "amount", showSum: true },
              { label: "Cost/Kgs", field: "costKgs", showSum: true },
              { label: "Cost/Lbs", field: "costLbs", showSum: true },
            ]}
            rows={
              getPurchaseOrderReports?.data
                ? getPurchaseOrderReports?.data?.payLoad?.map(
                    (item: PurchaseOrderReports, index: number) => {
                      return {
                        srNo: index + 1,
                        item: item?.itemName ? item?.itemName : "-",
                        container: item?.container ? item?.container : "-",
                        supplier: item?.supplier ? item?.supplier : "-",
                        lastUnitIssued: item?.lastIssued ? item?.lastIssued : 0,
                        lastUnitIssuedOn: item?.issuedDate
                          ? getDateFromMillis(item?.issuedDate)
                          : 0,
                        lastUnitIssuedTo: item?.issuedTo ? item?.issuedTo : 0,
                        purchaseQuantity: item?.quantity ? item?.quantity : 0,
                        purchaseKgs: item?.kgs ? roundValue(item?.kgs) : 0,
                        purchaseAmount: item?.amount ? item?.amount : 0,
                        purchaseLbs: item?.lbs ? roundValue(item?.lbs) : 0,
                        issuQuantity: item?.issQuantity ? item?.issQuantity : 0,
                        issuKgs: item?.issKgs ? roundValue(item?.issKgs) : 0,
                        issuAmount: item?.issAmount ? item?.issAmount : 0,
                        issuLbs: item?.issLbs ? roundValue(item?.issLbs) : 0,
                        reference: item?.reference ? item?.reference : "-",
                        quantity: item?.quantity ? item?.quantity : 0,
                        balKgs: item?.kgs ? roundValue(item?.kgs) : 0,
                        balLbs: item?.kgs ? convertWghtToLbs(item?.kgs) : 0,
                        amount: item?.amount ? roundValue(item?.amount) : 0,
                        costKgs: item?.costKgs ? roundValue(item?.costKgs) : 0,
                        costLbs: item?.costKgs
                          ? convertWghtToLbs(item?.costKgs)
                          : 0,
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
