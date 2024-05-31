import { useEffect, useState } from "react";
import {
  MDBInput,
  MDBSelect,
  MDBCheckbox,
  MDBDatepicker,
} from "mdb-react-ui-kit";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import profile from "assets/avatar.png";
import PhoneInput from "react-phone-input-2";
import { UploadIcon } from "helper/icons";
import { Role } from "redux/types/Settings/role";
import { UserRequest } from "redux/types/Settings/user";
import MDBPassword from "shared/Components/MDBPassword/MDBPassword";
import { useGetAllDepartmentQuery } from "redux/features/Settings/Department/departmentApiSlice";
import { Department } from "redux/types/Settings/Productions/department";
import { useGetFloorsQuery } from "redux/features/Settings/Productions/floorApiSlice";
import { Floors } from "redux/types/common/floor";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
interface Props {
  mode: string;
  isEdit: boolean;
  control: Control<UserRequest>;
  errors: Partial<FieldErrorsImpl<UserRequest>>;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  setValue: UseFormSetValue<UserRequest>;
  roles: number[];
  setRoles: React.Dispatch<React.SetStateAction<number[]>>;
  watch: UseFormWatch<UserRequest>;
  rolesList: Role[];
  rolesError: string;
  setRolesError: (value: string) => void;
  selectedDepts: number[];
  setSelectedDepts: React.Dispatch<React.SetStateAction<number[]>>;
  selectedFloors: number[];
  setSelectedFloors: React.Dispatch<React.SetStateAction<number[]>>;
  selectedInvoiceTypes: number[];
  setSelectedInvoiceTypes: React.Dispatch<React.SetStateAction<number[]>>;
}
export default function UserForm({
  mode,
  isEdit,
  control,
  errors,
  selectedStatus,
  setValue,
  roles,
  setRoles,
  rolesList,
  rolesError,
  watch,
  setRolesError,
  selectedDepts,
  setSelectedDepts,
  selectedFloors,
  setSelectedFloors,
  selectedInvoiceTypes,
  setSelectedInvoiceTypes,
}: Props) {
  const { data: deptData } = useGetAllDepartmentQuery(null);
  const { data: floorsData } = useGetFloorsQuery(null);
  const { data: invoiceTypesData } = useGetInvoiceTypesQuery(null);
  const [deptsList, setDeptsList] = useState<Department[]>([]);
  const [floorsList, setFloorsList] = useState<Floors[]>([]);
  const [invoiceTypeList, setInvoiceTypesList] = useState<InvoiceType[]>([]);
  const [selectedFile, setSelectedFile] = useState<Blob>();
  const [preview, setPreview] = useState<string>("");
  useEffect(() => {
    if (deptData) {
      setDeptsList(deptData);
    }
  }, [deptData]);
  useEffect(() => {
    if (floorsData) setFloorsList(floorsData);
  }, [floorsData]);
  useEffect(() => {
    if (invoiceTypesData) {
      setInvoiceTypesList(invoiceTypesData);
    }
  }, [invoiceTypesData]);
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setValue("image", e.target.files[0]);
  };

  const statusDataList = (id: boolean | string) => {
    return [
      { statusId: 1, name: "Active" },
      { statusId: 0, name: "Inactive" },
    ]?.map((status) => {
      return {
        text: status.name,
        value: status.name,
        defaultSelected: status.name === id,
      };
    });
  };

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center pb-3">
        {selectedFile === undefined ? (
          <img
            src={watch("image") ? watch("image") : profile}
            style={{
              verticalAlign: "middle",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
            alt="profile img"
            className=" me-3"
          />
        ) : (
          <img
            src={preview}
            alt=""
            style={{
              verticalAlign: "middle",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
            className=" me-3"
          />
        )}
        <div>
          <label
            htmlFor="files"
            role="button"
            className={"p-0 d-flex align-items-center text-muted"}
          >
            <UploadIcon /> <u className="mb-md-0 mb-2">Upload&nbsp;Image</u>
          </label>
          <small>Recommended dimensions: 200x200, maximum file size: 5MB</small>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        id="files"
        onChange={onSelectFile}
        className="d-none"
      />
      <div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12 my-2">
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  className={`${errors.fullName && "is-invalid"}`}
                  label="Full Name"
                  type="text"
                  disabled={!isEdit}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <FormValidationError errorMessage={errors.fullName?.message} />
          </div>
          <div className="col-lg-4 col-md-6 col-12 my-2">
            <Controller
              control={control}
              name="userName"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  className={`${errors.userName && "is-invalid"}`}
                  label="User Name"
                  type="text"
                  disabled={!isEdit}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <FormValidationError errorMessage={errors.userName?.message} />
          </div>
        </div>
        {mode === "ADD" && (
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <MDBPassword
                    className={`${errors.password && "is-invalid"}`}
                    label="Password"
                    size="md"
                    disabled={!isEdit}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.password?.message} />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="confirmPwd"
                render={({ field: { onChange, value } }) => (
                  <MDBPassword
                    className={`${errors.confirmPwd && "is-invalid"}`}
                    label="Confirm Password"
                    size="md"
                    disabled={!isEdit}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.confirmPwd?.message} />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12 my-2">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  className={`${errors.email && "is-invalid"}`}
                  label="Email Address"
                  type="text"
                  disabled={mode === "EDIT"}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <FormValidationError errorMessage={errors.email?.message} />
          </div>
          <div className="col-lg-4 col-md-6 col-12 my-2">
            <Controller
              control={control}
              name="phoneNo"
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  inputStyle={{ width: "100%", height: "36.15px" }}
                  country={"us"}
                  specialLabel={""}
                  enableAreaCodes={true}
                  disabled={!isEdit}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <FormValidationError errorMessage={errors.phoneNo?.message} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12 my-2">
            <Controller
              control={control}
              name="expiryDate"
              render={({ field: { onChange, value } }) => (
                <MDBDatepicker
                  label="Expires On"
                  format="yyyy-mm-dd"
                  disablePast
                  className={errors.expiryDate && "is-invalid"}
                  value={value}
                  onChange={onChange}
                  inline
                  disabled={!isEdit}
                />
              )}
            />
            <FormValidationError errorMessage={errors.expiryDate?.message} />
          </div>
          <div className="col-lg-4 col-md-6 col-12 my-2">
            <Controller
              control={control}
              name="userStatus"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  key={selectedStatus}
                  label="Status"
                  inputClassName={errors.userStatus && "is-invalid"}
                  data={statusDataList(value)}
                  onValueChange={(data) => {
                    if ("text" in data) {
                      onChange(data.text);
                    }
                  }}
                  search
                  preventFirstSelection
                  disabled={!isEdit}
                />
              )}
            />
            <FormValidationError errorMessage={errors.userStatus?.message} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12 my-2">
            <MDBSelect
              multiple
              search
              disabled={!isEdit}
              name="selectedDepts"
              label="Departments"
              selectAll={false}
              displayedLabels={1}
              optionsSelectedLabel={"Departments selected"}
              data={deptsList?.map((data: Department) => {
                return {
                  text: data?.name ? data?.name : "",
                  value: data?.departmentId ? data?.departmentId : 0,
                  defaultSelected: !!selectedDepts?.find(
                    (id) => id === data.departmentId
                  ),
                };
              })}
              onValueChange={(data) => {
                if ("map" in data) {
                  setSelectedDepts(
                    data?.map((item: SelectData) => {
                      return item?.value ? +item?.value : 0;
                    })
                  );
                }
              }}
            />
          </div>
          <div className="col-lg-4 col-md-6 col-12 my-2">
            <MDBSelect
              multiple
              search
              disabled={!isEdit}
              label="Floors"
              name="selectedFloors"
              selectAll={false}
              displayedLabels={1}
              optionsSelectedLabel={"Floors selected"}
              data={floorsList?.map((data: Floors) => {
                return {
                  text: data?.name ? data?.name : "",
                  value: data?.floorId ? data?.floorId : 0,
                  defaultSelected: !!selectedFloors?.find(
                    (id) => id === data.floorId
                  ),
                };
              })}
              onValueChange={(data) => {
                if ("map" in data) {
                  setSelectedFloors(
                    data?.map((item: SelectData) => {
                      return item?.value ? +item?.value : 0;
                    })
                  );
                }
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12 my-2">
            <MDBSelect
              multiple
              search
              name="selectedInvoiceTypes"
              selectAll={false}
              label="Invoice Types"
              disabled={!isEdit}
              displayedLabels={1}
              optionsSelectedLabel={"Invoice Types selected"}
              data={invoiceTypeList?.map((data: InvoiceType) => {
                return {
                  text: data?.name ? data?.name : "",
                  value: data?.invoiceTypeId ? data?.invoiceTypeId : 0,
                  defaultSelected: !!selectedInvoiceTypes?.find(
                    (id) => id === data.invoiceTypeId
                  ),
                };
              })}
              onValueChange={(data) => {
                if ("map" in data) {
                  setSelectedInvoiceTypes(
                    data?.map((item: SelectData) => {
                      return item?.value ? +item?.value : 0;
                    })
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
      <h6 className={"  mb-0 blueColor mt-3"}>Roles</h6>
      <hr className="my-2" />
      <div className="d-flex flex-md-row flex-column mx-0 col-11 mt-4">
        {rolesList?.map((item: Role, index) => {
          return (
            <div style={{ width: "20%" }} className=" px-0" key={index}>
              <MDBCheckbox
                key={item?.roleId}
                label={item?.roleName}
                className={rolesError && "is-invalid"}
                name="roles"
                inline
                disabled={!isEdit}
                checked={
                  roles?.find((a: Role | number) => a === item?.roleId)
                    ? true
                    : false
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setRoles([...roles, item?.roleId]);
                    setRolesError?.("");
                  } else {
                    setRoles(
                      roles.filter((val: Role | number) => val !== item?.roleId)
                    );
                  }
                }}
              />
            </div>
          );
        })}
      </div>
      <FormValidationError errorMessage={rolesError} />
    </div>
  );
}
