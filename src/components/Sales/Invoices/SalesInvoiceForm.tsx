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
  MDBTextArea,
} from "mdb-react-ui-kit";
import FormValidationError from "shared/Components/FormValidationError";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
import { useGetBusinessCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import {
  InvoicesTableData,
  PurchaseInvoicesRequest,
} from "redux/types/Invoices/Invoices";
import { useGetPortsQuery } from "redux/features/Settings/purchase/portApiSlice";
import { useGetLocationQuery } from "redux/features/Settings/purchase/locationApiSlice";
import { Port } from "redux/types/Settings/Purchase/port";
import { Location } from "redux/types/Settings/Purchase/location";
import {
  useGetInvoiceTypesQuery,
  useLazyGetFreightAndClearingInvoicesQuery,
  useLazyGetFreightAndClearingNonAttachedSubInvoicesQuery,
  useLazyGetInvoicesQuery,
} from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { useGetShipViaQuery } from "redux/features/common/shipviaApiSlice";
import { ShipVia } from "redux/types/common/shipvia";
import { useGetPaymentTermsQuery } from "redux/features/common/paymentTermApiSlice";
import { PaymentTerm } from "redux/types/common/paymentTerm";
import { useGetOrderStatusQuery } from "redux/features/purchase/Order/OrderStatusApiSlice";
import { OrderStatus } from "redux/types/common/orderStatus";
import { useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { useGetAllbankAccountsQuery } from "redux/features/finance/primarydata/bankAccountApiSlice";
import { BankAccount } from "redux/types/Finance/PrimaryData/bankAccount";
import { Client } from "redux/types/Clients/Clients/client";
import InvoiceSideCard from "shared/Components/InvoiceSideCard";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
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
export default function SalesInvoiceForm({
  isEdit,
  control,
  errors,
  mode,
  watch,
  setValue,
  basicInvoiceId,
  result,
}: Props) {
  const navigate = useNavigate();

  const { data: currencyData } = useGetBusinessCurrrencyQuery(null);
  const { data: clientsData } = useGetAllClientsQuery(null);
  const { data: portsData } = useGetPortsQuery(null);
  const { data: locationsData } = useGetLocationQuery(null);
  const { data: invoiceTypeData } = useGetInvoiceTypesQuery(null);
  const { data: shipviaData } = useGetShipViaQuery(null);
  const { data: paymentTermData } = useGetPaymentTermsQuery(null);
  const { data: orderStatusData } = useGetOrderStatusQuery(null);
  const { data: bankData } = useGetAllbankAccountsQuery({});

  const [getFreightInvoices, { data: freightInvoiceData }] =
    useLazyGetFreightAndClearingNonAttachedSubInvoicesQuery();
  const [getClearingInvoices, { data: clearingInvoiceData }] =
    useLazyGetFreightAndClearingNonAttachedSubInvoicesQuery();
  const [getCncInvoices, { data: cncInvoicesData }] =
    useLazyGetFreightAndClearingNonAttachedSubInvoicesQuery();
  const [getOtherInvoices, { data: otherInvoicesData }] =
    useLazyGetFreightAndClearingNonAttachedSubInvoicesQuery();

  let otherInvoiceResults: InvoicesTableData[] = [
    ...(otherInvoicesData?.payLoad ?? []),
  ];

  let cncInvoiceResults: InvoicesTableData[] = [
    ...(cncInvoicesData?.payLoad ?? []),
  ];

  let clearingInvoiceResults: InvoicesTableData[] = [
    ...(clearingInvoiceData?.payLoad ?? []),
  ];

  let freightInvoiceResults: InvoicesTableData[] = [
    ...(freightInvoiceData?.payLoad ?? []),
  ];

  if (result?.otherInvoice && otherInvoicesData?.payLoad) {
    otherInvoiceResults = [...otherInvoiceResults, result.otherInvoice];
  }

  if (result?.cncInvoice && cncInvoicesData?.payLoad?.length) {
    cncInvoiceResults = [...cncInvoiceResults, result.cncInvoice];
  }

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
      getCncInvoices({ params: {}, systemInvoiceId: 8 });
      getOtherInvoices({ params: {}, systemInvoiceId: 9 });
    }
  }, [
    mode,
    getFreightInvoices,
    getClearingInvoices,
    getCncInvoices,
    getOtherInvoices,
  ]);

  const freightInvoiceDataList = (id?: number) => {
    return freightInvoiceResults
      ? freightInvoiceResults?.map((invoice: InvoicesTableData) => {
          return {
            text: invoice?.invoiceNo,
            value: invoice?.invoiceId,
            defaultSelected: invoice?.invoiceId === id,
          };
        })
      : [];
  };
  const clearingInvoiceDataList = (id?: number) => {
    return clearingInvoiceResults
      ? clearingInvoiceResults?.map((invoice: InvoicesTableData) => {
          return {
            text: invoice?.invoiceNo,
            value: invoice?.invoiceId,
            defaultSelected: invoice?.invoiceId === id,
          };
        })
      : [];
  };
  const cncInvoiceDataList = (id?: number) => {
    return (
      cncInvoiceResults?.map((invoice: InvoicesTableData) => {
        return {
          text: invoice?.invoiceNo,
          value: invoice?.invoiceId,
          defaultSelected: invoice?.invoiceId === id,
        };
      }) ?? []
    );
  };
  const otherInvoiceDataList = (id?: number) => {
    return (
      otherInvoiceResults?.map((invoice: InvoicesTableData) => {
        return {
          text: invoice?.invoiceNo,
          value: invoice?.invoiceId,
          defaultSelected: invoice?.invoiceId === id,
        };
      }) ?? []
    );
  };

  const currencyDataList = (id?: number) => {
    return (
      currencyData?.map((curr: BusinessCurrency) => {
        return {
          text: curr?.currency?.name ?? "-",
          value: curr?.businesscurrencyId ?? 0,
          defaultSelected: curr?.businesscurrencyId === id,
        };
      }) ?? []
    );
  };
  const clientsDataList = (id?: number) => {
    return (
      clientsData?.map((supplier: Client) => {
        return {
          text: supplier?.user?.fullName,
          value: supplier?.clientId,
          defaultSelected: supplier?.clientId === id,
        };
      }) ?? []
    );
  };

  const portsDataList = (id?: number) => {
    return portsData
      ? portsData?.map((port: Port) => {
          return {
            text: port?.name,
            value: port?.portId,
            defaultSelected: port?.portId === id,
          };
        })
      : [];
  };
  const locationsDataList = (id?: number) => {
    return locationsData
      ? locationsData?.map((location: Location) => {
          return {
            text: location?.name,
            value: location?.locationId,
            defaultSelected: location?.locationId === id,
          };
        })
      : [];
  };

  const invoiceTypeDataList = (id?: number) => {
    return invoiceTypeData
      ? invoiceTypeData?.map((invoiceType: InvoiceType) => {
          return {
            text: invoiceType?.name,
            value: invoiceType?.invoiceTypeId,
            defaultSelected: invoiceType?.invoiceTypeId === id,
          };
        })
      : [];
  };
  const shipViaDataList = (id?: number) => {
    return shipviaData
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
    return paymentTermData
      ? paymentTermData?.map((item: PaymentTerm) => {
          return {
            text: item?.paymentTermDescription,
            value: item?.paymentTermId,
            defaultSelected: item?.paymentTermId === id,
          };
        })
      : [];
  };
  const orderStatusDataList = (id?: number) => {
    return orderStatusData
      ? orderStatusData?.map((item: OrderStatus) => {
          return {
            text: item?.name,
            value: item?.orderStatusId,
            defaultSelected: item?.orderStatusId === id,
          };
        })
      : [];
  };
  const bankAccountDataList = (id?: number) => {
    return bankData
      ? bankData?.map((item: BankAccount) => {
          return {
            text: item?.bankAccountTitle ? item?.bankAccountTitle : "",
            value: item?.bankAccountId ? item?.bankAccountId : 0,
            defaultSelected: item?.bankAccountId === id,
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
      watch?.("currencyId") === 0 &&
      currencyData &&
      currencyData?.length > 0
    ) {
      setValue?.("currencyId", currencyData[0]?.businesscurrencyId);
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
    clientsData,
    paymentTermData,
    currencyData,
    orderStatusData,
    invoiceTypeData,
    shipviaData,
    watch,
    setValue,
  ]);
  return (
    <>
      <div className="my-3">
        <div className="row">
          <div className={`${mode === "EDIT" ? "col-8" : "col-12"}`}>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="referenceNumber"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      className={`${errors.referenceNumber && "is-invalid"}`}
                      label="Reference*"
                      type="string"
                      onChange={onChange}
                      value={value}
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.referenceNumber?.message}
                />
              </div>
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
            </div>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="clientId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Select Customer*"
                      data={clientsDataList(value)}
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
                  name="currencyId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Currency*"
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
                      className={`${errors.exRate && "is-invalid"}`}
                      label="Ex. Rate*"
                      type="string"
                      onChange={onChange}
                      value={value}
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.exRate?.message} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="originLocationId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Origin"
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
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="destinationLocationId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Destination"
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
            </div>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="loadingPortId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Port Loading"
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
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="dischargePortId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Port Discharge"
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
            </div>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="eta"
                  render={({ field: { onChange, value } }) => (
                    <MDBDatepicker
                      label="ETA"
                      format="yyyy-mm-dd"
                      className={errors.eta && "is-invalid"}
                      value={value}
                      onChange={onChange}
                      inputLabel=" "
                      inline
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.eta?.message} />
              </div>
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="etd"
                  render={({ field: { onChange, value } }) => (
                    <MDBDatepicker
                      label="ETD"
                      format="yyyy-mm-dd"
                      className={errors.etd && "is-invalid"}
                      value={value}
                      onChange={onChange}
                      inputLabel=" "
                      inline
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.etd?.message} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="sealNo"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      className={`${errors.sealNo && "is-invalid"}`}
                      label="Seal No."
                      type="string"
                      onChange={onChange}
                      value={value}
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.sealNo?.message} />
              </div>
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="invoiceNo"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      className={`${errors.invoiceNo && "is-invalid"}`}
                      label="Invoice No."
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
                  name="bolDate"
                  render={({ field: { onChange, value } }) => (
                    <MDBDatepicker
                      label="B.O.L Date"
                      format="yyyy-mm-dd"
                      className={errors.bolDate && "is-invalid"}
                      value={value}
                      onChange={onChange}
                      inputLabel=" "
                      inline
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.bolDate?.message} />
              </div>
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="bolNo"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      className={`${errors.bolNo && "is-invalid"}`}
                      label="B.O.L No."
                      type="string"
                      onChange={onChange}
                      value={value}
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.bolNo?.message} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="vesselNo"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      className={`${errors.vesselNo && "is-invalid"}`}
                      label="Vessel No."
                      type="string"
                      onChange={onChange}
                      value={value}
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.vesselNo?.message} />
              </div>
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="bookingNumber"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      className={`${errors.bookingNumber && "is-invalid"}`}
                      label="Booking No."
                      type="string"
                      onChange={onChange}
                      value={value}
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.bookingNumber?.message}
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
                  name="containerNo"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      label="Container No."
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
            </div>
            <div className="row">
              {mode === "EDIT" && (
                <div className="col-md-5 col-11 my-2">
                  <Controller
                    control={control}
                    name="brandName"
                    render={({ field: { onChange, value } }) => (
                      <MDBInput
                        className={`${errors.containerNo && "is-invalid"}`}
                        label="Brand Name"
                        type="string"
                        onChange={onChange}
                        value={value}
                        disabled={true}
                      />
                    )}
                  />
                  <FormValidationError
                    errorMessage={errors.containerNo?.message}
                  />
                </div>
              )}
              <div className="col-md-5 col-11 my-2">
                <span className="me-5 fw500">Record Profit Separately</span>
                <Controller
                  control={control}
                  name="recordProfit"
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
              <div className="col-md-5 col-12 my-2">
                <div className="row">
                  <div className="col-12 my-2">
                    <h5>Tax</h5>
                  </div>
                </div>

                <Controller
                  control={control}
                  name="tax"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      className={`${errors.tax && "is-invalid"}`}
                      label="Tax %*"
                      onChange={onChange}
                      value={value}
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.tax?.message} />
              </div>
              {mode === "EDIT" && (
                <div className="col-md-5 col-12 my-2">
                  <div className="row">
                    <div className="col-12 my-2">
                      <h5>Discount</h5>
                    </div>
                  </div>
                  <Controller
                    control={control}
                    name="discount"
                    render={({ field: { onChange, value } }) => (
                      <MDBInput
                        className={`${errors.tax && "is-invalid"}`}
                        label="Amount %*"
                        type="string"
                        onChange={onChange}
                        value={value}
                        disabled={!isEdit}
                      />
                    )}
                  />
                  <FormValidationError errorMessage={errors.tax?.message} />
                </div>
              )}
            </div>

            <div className="row">
              <div className="col-12 my-2">
                <h5>Print Settings</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="rateDecimalPlaces"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      className={`${errors.rateDecimalPlaces && "is-invalid"}`}
                      label="Rate Decimal Places*"
                      type="string"
                      onChange={onChange}
                      value={value}
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.rateDecimalPlaces?.message}
                />
              </div>
              <div className="col-md-5 col-11 my-2">
                <Controller
                  control={control}
                  name="branchBankAccountId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Bank Account"
                      data={bankAccountDataList(value)}
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
            {mode === "EDIT" && (
              <div className="row">
                <div className="col-md-10 col-12 my-2">
                  <div className="row">
                    <div className="col-12 my-2">
                      <h5>Description</h5>
                    </div>
                  </div>
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <MDBTextArea
                        rows={2}
                        className={`${
                          errors.rateDecimalPlaces && "is-invalid"
                        }`}
                        label="Description*"
                        onChange={onChange}
                        value={value}
                        disabled={!isEdit}
                      />
                    )}
                  />
                  <FormValidationError
                    errorMessage={errors.rateDecimalPlaces?.message}
                  />
                </div>
              </div>
            )}
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
                  navigate("/grader/sales/invoices/freightinvoices/add", {
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
                    "/grader/sales/invoices/freightinvoices/edit/" +
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
                  navigate("/grader/sales/invoices/clearinginvoices/add", {
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
                    "/grader/sales/invoices/clearinginvoices/edit/" +
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
              <InvoiceSideCard
                name="cncInvoiceId"
                label="Container of CNC / COC Invoice"
                getDataList={cncInvoiceDataList}
                selectedInvoice={cncInvoiceResults?.find(
                  (invoice) =>
                    invoice.invoiceId === (watch ? watch("cncInvoiceId") : null)
                )}
                onAddClick={() =>
                  navigate("/grader/sales/invoices/cncinvoices/add", {
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
                    "/grader/sales/invoices/cncinvoices/edit/" +
                      cncInvoiceResults?.find(
                        (invoice) =>
                          invoice.invoiceId ===
                          (watch ? watch("cncInvoiceId") : null)
                      )?.invoiceId
                  )
                }
                errors={errors}
                control={control}
                isEdit={isEdit}
                posted={result?.posted}
              />
              <InvoiceSideCard
                name="otherInvoiceId"
                label="Container of Other Exp Invoice"
                getDataList={otherInvoiceDataList}
                selectedInvoice={otherInvoiceResults?.find(
                  (invoice) =>
                    invoice.invoiceId ===
                    (watch ? watch("otherInvoiceId") : null)
                )}
                onAddClick={() =>
                  navigate("/grader/sales/invoices/otherinvoices/add", {
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
                    "/grader/sales/invoices/otherinvoices/edit/" +
                      otherInvoiceResults?.find(
                        (invoice) =>
                          invoice.invoiceId ===
                          (watch ? watch("otherInvoiceId") : null)
                      )?.invoiceId
                  )
                }
                errors={errors}
                control={control}
                isEdit={isEdit}
                posted={result?.posted}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
