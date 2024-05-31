import { MDBInput, MDBRadio, MDBSelect } from "mdb-react-ui-kit";
import { Control, Controller, FieldErrors } from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import { Department } from "redux/types/Settings/Productions/department";
import { useGetAllDepartmentQuery } from "redux/features/Settings/Department/departmentApiSlice";
import { useEffect, useState } from "react";

interface Props {
  isEdit: boolean;
  mode: string;
  errors: FieldErrors<Department>;
  control: Control<Department, null>;
}
export default function DepartmentsForm({
  mode,
  isEdit,
  control,
  errors,
}: Props) {
  const { data: deptsData } = useGetAllDepartmentQuery(null);
  const [deptsList, setDeptsList] = useState<Department[]>([]);
  useEffect(() => {
    if (deptsData) {
      setDeptsList(deptsData);
    }
  }, [deptsData]);
  const deptsDataList = (id: number |string) => {
    return deptsList?.map((item: Department) => {
      return {
        text: item?.name ? item?.name: "",
        value: item?.departmentId ? item?.departmentId: 0,
        defaultSelected: item?.departmentId === id,
      };
    });
  };
  return (
    <div className="m-3">
      <div>
        <div className="col-lg-4 col-md-6 col-11 my-3 mx-3">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.name && "is-invalid"}`}
                label="Department Name"
                type="text"
                disabled
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.name?.message} />
        </div>
        <div className="col-lg-4 col-md-6 col-11 my-3 mx-3">
          <Controller
            control={control}
            name="displayOrder"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.displayOrder && "is-invalid"}`}
                label="Display Order"
                type="number"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.displayOrder?.message} />
        </div>
        <div className="col-lg-4 col-md-6 col-11 my-3 mx-3">
        <Controller
              control={control}
              name="rateDepartmentId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Rate Department"
                  data={deptsDataList(value ? value: 0)}
                  onValueChange={(data) => {
                   if("value" in data)
                    onChange(data.value);
                  }}
                  preventFirstSelection
                  disabled={!isEdit}
                />
              )}
            />
        </div>
        <div className="col-lg-4 col-md-6 col-11 mx-3 my-3">
          <span className="me-5 fw500">Has Belt</span>
          <Controller
            control={control}
            name="hasBelt"
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
        <h4 className="mt-3 mb-0 ms-3 black fw500">Scan</h4>
        <p className="black ms-3">
          Scan barcodes from inward gatepass and daily production
        </p>
        <div className="d-flex justify-content-between align-items-center col-lg-3 col-md-6 col-11 mx-3 my-3">
          <div className="d-flex flex-column">
            <span className="me-5 fw500">Purchase</span>
            <span className="me-5 fw500">Production</span>
          </div>
          <div className="d-flex flex-column">
            <div>
              <Controller
                control={control}
                name="scanCodePurchase"
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
            <div>
              <Controller
                control={control}
                name="scanCodeProduction"
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
        </div>
        <h4 className="mt-3 mb-0 ms-3 black fw500">Apply FOH</h4>
        <p className="black ms-3">
          Apply FOH on inward gatepass and daily production
        </p>
        <div className="d-flex justify-content-between align-items-center col-lg-3 col-md-6 col-11 mx-3 my-3">
          <div className="d-flex flex-column">
            <span className="me-5 fw500">Purchase</span>
            <span className="me-5 fw500">Production</span>
          </div>
          <div className="d-flex flex-column">
            <div>
              <Controller
                control={control}
                name="applyFOHPurchase"
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
            <div>
              <Controller
                control={control}
                name="applyFOHProduction"
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
        </div>
      </div>
    </div>
  );
}
