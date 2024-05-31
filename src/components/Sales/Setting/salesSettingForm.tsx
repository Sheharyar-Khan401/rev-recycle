import { MDBSwitch } from "mdb-react-ui-kit";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { BasicData } from "redux/types/Sales/setting/basic";

interface Props {
  isEdit: boolean;
  mode: string;
  control: Control<BasicData, null>;
  errors: FieldErrors<BasicData>;
}
export default function SalesSettingForm({
  mode,
  isEdit,
  control,
  errors,
}: Props) {
  return (
    <div className="d-flex flex-lg-row flex-column">
      <div className="col-lg-6 col-12">
        <Controller
          control={control}
          name="postGPbeforeConversion"
          render={({ field: { onChange, value } }) => (
            <MDBSwitch
              label="Require posting of sale Gate Pass Before Conversion"
              inline
              onChange={onChange}
              value={value.toString()}
              disabled={!isEdit}
              checked={value===true}
            />
          )}
        />
      </div>
      <div className="col-lg-6 col-11 mt-lg-0 mt-3">
        <Controller
          control={control}
          name="recordProfit"
          render={({ field: { onChange, value } }) => (
            <MDBSwitch
              label="Record Profit Separately"
              onChange={onChange}
              checked={value===true}
              value={value.toString()}
              disabled={!isEdit}
            />
          )}
        />
      </div>
    </div>
  );
}
