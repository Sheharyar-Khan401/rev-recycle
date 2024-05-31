import { MDBInput, MDBDatepicker, MDBSelect } from "mdb-react-ui-kit";
import FormValidationError from "shared/Components/FormValidationError";
import {
  OrderRequest,
  listofPurchaseOrderItems,
} from "redux/types/Orders/orders";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { useGetAllSupplierQuery } from "redux/features/Clients/Suppliers/suppliersApiSlice";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { useGetBusinessCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { useGetOrderStatusQuery } from "redux/features/purchase/Order/OrderStatusApiSlice";
import { OrderStatus } from "redux/types/common/orderStatus";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { Client } from "redux/types/Clients/Clients/client";
import { useEffect } from "react";
import { useGetAllItemsinPurchaseOrdersQuery } from "redux/features/Settings/purchase/itemApiSlice";
import { useGetquantityunitQuery } from "redux/features/quantityunit/quantityunitApiSlice";
import { useGetWeightUnitsQuery } from "redux/features/common/weightUintApiSlice";
import { useGetRateOnQuery } from "redux/features/purchase/Order/RateOnApiSlice";
import { convertWghtToLbs, roundValue } from "helper/utility";
interface Props {
  isEdit: boolean;
  control: Control<OrderRequest, null>;
  errors: FieldErrors<OrderRequest>;
  rowData: listofPurchaseOrderItems[];
  setRowData: React.Dispatch<React.SetStateAction<listofPurchaseOrderItems[]>>;
  watch?: UseFormWatch<OrderRequest>;
  setValue?: UseFormSetValue<OrderRequest>;
}
export default function OrderForm({
  isEdit,
  control,
  errors,
  setRowData,
  rowData,
  watch,
  setValue,
}: Props) {
  const { data: suppliersList } = useGetAllSupplierQuery(null);
  const { data: invoiceTypeList } = useGetInvoiceTypesQuery(null);
  const { data: currencyList } = useGetBusinessCurrrencyQuery(null);
  const { data: orderStatusList } = useGetOrderStatusQuery(null);
  const { data: itemsData } = useGetAllItemsinPurchaseOrdersQuery(null);
  const { data: qUnitData } = useGetquantityunitQuery(null);
  const { data: weightUnitData } = useGetWeightUnitsQuery(null);
  const { data: rateOnData } = useGetRateOnQuery(null);
  const columns: column<"purchaseOrderItemId", listofPurchaseOrderItems>[] = [
    {
      label: "Item",
      field: "itemId",
      sort: false,
      inputType: "select",
      options: itemsData?.length
        ? itemsData?.map((item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.itemId ? item?.itemId : 0,
            };
          })
        : [],
    },
    {
      label: "Qty",
      field: "quantity",
      inputType: "number",
      sort: false,
      showSum: true,
      mutateFieldsCallback: (value, row) => {
        if (value) {
          return {
            unitWeight: row.weightKg ? roundValue(row?.weightKg / +value) : 0,
            amount: row.rateOnId === 3 ? +value * row.rate : row.amount,
          };
        } else return {};
      },
    },
    {
      label: "Q-Unit",
      field: "quantityUnitId",
      sort: false,
      inputType: "select",
      options: qUnitData?.length
        ? qUnitData?.map((item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.quantityUnitId ? item?.quantityUnitId : 0,
            };
          })
        : [],
    },
    {
      label: "W-Unit",
      field: "weightUnitId",
      sort: false,
      inputType: "select",
      options: weightUnitData?.length
        ? weightUnitData?.map((item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.weightUnitId ? item?.weightUnitId : 0,
            };
          })
        : [],
      mutateFieldsCallback: (value, row) => {
        let updatedUnitWeight = +(value === 1
          ? row?.quantity
            ? roundValue(row.weightKg / row?.quantity)
            : 0
          : row?.quantity
          ? roundValue(row.weightLbs / row?.quantity)
          : 0);
        if (value) {
          return {
            unitWeight: updatedUnitWeight,
          };
        } else return {};
      },
    },
    {
      label: "Weight (KGS)",
      field: "weightKg",
      inputType: "number",
      sort: false,
      showSum: true,
      mutateFieldsCallback: (value, row) => {
        let updatedWeightLbs = value ? roundValue(convertWghtToLbs(+value)) : 0;
        let updatedUnitWeight = +(row.weightUnitId === 1
          ? row?.quantity
            ? roundValue(+value / row?.quantity)
            : 0
          : row?.quantity
          ? roundValue(updatedWeightLbs / row?.quantity)
          : 0);
        if (value) {
          return {
            weightLbs: updatedWeightLbs,
            unitWeight: updatedUnitWeight,
            amount: +(row.rateOnId === 1
              ? roundValue(+value * row?.rate)
              : row.rateOnId === 2
              ? roundValue(convertWghtToLbs(+value * row?.rate))
              : 0),
          };
        } else return {};
      },
    },
    {
      label: "Weight (LBS)",
      field: "weightLbs",
      inputType: "number",
      sort: false,
      showSum: true,
      mutateFieldsCallback: (value, row) => {
        if (value) {
          let updatedWeightKg = value ? roundValue(+value / 2.20462) : 0;
          let updatedUnitWeight = +(row.weightUnitId === 2
            ? row?.quantity
              ? roundValue(+value / row?.quantity)
              : 0
            : row?.quantity
            ? roundValue(updatedWeightKg / row?.quantity)
            : 0);
          return {
            weightKg: updatedWeightKg,
            unitWeight: updatedUnitWeight,
            amount: +(row.rateOnId === 1
              ? roundValue(+value * row?.rate) / 2.20462
              : row.rateOnId === 2
              ? roundValue(+value * row?.rate)
              : 0),
          };
        } else return {};
      },
    },
    {
      label: "U-Weight",
      field: "unitWeight",
      inputType: "number",
      disabled: true,
      sort: false,
    },
    {
      label: "Rate",
      field: "rate",
      inputType: "number",
      sort: false,
      showSum: true,
      mutateFieldsCallback: (value, row) => {
        if (value) {
          return {
            amount: +(row.rateOnId === 1
              ? roundValue(+value * row?.weightKg)
              : row.rateOnId === 2
              ? roundValue(+value * row?.weightLbs)
              : row.rateOnId === 3
              ? roundValue(+value * row?.quantity)
              : 0),
          };
        } else return {};
      },
    },
    {
      label: "Rate On",
      field: "rateOnId",
      sort: false,
      inputType: "select",
      mutateFieldsCallback: (value, row) => {
        if (value) {
          return {
            amount: +(value === 1
              ? roundValue(row?.rate * row?.weightKg)
              : value === 2
              ? roundValue(row?.rate * row?.weightLbs)
              : value === 3
              ? roundValue(row?.rate * row?.quantity)
              : 0),
          };
        } else return {};
      },
      options: rateOnData?.length
        ? rateOnData?.map((item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.rateOnId ? item?.rateOnId : 0,
            };
          })
        : [],
    },
    {
      label: "Amount",
      field: "amount",
      inputType: "number",
      disabled: true,
      sort: false,
      showSum: true,
    },
  ];
  const supplierDataList = (id: number | string) => {
    return suppliersList
      ? suppliersList?.map((item: Client) => {
          return {
            text: item?.user?.fullName ?? "",
            value: item?.clientId ?? 0,
            defaultSelected: item?.clientId === id,
          };
        })
      : [];
  };
  const invoiceTypeDataList = (id: number | string) => {
    return invoiceTypeList
      ? invoiceTypeList?.map((item: InvoiceType) => {
          return {
            text: item?.name ? item?.name : "",
            value: item?.invoiceTypeId ? item?.invoiceTypeId : 0,
            defaultSelected: item?.invoiceTypeId === id,
          };
        })
      : [];
  };
  const currencyDataList = (id: number | string) => {
    return currencyList
      ? currencyList?.map((item: BusinessCurrency) => {
          return {
            text: item?.currency?.name ? item?.currency?.name : "",
            value: item?.businesscurrencyId ? item?.businesscurrencyId : 0,
            defaultSelected: item?.businesscurrencyId === id,
          };
        })
      : [];
  };
  const orderStatusDataList = (id: number | string) => {
    return orderStatusList
      ? orderStatusList?.map((item: OrderStatus) => {
          return {
            text: item?.name ? item?.name : "",
            value: item?.orderStatusId ? item?.orderStatusId : 0,
            defaultSelected: item?.orderStatusId === id,
          };
        })
      : [];
  };
  useEffect(() => {
    if (
      watch?.("clientId") === 0 &&
      suppliersList &&
      suppliersList?.length > 0
    ) {
      setValue?.("clientId", suppliersList[0]?.clientId);
    }
    if (
      watch?.("invoiceTypeId") === 0 &&
      invoiceTypeList &&
      invoiceTypeList?.length > 0
    ) {
      setValue?.("invoiceTypeId", invoiceTypeList[0]?.invoiceTypeId);
    }
    if (
      watch?.("businessCurrencyId") === 0 &&
      currencyList &&
      currencyList?.length > 0
    ) {
      setValue?.(
        "businessCurrencyId",
        currencyList[0]?.currency ? currencyList[0]?.currency?.businesscurrencyId : 0
      );
    }
    if (
      watch?.("orderStatusId") === 0 &&
      orderStatusList &&
      orderStatusList?.length > 0
    ) {
      setValue?.("orderStatusId", orderStatusList[0]?.orderStatusId);
    }
  }, [
    watch,
    setValue,
    suppliersList,
    invoiceTypeList,
    currencyList,
    orderStatusList,
  ]);
  return (
    <>
      <div className="row">
        <div className="col-md-5 col-11 my-2">
          <Controller
            control={control}
            name="orderDate"
            render={({ field: { onChange, value } }) => (
              <MDBDatepicker
                label="Date*"
                format="yyyy-mm-dd"
                className={errors.orderDate && "is-invalid"}
                value={value}
                onChange={onChange}
                inputLabel=" "
                inline
                disabled={!isEdit}
                disableFuture
              />
            )}
          />
          <FormValidationError errorMessage={errors.orderDate?.message} />
        </div>
        <div className="col-md-5 col-11 my-2">
          <Controller
            control={control}
            name="invoiceNumber"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                label="Invoice No."
                type="string"
                onChange={onChange}
                className={errors.invoiceNumber && "is-invalid"}
                value={value}
                disabled
              />
            )}
          />
          <FormValidationError errorMessage={errors.invoiceNumber?.message} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-11 my-2">
          <Controller
            control={control}
            name="clientId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                label="Supplier*"
                inputClassName={errors.clientId && "is-invalid"}
                data={supplierDataList(value)}
                onValueChange={(data) => {
                  if ("value" in data) {
                    onChange(data.value);
                  }
                }}
                disabled={!isEdit}
                preventFirstSelection
                search
              />
            )}
          />
          <FormValidationError errorMessage={errors.clientId?.message} />
        </div>
        <div className="col-md-5 col-11 my-2">
          <Controller
            control={control}
            name="invoiceTypeId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                label="Invoice Type*"
                inputClassName={errors.invoiceTypeId && "is-invalid"}
                data={invoiceTypeDataList(value)}
                onValueChange={(data) => {
                  if ("value" in data) {
                    onChange(data.value);
                  }
                }}
                search
                disabled={!isEdit}
                preventFirstSelection
              />
            )}
          />
          <FormValidationError errorMessage={errors.invoiceTypeId?.message} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-11 my-2">
          <Controller
            control={control}
            name="businessCurrencyId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                label="Currency*"
                inputClassName={errors.businessCurrencyId && "is-invalid"}
                data={currencyDataList(value)}
                onValueChange={(data) => {
                  if ("value" in data) {
                    onChange(data.value);
                  }
                }}
                search
                disabled={!isEdit}
                preventFirstSelection
              />
            )}
          />
          <FormValidationError
            errorMessage={errors.businessCurrencyId?.message}
          />
        </div>
        <div className="col-md-5 col-11 my-2">
          <Controller
            control={control}
            name="referenceNumber"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                label="Reference"
                type="string"
                onChange={onChange}
                value={value}
                disabled={!isEdit}
              />
            )}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-11 my-2">
          <Controller
            control={control}
            name="orderStatusId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                label="Order Status*"
                inputClassName={errors.orderStatusId && "is-invalid"}
                data={orderStatusDataList(value)}
                onValueChange={(data) => {
                  if ("value" in data) {
                    onChange(data.value);
                  }
                }}
                search
                disabled={!isEdit}
                preventFirstSelection
              />
            )}
          />
          <FormValidationError errorMessage={errors.orderStatusId?.message} />
        </div>
        <div className="col-md-5 col-11 my-2">
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                label="Description"
                type="string"
                onChange={onChange}
                value={value}
                disabled={!isEdit}
              />
            )}
          />
        </div>
      </div>
      <EditableDataTable
        identifier="purchaseOrderItemId"
        addText="Add Item"
        columns={columns}
        rows={rowData}
        setRows={setRowData}
        isLoading={false}
        showAddButton={isEdit}
        defaultEditable={isEdit}
      />
    </>
  );
}
