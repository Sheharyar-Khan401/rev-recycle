import { MDBInput, MDBDatepicker, MDBSwitch } from "mdb-react-ui-kit";
import {
  Control,
  Controller,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import { FiscalYearRequest } from "redux/types/Finance/PrimaryData/fiscalyear";

interface Props {
  isEdit: boolean;
  mode: string;
  watch: UseFormWatch<FiscalYearRequest>;
  control: Control<FiscalYearRequest, null>;
  errors: FieldErrors<FiscalYearRequest>;
}
export default function FiscalGroupForm({
  mode,
  watch,
  isEdit,
  control,
  errors,
}: Props) {
  let d = new Date(watch("startDate"));
  d.setDate(d.getDate() - 1);
  return (
    <div>
      <div className="col-lg-4 col-md-6 col-11 my-3">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <MDBInput
              className={`${errors.name && "is-invalid"}`}
              label="Fiscal Year*"
              type="text"
              disabled={!isEdit}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <FormValidationError errorMessage={errors.name?.message} />
      </div>
      <div className="col-lg-4 col-md-6 col-11 my-3">
        <Controller
          control={control}
          name="startDate"
          render={({ field: { onChange, value } }) => (
            <MDBDatepicker
              label="Start Date*"
              format="yyyy-mm-dd"
              className={errors.startDate && "is-invalid"}
              value={value}
              onChange={onChange}
              inputLabel=" "
              inline
              disabled={!isEdit}
            />
          )}
        />
        <FormValidationError errorMessage={errors.startDate?.message} />
      </div>
      <div className="col-lg-4 col-md-6 col-11 my-3">
        <Controller
          control={control}
          name="endDate"
          render={({ field: { onChange, value } }) => (
            <MDBDatepicker
              label="End Date*"
              format="yyyy-mm-dd"
              className={errors.endDate && "is-invalid"}
              value={value}
              onChange={onChange}
              inputLabel=" "
              inline
              disabled={!isEdit}
              min={d}
            />
          )}
        />
        <FormValidationError errorMessage={errors.endDate?.message} />
      </div>
      <hr />
      <div className="col-lg-4 col-md-6 col-11 my-3">
        <Controller
          control={control}
          name="active"
          render={({ field: { value, onChange } }) => (
            <MDBSwitch
              label="Status"
              checked={value}
              disabled={!isEdit}
              onChange={onChange}
              labelClass="fw-bold"
            />
          )}
        />
        <FormValidationError errorMessage={errors.active?.message} />
      </div>
    </div>
  );
}
