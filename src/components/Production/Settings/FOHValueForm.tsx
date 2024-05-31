import { MDBInput, MDBDatepicker, MDBSelect } from "mdb-react-ui-kit";
import FormValidationError from "shared/Components/FormValidationError";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseFormWatch,
} from "react-hook-form";
import { Account } from "redux/types/Finance/PrimaryData/account";
import { ProductionFOHValuesRequest } from "redux/types/Productions/Settings";

interface Props {
  isEdit: boolean;
  control: Control<ProductionFOHValuesRequest>;
  errors: Partial<FieldErrorsImpl<ProductionFOHValuesRequest>>;
  watch: UseFormWatch<ProductionFOHValuesRequest>;
  mode: string;
  accountsData: Account[];
}
export default function FOHValueForm({
  mode,
  watch,
  isEdit,
  control,
  errors,
  accountsData,
}: Props) {
  let d = new Date(watch("fohDate"));
  d.setDate(d.getDate() - 1);
  const accountsDataList = (id: number) => {
    return accountsData?.map((account) => {
      return {
        text: account.accountTitle,
        value: account.accountId,
        defaultSelected: account.accountId === id,
      };
    });
  };
  return (
    <div className="m-3">
      <div>
        <div className="col-lg-4 col-md-6 col-11 my-3 mx-3">
          <Controller
            control={control}
            name="fohDate"
            render={({ field: { onChange, value } }) => (
              <MDBDatepicker
                label="Date"
                format="yyyy-mm-dd"
                className={errors.fohDate && "is-invalid"}
                value={value}
                onChange={onChange}
                inputLabel=" "
                inline
                disabled={!isEdit}
              />
            )}
          />
          <FormValidationError errorMessage={errors.fohDate?.message} />
        </div>
        <div className="col-lg-4 col-md-6 col-11 my-3 mx-3">
          <Controller
            control={control}
            name="fohValue"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.fohValue && "is-invalid"}`}
                label="FOH Value"
                type="number"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.fohValue?.message} />
        </div>
        <div className="col-lg-4 col-md-6 col-11 mx-3 my-3">
          <Controller
            control={control}
            name="accountId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                label="Account"
                size="lg"
                inputClassName={errors.accountId && "is-invalid"}
                data={accountsDataList(value)}
                onValueChange={(data) => {
                  if ("value" in data) {
                    onChange(data.value);
                  }
                }}
                preventFirstSelection
                disabled={!isEdit}
              />
            )}
          />
          <FormValidationError errorMessage={errors.accountId?.message} />
        </div>
        <hr />
      </div>
    </div>
  );
}
