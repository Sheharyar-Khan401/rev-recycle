import {
  Control,
  FieldErrorsImpl,
  Controller,
  UseFormSetValue,
} from "react-hook-form";
import {
  MDBDatepicker,
  MDBInput,
  MDBRadio,
  MDBSelect,
  MDBSwitch,
} from "mdb-react-ui-kit";
import FormValidationError from "shared/Components/FormValidationError";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
import { useGetBusinessCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import {
  InvoicesTableData,
  PurchaseInvoicesRequest,
} from "redux/types/Invoices/Invoices";
import { useGetShippingLineQuery } from "redux/features/purchase/Invoices/ShippingLineApiSlice";
import { ShippingLineData } from "redux/types/Invoices/shippingLine";
import { useGetAllSupplierQuery } from "redux/features/Clients/Suppliers/suppliersApiSlice";
import { useGetPortsQuery } from "redux/features/Settings/purchase/portApiSlice";
import { useGetLocationQuery } from "redux/features/Settings/purchase/locationApiSlice";
import { useGetStockRoomsQuery } from "redux/features/Settings/Productions/stockroomsApiSlice";
import { useGetGradesQuery } from "redux/features/common/gradeApiSlice";
import { Port } from "redux/types/Settings/Purchase/port";
import { Location } from "redux/types/Settings/Purchase/location";
import { StockroomsData } from "redux/types/Settings/Productions/Stockroom";
import {
  useGetInvoiceTypesQuery,
  useLazyGetInvoicesQuery,
} from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { useGetShipViaQuery } from "redux/features/common/shipviaApiSlice";
import { ShipVia } from "redux/types/common/shipvia";
import { useGetPaymentTermsQuery } from "redux/features/common/paymentTermApiSlice";
import { PaymentTerm } from "redux/types/common/paymentTerm";
import { useGetRateOnQuery } from "redux/features/purchase/Order/RateOnApiSlice";
import { RateOn } from "redux/types/common/rateOn";
import { useGetOrderStatusQuery } from "redux/features/purchase/Order/OrderStatusApiSlice";
import { OrderStatus } from "redux/types/common/orderStatus";
import { useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { Client } from "redux/types/Clients/Clients/client";
import { Grade } from "redux/types/common/grade";
import InvoiceSideCard from "shared/Components/InvoiceSideCard";
import {
  useLazyGetAllPurchaseInvoicesQuery,
  useLazyGetNonAttachedSubInvoicesQuery,
} from "redux/features/purchase/Invoices/InvoicesApiSlice";
import { useNavigate } from "react-router-dom";
interface Props {
  isEdit: boolean;
  control: Control<PurchaseInvoicesRequest, null>;
  errors: Partial<FieldErrorsImpl<PurchaseInvoicesRequest>>;
  mode: "ADD" | "EDIT";
  watch: UseFormWatch<PurchaseInvoicesRequest>;
  setValue?: UseFormSetValue<PurchaseInvoicesRequest>;
  basicInvoiceId: number;
  result?: InvoicesTableData;
}
export default function PurchaseInvoiceForm({
  isEdit,
  control,
  errors,
  mode,
  watch,
  setValue,
  basicInvoiceId,
  result,
}: Props) {
  const { data: currencyData } = useGetBusinessCurrrencyQuery(null);
  const { data: suppliersData } = useGetAllSupplierQuery(null);
  const { data: portsData } = useGetPortsQuery(null);
  const { data: locationsData } = useGetLocationQuery(null);
  const { data: shippingLineData } = useGetShippingLineQuery(null);
  const { data: stockRoomData } = useGetStockRoomsQuery(null);
  // const { data: gradeData } = useGetGradesQuery(null);
  const { data: invoiceTypeData } = useGetInvoiceTypesQuery(null);
  const { data: shipviaData } = useGetShipViaQuery(null);
  const { data: paymentTermData } = useGetPaymentTermsQuery(null);
  // const { data: rateOnData } = useGetRateOnQuery(null);
  const { data: orderStatusData } = useGetOrderStatusQuery(null);
  const [getFreightInvoices, { data: freightInvoiceData }] =
    useLazyGetNonAttachedSubInvoicesQuery();
  const [getClearingInvoices, { data: clearingInvoiceData }] =
    useLazyGetNonAttachedSubInvoicesQuery();

  let freightInvoiceResults: InvoicesTableData[] = [
    ...(freightInvoiceData?.payLoad ?? []),
  ];

  let clearingInvoiceResults: InvoicesTableData[] = [
    ...(clearingInvoiceData?.payLoad ?? []),
  ];
  if (result?.clearingInvoice && clearingInvoiceData?.payLoad) {
    clearingInvoiceResults = [
      ...clearingInvoiceResults,
      result.clearingInvoice,
    ];
  }

  if (result?.freightInvoice && freightInvoiceData?.payLoad) {
    freightInvoiceResults = [...freightInvoiceResults, result.freightInvoice];
  }

  useEffect(() => {
    if (mode === "EDIT") {
      getFreightInvoices({ params: {}, systemInvoiceId: 2 });
      getClearingInvoices({ params: {}, systemInvoiceId: 3 });
    }
  }, [mode, getFreightInvoices, getClearingInvoices]);

  const freightInvoiceDataList = (id?: number) => {
    return freightInvoiceResults.map((invoice: InvoicesTableData) => ({
      text: invoice.containerNo || "",
      value: invoice.invoiceId || 0,
      defaultSelected: invoice.invoiceId === id,
    }));
  };

  const clearingInvoiceDataList = (id?: number) => {
    return clearingInvoiceResults?.map((invoice: InvoicesTableData) => {
      return {
        text: invoice?.containerNo ? invoice?.containerNo : "",
        value: invoice?.invoiceId ? invoice?.invoiceId : 0,
        defaultSelected: invoice?.invoiceId === id,
      };
    });
  };

  const currencyDataList = (id?: number) => {
    return currencyData && currencyData?.length > 0
      ? currencyData?.map((curr: BusinessCurrency) => {
          return {
            text: curr?.currency ? curr?.currency?.name : "",
            value: curr?.businesscurrencyId ? curr?.businesscurrencyId : 0,
            defaultSelected: curr?.businesscurrencyId === id,
          };
        })
      : [];
  };
  const suppliersDataList = (id?: number) => {
    return suppliersData && suppliersData?.length > 0
      ? suppliersData?.map((supplier: Client) => {
          return {
            text: supplier?.user ? supplier?.user?.fullName : "",
            value: supplier?.clientId ? supplier?.clientId : 0,
            defaultSelected: supplier?.clientId === id,
          };
        })
      : [];
  };

  const portsDataList = (id?: number) => {
    return portsData && portsData?.length > 0
      ? portsData?.map((port: Port) => {
          return {
            text: port?.name ? port?.name : "",
            value: port?.portId ? port?.portId : 0,
            defaultSelected: port?.portId === id,
          };
        })
      : [];
  };
  const locationsDataList = (id?: number) => {
    return locationsData && locationsData?.length > 0
      ? locationsData?.map((location: Location) => {
          return {
            text: location?.name ? location?.name : "",
            value: location?.locationId ? location?.locationId : 0,
            defaultSelected: location?.locationId === id,
          };
        })
      : [];
  };

  const ShippingLineDataList = (id?: number) => {
    return shippingLineData && shippingLineData?.length > 0
      ? shippingLineData?.map((item: ShippingLineData) => {
          return {
            text: item?.name,
            value: item?.shippingLineId,
            defaultSelected: item?.shippingLineId === id,
          };
        })
      : [];
  };
  const stockRoomDataList = (id?: number) => {
    return stockRoomData && stockRoomData?.length > 0
      ? stockRoomData?.map((item: StockroomsData) => {
          return {
            text: item?.name,
            value: item?.stockRoomId,
            defaultSelected: item?.stockRoomId === id,
          };
        })
      : [];
  };
  // const gradesDataList = (id?: number) => {
  //   return gradeData && gradeData?.length > 0
  //     ? gradeData?.map((grade: Grade) => {
  //         return {
  //           text: grade?.name,
  //           value: grade?.gradeId,
  //           defaultSelected: grade?.gradeId === id,
  //         };
  //       })
  //     : [];
  // };

  const invoiceTypeDataList = (id?: number) => {
    return invoiceTypeData && invoiceTypeData?.length > 0
      ? invoiceTypeData?.map((invoiceType: InvoiceType) => {
          return {
            text: invoiceType?.name,
            value: invoiceType?.invoiceTypeId ?? 0,
            defaultSelected: invoiceType?.invoiceTypeId === id,
          };
        })
      : [];
  };
  const shipViaDataList = (id?: number) => {
    return shipviaData && shipviaData?.length > 0
      ? shipviaData?.map((item: ShipVia) => {
          return {
            text: item?.name,
            value: item?.shipViaId,
            defaultSelected: item?.shipViaId === id,
          };
        })
      : [];
  };
  const paymentTermDataList = (id?: number) => {
    return paymentTermData && paymentTermData?.length > 0
      ? paymentTermData?.map((item: PaymentTerm) => {
          return {
            text: item?.paymentTermDescription,
            value: item?.paymentTermId,
            defaultSelected: item?.paymentTermId === id,
          };
        })
      : [];
  };
  // const rateOnDataList = (id?: number) => {
  //   return rateOnData && rateOnData?.length > 0
  //     ? rateOnData?.map((item: RateOn) => {
  //         return {
  //           text: item?.name,
  //           value: item?.rateOnId,
  //           defaultSelected: item?.rateOnId === id,
  //         };
  //       })
  //     : [];
  // };
  const orderStatusDataList = (id?: number) => {
    return orderStatusData && orderStatusData?.length > 0
      ? orderStatusData?.map((item: OrderStatus) => {
          return {
            text: item?.name,
            value: item?.orderStatusId,
            defaultSelected: item?.orderStatusId === id,
          };
        })
      : [];
  };

  useEffect(() => {
    if (
      watch?.("paymentTermId") === 0 &&
      paymentTermData &&
      paymentTermData?.length > 0
    ) {
      setValue?.("paymentTermId", paymentTermData[0]?.paymentTermId);
    }
    if (
      watch?.("clientId") === 0 &&
      suppliersData &&
      suppliersData?.length > 0
    ) {
      setValue?.("clientId", suppliersData[0]?.clientId);
    }
    if (
      watch?.("invoiceTypeId") === 0 &&
      invoiceTypeData &&
      invoiceTypeData?.length > 0
    ) {
      setValue?.("invoiceTypeId", invoiceTypeData[0]?.invoiceTypeId);
    }
    if (
      watch?.("currencyId") === 0 &&
      currencyData &&
      currencyData?.length > 0
    ) {
      setValue?.(
        "currencyId",
        currencyData[0]?.businesscurrencyId
          ? currencyData[0]?.businesscurrencyId
          : 0
      );
    }
    // if (watch?.("rateOnId") === 0 && rateOnData && rateOnData?.length > 0) {
    //   setValue?.("rateOnId", rateOnData[0]?.rateOnId);
    // }
    if (
      watch?.("originLocationId") === 0 &&
      locationsData &&
      locationsData?.length > 0
    ) {
      setValue?.("originLocationId", locationsData[0]?.locationId);
    }
    if (
      watch?.("destinationLocationId") === 0 &&
      locationsData &&
      locationsData?.length > 0
    ) {
      setValue?.("destinationLocationId", locationsData[0]?.locationId);
    }
    if (watch?.("loadingPortId") === 0 && portsData && portsData?.length > 0) {
      setValue?.("loadingPortId", portsData[0]?.portId);
    }
    if (
      watch?.("dischargePortId") === 0 &&
      portsData &&
      portsData?.length > 0
    ) {
      setValue?.("dischargePortId", portsData[0]?.portId);
    }
    if (
      watch?.("orderStatusId") === 0 &&
      orderStatusData &&
      orderStatusData?.length > 0
    ) {
      setValue?.("orderStatusId", orderStatusData[0]?.orderStatusId);
    }
    if (watch?.("shipViaId") === 0 && shipviaData && shipviaData?.length > 0) {
      setValue?.("shipViaId", shipviaData[0]?.shipViaId);
    }
  }, [
    watch,
    setValue,
    paymentTermData,
    suppliersData,
    currencyData,
    locationsData,
    portsData,
    orderStatusData,
    shipviaData,
  ]);
  const navigate = useNavigate();

  return (
    <>
      <div className="my-3">
        <div className="row">
          <div className={`${mode === "EDIT" ? "col-8" : "col-12"}`}>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="invoiceDate"
                  render={({ field: { onChange, value } }) => (
                    <MDBDatepicker
                      label="Date*"
                      format="yyyy-mm-dd"
                      className={errors.invoiceDate && "is-invalid"}
                      value={value}
                      onChange={onChange}
                      inputLabel=" "
                      inline
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.invoiceDate?.message}
                />
              </div>
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="invoiceNo"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      label="Invoice No.*"
                      className={errors?.invoiceNo && "is-invalid"}
                      type="string"
                      onChange={onChange}
                      value={value}
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.invoiceNo?.message} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="bookingNumber"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      label="Booking No."
                      type="string"
                      onChange={onChange}
                      value={value}
                      disabled={!isEdit}
                    />
                  )}
                />
              </div>
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="paymentTermId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Select Terms*"
                      data={paymentTermDataList(value)}
                      inputClassName={errors?.paymentTermId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
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
                  errorMessage={errors.paymentTermId?.message}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="arrivalDate"
                  render={({ field: { onChange, value } }) => (
                    <MDBDatepicker
                      format="yyyy-mm-dd"
                      // className={`${errors.arrivalDate && "is-invalid"}`}
                      label="Arrival Date"
                      type="string"
                      inputLabel=" "
                      inline
                      value={value}
                      onChange={onChange}
                      disabled={!isEdit}
                    />
                  )}
                />
                {/* <FormValidationError
                  errorMessage={errors.arrivalDate?.message}
                /> */}
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
                  name="clientId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Supplier*"
                      data={suppliersDataList(value)}
                      inputClassName={errors?.clientId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                      preventFirstSelection
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
                      label="Type*"
                      data={invoiceTypeDataList(value)}
                      inputClassName={errors?.invoiceTypeId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
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
                  errorMessage={errors.invoiceTypeId?.message}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="currencyId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="CURR*"
                      data={currencyDataList(value)}
                      inputClassName={errors?.currencyId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
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
                  errorMessage={errors.currencyId?.message}
                />
              </div>

              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="exRate"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      label="Ex. Rate*"
                      onChange={onChange}
                      type="number"
                      className={errors?.exRate && "is-invalid"}
                      value={value}
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.exRate?.message} />
              </div>
            </div>
            <div className="row">
              {/* <div className="col-md-5 col-11 mx-2 my-2">
                <Controller
                  control={control}
                  name="rateOnId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Rate On*"
                      data={rateOnDataList(value)}
                      inputClassName={errors?.rateOnId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                      preventFirstSelection
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.rateOnId?.message} />
              </div> */}
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="originLocationId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Origins*"
                      data={locationsDataList(value)}
                      inputClassName={errors?.originLocationId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
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
                  errorMessage={errors.originLocationId?.message}
                />
              </div>
              <div
                className="col-md-5 col-11 my-2"
                style={{ alignSelf: "center" }}
              >
                <span className="me-5 fw500">Cross Trade Invoice</span>
                <Controller
                  control={control}
                  name="crossTrade"
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
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="destinationLocationId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Destination*"
                      data={locationsDataList(value)}
                      inputClassName={
                        errors?.destinationLocationId && "is-invalid"
                      }
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
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
                  errorMessage={errors.destinationLocationId?.message}
                />
              </div>
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="loadingPortId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Port Loading*"
                      data={portsDataList(value)}
                      inputClassName={errors?.loadingPortId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
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
                  errorMessage={errors.loadingPortId?.message}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="dischargePortId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Port Discharge*"
                      data={portsDataList(value)}
                      inputClassName={errors?.dischargePortId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
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
                  errorMessage={errors.dischargePortId?.message}
                />
              </div>
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="orderStatusId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Status*"
                      data={orderStatusDataList(value)}
                      inputClassName={errors?.orderStatusId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
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
                  errorMessage={errors.orderStatusId?.message}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="shipViaId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Ship Via*"
                      data={shipViaDataList(value)}
                      inputClassName={errors?.shipViaId && "is-invalid"}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                      preventFirstSelection
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.shipViaId?.message} />
              </div>

              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="bolNo"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      label="B.O.L No."
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
                  name="bolDate"
                  render={({ field: { onChange, value } }) => (
                    <MDBDatepicker
                      label="B.O.L Date"
                      format="yyyy-mm-dd"
                      value={value}
                      onChange={onChange}
                      inputLabel=" "
                      inline
                      disabled={!isEdit}
                    />
                  )}
                />
              </div>
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="expectedOffLoading"
                  render={({ field: { onChange, value } }) => (
                    <MDBDatepicker
                      label="Expected Off Loading Date"
                      format="yyyy-mm-dd"
                      value={value}
                      onChange={onChange}
                      inputLabel=" "
                      inline
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
                  name="vesselNo"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      label="Vessel No"
                      type="string"
                      onChange={onChange}
                      value={value}
                      disabled={!isEdit}
                    />
                  )}
                />
              </div>
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="shippingLineId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Shipping Line"
                      data={ShippingLineDataList(value)}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                      preventFirstSelection
                    />
                  )}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="containerNo"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      label="Container No.*"
                      className={errors?.containerNo && "is-invalid"}
                      type="string"
                      onChange={onChange}
                      value={value}
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.containerNo?.message}
                />
              </div>
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="stockroomId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      inputClassName={errors?.stockroomId && "is-invalid"}
                      label="Stockroom*"
                      data={stockRoomDataList(value)}
                      onValueChange={(data: SelectData | SelectData[]) => {
                        if (!Array.isArray(data)) {
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
                  errorMessage={errors.stockroomId?.message}
                />
              </div>
            </div>
          </div>
          {mode === "EDIT" && (
            <div className="col-4">
              <InvoiceSideCard
                name="freightInvoiceId"
                label="Container of Freight Invoice"
                getDataList={freightInvoiceDataList}
                selectedInvoice={freightInvoiceResults?.find(
                  (invoice) =>
                    invoice.invoiceId ===
                    (watch ? watch("freightInvoiceId") : null)
                )}
                onAddClick={() =>
                  navigate("/grader/purchase/invoices/freightinvoices/add", {
                    state: {
                      basicInvoiceId,
                      currencyId: watch("currencyId"),
                      containerNo: watch("containerNo"),
                      invoiceNo: watch("invoiceNo"),
                    },
                  })
                }
                onViewClick={() =>
                  navigate(
                    "/grader/purchase/invoices/freightinvoices/edit/" +
                      freightInvoiceResults?.find(
                        (invoice) =>
                          invoice.invoiceId ===
                          (watch ? watch("freightInvoiceId") : null)
                      )?.invoiceId
                  )
                }
                errors={errors}
                control={control}
                isEdit={isEdit}
                posted={result?.posted}
              />
              <InvoiceSideCard
                name="clearingInvoiceId"
                label="Container of Clearing Invoice"
                getDataList={clearingInvoiceDataList}
                selectedInvoice={clearingInvoiceResults?.find(
                  (invoice) =>
                    invoice.invoiceId ===
                    (watch ? watch("clearingInvoiceId") : null)
                )}
                onAddClick={() =>
                  navigate("/grader/purchase/invoices/clearinginvoices/add", {
                    state: {
                      basicInvoiceId,
                      currencyId: watch("currencyId"),
                      containerNo: watch("containerNo"),
                      invoiceNo: watch("invoiceNo"),
                    },
                  })
                }
                onViewClick={() =>
                  navigate(
                    "/grader/purchase/invoices/clearinginvoices/edit/" +
                      clearingInvoiceResults?.find(
                        (invoice) =>
                          invoice.invoiceId ===
                          (watch ? watch("clearingInvoiceId") : null)
                      )?.invoiceId
                  )
                }
                errors={errors}
                control={control}
                isEdit={isEdit}
                posted={result?.posted}
              />
              {/* <div className="border p-3 rounded-1 bg-light my-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="fs-6 fw-bold mb-3">Price / LBS Alert</div>
                    <div>
                      By enabling this option you will receive an email alert
                      when price eceeds from normal range
                    </div>
                  </div>
                  <div>
                    <Controller
                      control={control}
                      name="limitAlert"
                      render={({ field: { onChange, value } }) => (
                        <MDBSwitch checked={value} onChange={onChange} disabled={!isEdit} />
                      )}
                    />
                  </div>
                </div>
              </div> */}
              <div className="border p-3 rounded-1 bg-light my-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="fs-6 fw-bold mb-3">
                      Container or Location Alert
                    </div>
                    <div>
                      By enabling this option you will receive an email alert
                      when this invoice will be converted to gatepass
                    </div>
                  </div>
                  <div>
                    <Controller
                      control={control}
                      name="gatePassAlert"
                      render={({ field: { onChange, value } }) => (
                        <MDBSwitch checked={value} onChange={onChange} disabled={!isEdit} />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
