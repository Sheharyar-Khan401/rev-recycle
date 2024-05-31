import { MDBInput, MDBRadio, MDBSelect } from "mdb-react-ui-kit";
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import { Account } from "redux/types/Finance/PrimaryData/account";
import PhoneInput from "react-phone-input-2";
import { useGetAllAccountsQuery } from "redux/features/finance/primarydata/accountApiSlice";
import { useGetBusinessCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { ClientRequest } from "redux/types/Clients/Clients/client";
interface Props {
  isEdit: boolean;
  control: Control<ClientRequest>;
  errors: Partial<FieldErrorsImpl<ClientRequest>>;
  mode: string;
}

export default function AgentForm({ isEdit, control, errors }: Props) {
  const { data } = useGetAllAccountsQuery(null);
  const { data: currencyData } = useGetBusinessCurrrencyQuery(null);
  const payableAccDataList = (id: number) => {
    return (
      data ? data?.map((account: Account) => {
        return {
          text: account?.accountTitle,
          value: account?.accountId,
          defaultSelected: account?.accountId === id,
        };
      }) : []
    );
  };
  const currencyDataList = (id: number) => {
    return (
      currencyData ? currencyData?.map((account: BusinessCurrency) => {
        return {
          text: account.currency ? account.currency?.name : "",
          value: account.businesscurrencyId ? account.businesscurrencyId : 0,
          defaultSelected: account.businesscurrencyId === id,
        };
      }) : []
    );
  };

  return (
    <div className="my-3">
      <div className="row">
        <div className="col-lg-4 col-md-5 col-11 my-2 ">
          <Controller
            control={control}
            name="clientName"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.clientName && "is-invalid"}`}
                label="Name"
                type="text"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.clientName?.message} />
        </div>
        <div className="col-lg-4 col-md-5 col-11 my-2 ">
          <Controller
            control={control}
            name="businessCurrencyId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                inputClassName={`${errors.businessCurrencyId && "is-invalid"}`}
                data={currencyDataList(value)}
                onValueChange={(data) => {
                  if ("value" in data) {
                    onChange(data.value);
                  }
                }}
                search
                preventFirstSelection
                disabled={!isEdit}
                label="Currency"
              />
            )}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-5 col-11 my-2">
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.code && "is-invalid"}`}
                label="Code"
                type="text"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.code?.message} />
        </div>

        <div className="col-lg-4 col-md-5 col-11 my-2">
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.address && "is-invalid"}`}
                label="Address"
                type="text"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.address?.message} />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-5 col-11 my-2">
          <Controller
            control={control}
            name="phoneNo"
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                country={"us"}
                inputStyle={{ width: "100%", height: "36px" }}
                specialLabel={""}
                enableAreaCodes={true}
                disabled={!isEdit}
                enableSearch
                value={value}
                onChange={onChange}
              />
            )}
          />
          <FormValidationError errorMessage={errors.phoneNo?.message} />
        </div>

        <div className="col-lg-4 col-md-5 col-11 my-2">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.email && "is-invalid"}`}
                label="Email"
                type="text"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.email?.message} />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-5 col-11 my-2 d-flex align-items-center">
          <label htmlFor="exampleColorInput" className="form-label me-3">
            Choose Color
          </label>

          <Controller
            control={control}
            name="color"
            render={({ field: { onChange, value } }) => (
              <input
                type="color"
                className="form-control form-control-color"
                value={value}
                title="Choose your color"
                disabled={!isEdit}
                onChange={onChange}
              />
            )}
          />
          <FormValidationError errorMessage={errors.color?.message} />
        </div>
        <div className="col-lg-4 col-md-5 col-11 my-2">
          <span className="me-5 fw500">Active</span>
          <Controller
            control={control}
            name="active"
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
        <div className="col-lg-4 col-md-5 col-11 my-2">
          <Controller
            control={control}
            name="payableAccountId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                data={payableAccDataList(value)}
                onValueChange={(data) => {
                  if ("value" in data) {
                    onChange(data.value);
                  }
                }}
                search
                disabled={!isEdit}
                label="Payable Account"
                preventFirstSelection
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
