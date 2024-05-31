import { MDBDatepicker, MDBInput, MDBSelect } from "mdb-react-ui-kit";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { VoucherRequest } from "redux/types/Finance/PrimaryData/bankreceiptvoucher";
import { CashAccount } from "redux/types/Finance/PrimaryData/cashaccount";
import { OrderStatus } from "redux/types/common/orderStatus";

interface Props {
  mode: string;
  isEdit: boolean;
  setValue: UseFormSetValue<VoucherRequest>;
  control: Control<VoucherRequest, null>;
  errors: FieldErrors<VoucherRequest>;
  currencyData: BusinessCurrency[];
  cashData: CashAccount[];
  orderStatusData: OrderStatus[];
}
export default function CashPaymentVoucherForm({
  control,
  errors,
  currencyData,
  cashData,
  isEdit,
  mode,
  orderStatusData,
}: Props) {
  const currancyDataList = (id: number | string) => {
    return currencyData?.map((status: BusinessCurrency) => {
      return {
        text: status?.currencyName ? status?.currencyName : "",
        value: status?.businesscurrencyId ? status?.businesscurrencyId : 0,
        defaultSelected: status?.businesscurrencyId === id,
      };
    });
  };
  const cashDataList = (id: number | string) => {
    return cashData?.map((status: CashAccount) => {
      return {
        text: status?.accountTitle ? status?.accountTitle : "",
        value: status?.cashAccountId ? status?.cashAccountId : 0,
        defaultSelected: status?.cashAccountId === id,
      };
    });
  };
  const orderStatusDataList = (id?: number | string) => {
    return orderStatusData?.map((status: OrderStatus) => {
      return {
        text: status?.name ? status?.name : "",
        value: status?.orderStatusId ? status?.orderStatusId : 0,
        defaultSelected: status?.orderStatusId === id,
      };
    });
  };
  const isModeAdd = mode === "ADD" ? false : true;

  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-11 my-2">
          <Controller
            control={control}
            name="vochrd"
            render={({ field: { onChange, value } }) => (
              <MDBDatepicker
                label="Date*"
                format="yyyy-mm-dd"
                className={errors.vochrd && "is-invalid"}
                value={value}
                disabled={isModeAdd}
                onChange={onChange}
                inputLabel=" "
                inline
              />
            )}
          />
          <FormValidationError errorMessage={errors.vochrd?.message} />
        </div>
        <div className="col-lg-4 col-md-4 col-11 my-2">
          <Controller
            control={control}
            name="voucherId"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.voucherId && "is-invalid"}`}
                label="Voucher ID*"
                type="number"
                disabled
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.voucherId?.message} />
        </div>
      </div>
      <div className="row">
        {mode === "ADD" ? (
          <div className="col-lg-4 col-md-4 col-11 my-2">
            <Controller
              control={control}
              name="cashaccountId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Cash Account"
                  type="number"
                  disabled={isModeAdd}
                  data={cashDataList(value ? value : 0)}
                  onValueChange={(data) => {
                    if ("value" in data) {
                      onChange(data.value);
                    }
                  }}
                  preventFirstSelection
                  search
                  value={value}
                />
              )}
            />
          </div>
        ) : (
          <div className="col-lg-4 col-md-4 col-11 my-2">
            <Controller
              control={control}
              name="voucherType"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  label="Type"
                  disabled={isModeAdd}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        )}
        <div className="col-lg-4 col-md-4 col-11 my-2">
          <Controller
            control={control}
            name="currencyId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                label="Currency*"
                disabled={isModeAdd}
                inputClassName={`${errors.currencyId && "is-invalid"}`}
                preventFirstSelection
                search
                data={currancyDataList(value)}
                onValueChange={(data) => {
                  if ("value" in data) {
                    onChange(data.value);
                  }
                }}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.currencyId?.message} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-11 my-2">
          <Controller
            control={control}
            name="voucherStatusId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                label="Status*"
                disabled
                inputClassName={`${errors.voucherStatusId && "is-invalid"}`}
                search
                data={orderStatusDataList(value)}
                onValueChange={(data) => {
                  if ("value" in data) {
                    onChange(data.value);
                  }
                }}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.voucherStatusId?.message} />
        </div>
        <div className="col-lg-4 col-md-4 col-11 my-2">
          <Controller
            control={control}
            name="voucherExchangeRate"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                label="Exchange Rate*"
                type="number"
                onChange={onChange}
                className={`${errors.voucherExchangeRate && "is-invalid"}`}
                value={value}
                disabled
              />
            )}
          />
          <FormValidationError
            errorMessage={errors.voucherExchangeRate?.message}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-11 my-2">
          <Controller
            control={control}
            name="particulars"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                label="Particulars"
                type="string"
                disabled={isModeAdd}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
      </div>
    </>
  );
}
