import { MDBInput, MDBSwitch } from "mdb-react-ui-kit";
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import { bundlesRequest } from "redux/types/Productions/bundles";
import CustomButton from "shared/Components/CustomButton";

interface Props {
  isEdit: boolean;
  control: Control<bundlesRequest>;
  errors: Partial<FieldErrorsImpl<bundlesRequest>>;
  hidePrint: boolean;
}
export default function BundlesForm({
  isEdit,
  control,
  errors,
  hidePrint,
}: Props) {
  return (
    <>
      <div>
        <Controller
          control={control}
          name="barcode"
          render={({ field: { onChange, value } }) => (
            <MDBInput
              className={`${errors.barcode && "is-invalid"}`}
              label="barcode"
              disabled={!isEdit}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <FormValidationError errorMessage={errors.barcode?.message} />
      </div>
      <div className="d-flex flex-lg-row flex-column justify-content-between mt-2">
        <div className="mt-lg-0 mt-2">
          <Controller
            control={control}
            name="smop"
            render={({ field: { onChange, value } }) => (
              <MDBSwitch label="SMOP" onChange={onChange} />
            )}
          />
        </div>
        {hidePrint === false ? (
          <div className="mt-lg-0 mt-2">
            <Controller
              control={control}
              name="print"
              render={({ field: { onChange, value } }) => (
                <MDBSwitch label="Print" onChange={onChange} />
              )}
            />
          </div>
        ) : (
          ""
        )}
        <div>
          <CustomButton
            type="solid"
            size="sm"
            className="px-4 mt-lg-0 mt-3"
            title="Scan"
          />
        </div>
      </div>
    </>
  );
}
