import {
  MDBInput,
  MDBDatepicker,
  MDBSelect,
  MDBTextArea,
  MDBRadio,
} from "mdb-react-ui-kit";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
import styles from "components/Sales/SaleOrderForm/styles.module.css";
import {
  SaleOrderRequest,
  SaleOrdersTableData,
} from "redux/types/Orders/saleOrders";
import { useGetStockRoomsQuery } from "redux/features/Settings/Productions/stockroomsApiSlice";
import { StockroomsData } from "redux/types/Settings/Productions/Stockroom";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { useGetBusinessCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { useGetOrderStatusQuery } from "redux/features/purchase/Order/OrderStatusApiSlice";
import { OrderStatus } from "redux/types/common/orderStatus";
import { useGetAllordertemplateQuery } from "redux/features/sales/ordertemplateApiSlice";
import { itemTableDataResponse } from "redux/types/Sales/ordertemplate";
import { useGetAllBrandsQuery } from "redux/features/Settings/Productions/brandApiSlice";
import { Brand } from "redux/types/Settings/Productions/brand";
import { useGetWeightUnitsQuery } from "redux/features/common/weightUintApiSlice";
import { WeightUnit } from "redux/types/common/weightUnit";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { Client } from "redux/types/Clients/Clients/client";
import { AmountIcon, BoxIcon, KgIcon } from "helper/icons";
import { useEffect } from "react";
import { convertWghtToLbs, roundValue } from "helper/utility";
interface Props {
  isEdit: boolean;
  control: Control<SaleOrderRequest>;
  errors: Partial<FieldErrorsImpl<SaleOrderRequest>>;
  mode: string;
  apiData?: SaleOrdersTableData | undefined;
  setValue: UseFormSetValue<SaleOrderRequest>;
  watch?: UseFormWatch<SaleOrderRequest>;
}
export default function SaleOrderForm({
  mode,
  isEdit,
  control,
  errors,
  apiData,
  setValue,
  watch,
}: Props) {
  const { data: stockroomList } = useGetStockRoomsQuery(null);
  const { data: invoiceTypeList } = useGetInvoiceTypesQuery(null);
  const { data: currencyList } = useGetBusinessCurrrencyQuery(null);
  const { data: orderStatusList } = useGetOrderStatusQuery(null);
  const { data: clientList } = useGetAllClientsQuery(null);
  const { data: brandsList } = useGetAllBrandsQuery(null);
  // const { data: categoryList } = useGetCategoryQuery(true);
  const { data: orderTempList } = useGetAllordertemplateQuery(null);
  const { data: weightUnitsList } = useGetWeightUnitsQuery(null);
  const stockroomDataList = (id: number | string) => {
    return stockroomList
      ? stockroomList?.map((item: StockroomsData) => {
          return {
            text: item?.name ? item?.name : "",
            value: item?.stockRoomId ? item?.stockRoomId : 0,
            defaultSelected: item?.stockRoomId === id,
          };
        })
      : [];
  };
  const brandsDataList = (id: number | string) => {
    return brandsList
      ? brandsList?.map((item: Brand) => {
          return {
            text: item?.name ? item?.name : "",
            value: item?.brandId ? item?.brandId : 0,
            defaultSelected: item?.brandId === id,
          };
        })
      : [];
  };
  const orderTempDataList = (id: number | string) => {
    return orderTempList
      ? orderTempList?.map((item: itemTableDataResponse) => {
          return {
            text: item?.name ? item?.name : "",
            value: item?.saleOrderTemplateId ? item?.saleOrderTemplateId : 0,
            defaultSelected: item?.saleOrderTemplateId === id,
          };
        })
      : [];
  };
  const catDataList = (val: boolean) => {
    return [
      {
        text: "Production",
        value: "true",
        defaultSelected: val
      },
      {
        text: "Purchase",
        value: "false",
        defaultSelected: val === false ? true : false
      },
    ];
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
            text: item?.currency ? item?.currency?.name : "",
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
  const clientDataList = (id: number | string) => {
    return clientList
      ? clientList?.map((item: Client) => {
          return {
            text: item?.user?.fullName ? item?.user?.fullName : "",
            value: item?.clientId ? item?.clientId : 0,
            defaultSelected: item?.clientId === id,
          };
        })
      : [];
  };
  const weightUnitsDataList = (id: number | string) => {
    return weightUnitsList
      ? weightUnitsList?.map((item: WeightUnit) => {
          return {
            text: item?.name ? item?.name : "",
            value: item?.weightUnitId ? item?.weightUnitId : 0,
            defaultSelected: item?.weightUnitId === id,
          };
        })
      : [];
  };
  const weightLbs = apiData
    ? roundValue(convertWghtToLbs(apiData?.totalWeight))
    : "0.00";
  const psWeightLbs = apiData
    ? roundValue(convertWghtToLbs(apiData?.totalPSWeight))
    : "0.00";
  const maxShipmentWeight = apiData
    ? roundValue(convertWghtToLbs(apiData?.maxShipmentWeight))
    : "0.00";
  const weightDifferenceLbs = apiData
    ? roundValue(convertWghtToLbs(apiData?.weightDifference))
    : "0.00";
  useEffect(() => {
    if (orderStatusList && orderStatusList?.length > 0) {
      setValue("orderStatusId", orderStatusList[0]?.orderStatusId);
    }
    if (watch?.("clientId") === 0 && clientList && clientList?.length > 0) {
      setValue("clientId", clientList[0]?.clientId);
    }
    if (invoiceTypeList && invoiceTypeList?.length > 0) {
      setValue("invoiceTypeId", invoiceTypeList[0]?.invoiceTypeId);
    }
    if (currencyList && currencyList?.length > 0) {
      setValue(
        "businessCurrencyId",
        currencyList[0]?.businesscurrencyId
          ? currencyList[0]?.businesscurrencyId
          : 0
      );
    }
  }, [
    orderStatusDataList,
    clientList,
    invoiceTypeList,
    currencyList,
  ]);
  return (
    <>
      {mode === "EDIT" && (
        <>
          <div className="row my-3 p-0">
            <div
              className={styles["col"] + " m-2"}
              style={{
                background: "#E0E6FF",
                border: "1px solid #D5D5D5",
                borderRadius: "8px",
              }}
            >
              <div className="d-flex  align-items-center my-lg-2 my-1 ps-lg-2 ps-0">
                <AmountIcon />
                <div className="mx-3">
                  <span className="fs12 fw700">Total&nbsp;Amount</span>
                  <div>
                    {apiData?.totalAmount
                      ? roundValue(apiData?.totalAmount)
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={styles["col"] + " m-2"}
              style={{
                background: "#E0E6FF",
                border: "1px solid #D5D5D5",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            >
              <div className="d-flex  align-items-center my-lg-2 my-1 ps-lg-2 ps-0">
                <AmountIcon />
                <div className="mx-3">
                  <span className="fs12 fw700">Master&nbsp;Amount</span>
                  <div>
                    {apiData?.totalMasterRate
                      ? roundValue(apiData?.totalMasterRate)
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={styles["col"] + " m-2"}
              style={{
                background: "#E0E6FF",
                border: "1px solid #D5D5D5",
                borderRadius: "8px",
              }}
            >
              <div className="d-flex  align-items-center my-lg-2 my-1 ps-lg-2 ps-0">
                <BoxIcon />
                <div className="mx-3">
                  <span className="fs12 fw700">Total&nbsp;QTY </span>
                  <div>
                    {apiData?.quantity ? roundValue(apiData?.quantity) : "-"}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={styles["col"] + " m-2"}
              style={{
                background: "#E0E6FF",
                border: "1px solid #D5D5D5",
                borderRadius: "8px",
              }}
            >
              <div className="d-flex  align-items-center  my-lg-2 my-1 ps-lg-2 ps-0">
                <KgIcon />
                <div className="mx-3">
                  <span className="fs12 fw700"> LBS/KGS </span>
                  <div>
                    {weightLbs + "/" + apiData?.totalWeight
                      ? apiData?.totalWeight && roundValue(apiData?.totalWeight)
                      : "-"}
                  </div>
                </div>
              </div>
            </div>{" "}
            <div
              className={styles["col"] + " m-2"}
              style={{
                background: "#E0E6FF",
                border: "1px solid #D5D5D5",
                borderRadius: "8px",
              }}
            >
              <div className="d-flex  align-items-center  my-lg-2 my-1 ps-lg-2 ps-0">
                <AmountIcon />
                <div className="mx-3">
                  <span className="fs12 fw700"> Available&nbsp;Quantity </span>
                  <div>
                    {apiData?.totalAQuantity
                      ? roundValue(apiData?.totalAQuantity)
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={styles["col"] + " m-2"}
              style={{
                background: "#E0E6FF",
                border: "1px solid #D5D5D5",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            >
              <div className="d-flex  align-items-center my-lg-2 my-1 ps-lg-2 ps-0">
                <KgIcon />
                <div className="mx-3">
                  <span className="fs12 fw700">LBS/KGS</span>
                  <div>
                    {" "}
                    {apiData?.totalPSWeight && psWeightLbs
                      ? psWeightLbs + "/" + roundValue(apiData?.totalPSWeight)
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={styles["col"] + " m-2"}
              style={{
                background: "#E0E6FF",
                border: "1px solid #D5D5D5",
                borderRadius: "8px",
              }}
            >
              <div className="d-flex  align-items-center my-lg-2 my-1 ps-lg-2 ps-0">
                <KgIcon />
                <div className="mx-3">
                  <span className="fs12 fw700">Shipment&nbsp;LBS/KGS </span>
                  <div>
                    {maxShipmentWeight && apiData?.maxShipmentWeight
                      ? maxShipmentWeight +
                        "/" +
                        roundValue(apiData?.maxShipmentWeight)
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={styles["col"] + " m-2"}
              style={{
                background: "#E0E6FF",
                border: "1px solid #D5D5D5",
                borderRadius: "8px",
              }}
            >
              <div className="d-flex  align-items-center my-lg-2 my-1 ps-lg-2 ps-0">
                <KgIcon />
                <div className="mx-3">
                  <span className="fs12 fw700">Weight Diff.&nbsp;LBS/KGS </span>
                  <div>
                    {weightDifferenceLbs && apiData?.weightDifference
                      ? weightDifferenceLbs +
                        "/" +
                        roundValue(apiData?.weightDifference)
                      : "-"}
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </>
      )}
      <div className={mode === "ADD" ? "my-3" : " my-3"}>
        <div className="row mx-0">
          <div className="col-lg-4 col-md-5 col-11 my-2 p-0">
            <Controller
              control={control}
              name="orderDate"
              render={({ field: { onChange, value } }) => (
                <MDBDatepicker
                  className={`${errors.orderDate && "is-invalid"}`}
                  label="Date*"
                  format="yyyy-mm-dd"
                  inline
                  disabled={!isEdit}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <FormValidationError errorMessage={errors.orderDate?.message} />
          </div>

          <div className="col-lg-4 col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="reference"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  className={`${errors.reference && "is-invalid"}`}
                  label="Reference*"
                  type="text"
                  disabled={!isEdit}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <FormValidationError errorMessage={errors.reference?.message} />
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-lg-4 col-md-5 col-11 my-2 p-0">
            <Controller
              control={control}
              name="orderStatusId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Order Status*"
                  data={orderStatusDataList(value)}
                  inputClassName={errors?.orderStatusId && "is-invalid"}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  search
                  value={value}
                  disabled={!isEdit}
                  preventFirstSelection
                />
              )}
            />
            <FormValidationError errorMessage={errors.orderStatusId?.message} />
          </div>
          <div className="col-lg-4 col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="clientId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Customer*"
                  data={clientDataList(value)}
                  value={value}
                  inputClassName={errors?.clientId && "is-invalid"}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  preventFirstSelection
                  search
                  disabled={!isEdit}
                />
              )}
            />
            <FormValidationError errorMessage={errors.clientId?.message} />
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-lg-4 col-md-5 col-11 my-2 p-0">
            <Controller
              control={control}
              name="invoiceTypeId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  inputClassName={`${errors.invoiceTypeId && "is-invalid"}`}
                  data={invoiceTypeDataList(value)}
                  value={value}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  disabled={!isEdit}
                  label="Invoice Type*"
                  search
                  preventFirstSelection
                />
              )}
            />
            <FormValidationError errorMessage={errors.invoiceTypeId?.message} />
          </div>
          <div className="col-lg-4 col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="businessCurrencyId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  inputClassName={`${
                    errors.businessCurrencyId && "is-invalid"
                  }`}
                  data={currencyDataList(value)}
                  value={value}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  search
                  preventFirstSelection
                  disabled={!isEdit}
                  label="Currency*"
                />
              )}
            />
            <FormValidationError
              errorMessage={errors.businessCurrencyId?.message}
            />
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-lg-4 col-md-5 col-11 my-2 p-0">
            <Controller
              control={control}
              name="production"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  inputClassName={`${errors.production && "is-invalid"}`}
                  data={catDataList(value)}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  search
                  preventFirstSelection
                  disabled={!isEdit}
                  label="Category Type*"
                />
              )}
            />
            <FormValidationError errorMessage={errors.production?.message} />
          </div>
          <div className="col-lg-4 col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="stockroomId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  inputClassName={`${errors.stockroomId && "is-invalid"}`}
                  data={stockroomDataList(value)}
                  value={value}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  search
                  preventFirstSelection
                  disabled={!isEdit}
                  label="Stockroom*"
                />
              )}
            />
            <FormValidationError errorMessage={errors.stockroomId?.message} />
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-lg-4 col-md-5 col-11 my-2 p-0">
            <Controller
              control={control}
              name="brandId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  data={brandsDataList(value)}
                  value={value}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  search
                  preventFirstSelection
                  disabled={!isEdit}
                  label="Brand"
                />
              )}
            />
          </div>
          <div className="col-lg-4 col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="proPriority"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  label="Pro Priority*"
                  type="text"
                  className={`${errors.proPriority && "is-invalid"}`}
                  disabled={!isEdit}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <FormValidationError errorMessage={errors.proPriority?.message} />
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-lg-4 col-md-5 col-11 my-2 p-0">
            <Controller
              control={control}
              name="eta"
              render={({ field: { onChange, value } }) => (
                <MDBDatepicker
                  label="ETA"
                  format="yyyy-mm-dd"
                  inline
                  disabled={!isEdit}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div className="col-lg-2 col-md-3 col-6 mt-3">
            <Controller
              control={control}
              name="maxShipmentWeight"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  label="Max Shipment Weight"
                  type="number"
                  disabled={!isEdit}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div className="col-lg-2 col-md-2 col-5 mt-3">
            <Controller
              control={control}
              name="maxweightUnitId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  data={weightUnitsDataList(value)}
                  value={value}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  search
                  preventFirstSelection
                  disabled={!isEdit}
                  label="Unit"
                />
              )}
            />
          </div>
        </div>
        <div className="row mx-0">
          <div
            className="col-lg-4 col-md-5 col-11 my-2 p-0"
            style={{ alignSelf: "center" }}
          >
            <span className="me-5 fw500">Finalized</span>
            <Controller
              control={control}
              name="finalized"
              render={({ field: { onChange, value } }) => (
                <>
                  <MDBRadio
                    label="Yes"
                    inline
                    onChange={() => onChange(true)}
                    disabled={!isEdit}
                    checked={value === true}
                  />
                  <MDBRadio
                    label="No"
                    inline
                    onChange={() => onChange(false)}
                    checked={value === false}
                    disabled={!isEdit}
                  />
                </>
              )}
            />
          </div>
          <div
            className="col-lg-4 col-md-5 col-11 my-2"
            style={{ alignSelf: "center" }}
          >
            <span className="me-5 fw500">Show in DP</span>
            <Controller
              control={control}
              name="showinDP"
              render={({ field: { onChange, value } }) => (
                <>
                  <MDBRadio
                    label="Yes"
                    inline
                    onChange={() => onChange(true)}
                    disabled={!isEdit}
                    checked={value === true}
                  />
                  <MDBRadio
                    label="No"
                    inline
                    onChange={() => onChange(false)}
                    checked={value === false}
                    disabled={!isEdit}
                  />
                </>
              )}
            />
          </div>
        </div>
        <div className="row mx-0">
          <div
            className="col-lg-4 col-md-5 col-11 my-2 p-0"
            style={{ alignSelf: "center" }}
          >
            <span className="me-5 fw500">Running</span>
            <Controller
              control={control}
              name="running"
              render={({ field: { onChange, value } }) => (
                <>
                  <MDBRadio
                    label="Yes"
                    inline
                    onChange={() => onChange(true)}
                    disabled={!isEdit}
                    checked={value === true}
                  />
                  <MDBRadio
                    label="No"
                    inline
                    onChange={() => onChange(false)}
                    checked={value === false}
                    disabled={!isEdit}
                  />
                </>
              )}
            />
          </div>
          <div className="col-lg-4 col-md-5 col-6 mt-3">
            <Controller
              control={control}
              name="weightDifference"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  label="Weight Difference"
                  type="number"
                  disabled
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>
        <div className="row mt-1">
          <div className="my-3 col-8">
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <MDBTextArea
                  label="Description"
                  disabled={!isEdit}
                  value={value}
                  rows={4}
                  style={{ resize: "none" }}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        {mode === "ADD" && (
          <div className="mb-3">
            <span className="fw700 black">Load Items From</span>
            <div className="row mt-3">
              <div className="col-lg-4 col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="saleOrderTemplateId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      data={orderTempDataList(value)}
                      value={value}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
                          onChange(data.value);
                          const foundot = orderTempList?.find(
                            (ot) => ot.saleOrderTemplateId === data.value
                          );
                          setValue("clientId", foundot?.client?.clientId ?? 0);
                          setValue("brandId", foundot?.brand?.brandId ?? 0);
                        }
                      }}
                      search
                      preventFirstSelection
                      disabled={!isEdit}
                      label="Order Template"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
