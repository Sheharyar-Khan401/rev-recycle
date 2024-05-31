import { MDBInput, MDBSelect } from "mdb-react-ui-kit";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Account } from "redux/types/Finance/PrimaryData/account";
import FormValidationError from "shared/Components/FormValidationError";
import { BankAccount } from "redux/types/Finance/PrimaryData/bankAccount";
interface Props {
  isEdit: boolean;
  errors: FieldErrors<BankAccount>;
  control: Control<BankAccount, null>
  data: Account[];
  mode: string;
}

export default function BankAccountForm({
  isEdit,
  control,
  errors,
  data,
  mode,
}: Props) {
  const accountDataList = (id: number | unknown) => {
    return data?.map((val: Account) => {
      return {
        text: val.accountTitle,
        value: val?.accountId,
        defaultSelected: val.accountId === id,
      };
    });
  };
  return (
    <div className="my-2">
      {mode === "ADD" && (
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12 my-3">
            <Controller
              control={control}
              name="accountId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Account*"
                  inputClassName={errors.accountId && "is-invalid"}
                  data={accountDataList(value)}
                  onValueChange={(data) => {
                    if ("value" in data) {
                      onChange(data.value);
                    }
                  }}
                  preventFirstSelection
                  search
                  disabled={!isEdit}
                />
              )}
            />
            <FormValidationError errorMessage={errors.accountId?.message} />
          </div>
        </div>
      )}
      {mode === "EDIT" && (
        <>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="linkedAccountTitle"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Linked Account Title"
                    onChange={onChange}
                    disabled
                    value={value}
                  />
                )}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="bankAccountTitle"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Bank Account Title*"
                    className={errors.bankAccountTitle && "is-invalid"}
                    onChange={onChange}
                    disabled={!isEdit}
                    value={value}
                  />
                )}
              />
              <FormValidationError
                errorMessage={errors.bankAccountTitle?.message}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="bankAccountCode"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Bank Account Code"
                    onChange={onChange}
                    disabled={!isEdit}
                    value={value}
                  />
                )}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="bankName"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Bank Name"
                    onChange={onChange}
                    disabled={!isEdit}
                    value={value}
                  />
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="nameOfBranch"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Branch Name"
                    onChange={onChange}
                    disabled={!isEdit}
                    value={value}
                  />
                )}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="bankIbanNumber"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="IBAN"
                    onChange={onChange}
                    disabled={!isEdit}
                    value={value}
                  />
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="address"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Address"
                    onChange={onChange}
                    disabled={!isEdit}
                    value={value}
                  />
                )}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="emailAddress"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Email"
                    onChange={onChange}
                    disabled={!isEdit}
                    value={value}
                  />
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="faxNumber"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Fax"
                    onChange={onChange}
                    disabled={!isEdit}
                    value={value}
                  />
                )}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Phone"
                    onChange={onChange}
                    disabled={!isEdit}
                    value={value}
                  />
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="payableAccountId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="PDC Payable Account Title"
                    data={accountDataList(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    preventFirstSelection
                    disabled={!isEdit}
                    value={value}
                    search
                  />
                )}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="receivableAccountId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="PDC Receiveable Account Title"
                    data={accountDataList(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    preventFirstSelection
                    disabled={!isEdit}
                    value={value}
                    search
                  />
                )}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
