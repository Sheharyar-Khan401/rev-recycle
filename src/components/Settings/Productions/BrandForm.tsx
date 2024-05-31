import { MDBInput, MDBSelect, MDBSwitch } from "mdb-react-ui-kit";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { BrandRequest } from "redux/types/Settings/Productions/brand";
import profile from "assets/dummy.jpg";
import FormValidationError from "shared/Components/FormValidationError";
import { useGetWeightUnitsQuery } from "redux/features/common/weightUintApiSlice";
import { useEffect, useState } from "react";
import { WeightUnit } from "redux/types/common/weightUnit";
import { UploadIcon } from "helper/icons";
interface Props {
  isEdit: boolean;
  control: Control<BrandRequest>;
  errors: Partial<FieldErrorsImpl<BrandRequest>>;
  mode: string;
  setValue: UseFormSetValue<BrandRequest>;
  watch: UseFormWatch<BrandRequest>;
}
export default function BrandForm({
  mode,
  isEdit,
  control,
  errors,
  setValue,
  watch,
}: Props) {
  const { data: weightUnitData } = useGetWeightUnitsQuery(null);
  const [weUnDataList, setWUDataList] = useState<WeightUnit[]>([]);
  const [selectedFile, setSelectedFile] = useState<Blob>();
  const [preview, setPreview] = useState<string>("");
  useEffect(() => {
    if (weightUnitData) {
      setWUDataList(weightUnitData);
    }
  }, [weightUnitData]);
  const wUData = (id: number | string) => {
    return weUnDataList.map((item: WeightUnit) => {
      return {
        text: item?.name ? item?.name : "",
        value: item?.weightUnitId ? item?.weightUnitId : 0,
        defaultSelected: item?.weightUnitId === id,
      };
    });
  };
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
    setValue("logo", e.target.files[0]);
  };
  return (
    <div className="m-2">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-11 my-2 mx-3">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.name && "is-invalid"}`}
                label="Brand Name"
                type="text"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.name?.message} />
        </div>
        <div className="col-lg-4 col-md-6 col-11 my-2 mx-3">
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.code && "is-invalid"}`}
                label="Brand Code"
                type="text"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.code?.message} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-11 my-2 mx-3">
          <Controller
            control={control}
            name="weightInKgs"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.weightInKgs && "is-invalid"}`}
                label="Weight in KGS"
                type="number"
                min={0}
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.weightInKgs?.message} />
        </div>
        <div className="col-lg-4 col-md-6 col-11 my-2 mx-3">
          <Controller
            control={control}
            name="printableName"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                label="Printable Name"
                type="text"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-11 my-2 mx-3">
          <Controller
            control={control}
            name="weightLimit"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.weightLimit && "is-invalid"}`}
                label="Weight Limit"
                type="number"
                min={0}
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.weightLimit?.message} />
        </div>
        <div className="col-lg-4 col-md-6 col-11 my-2 mx-3">
          <Controller
            control={control}
            name="weightUnitId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                label="Printable Weight Unit"
                inputClassName={errors.weightUnitId && "is-invalid"}
                data={wUData(value ? value : 0)}
                onValueChange={(data) => {
                  if ("value" in data) {
                    onChange(data.value);
                  }
                }}
                search
                disabled={!isEdit}
                preventFirstSelection
              />
            )}
          />
          <FormValidationError errorMessage={errors.weightUnitId?.message} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-11 my-2 mx-3">
          <Controller
            control={control}
            name="weightOnPrint"
            render={({ field: { value, onChange } }) => (
              <MDBSwitch
                label="Show Weight on Print"
                checked={value}
                disabled={!isEdit}
                onChange={onChange}
              />
            )}
          />
        </div>
      </div>
      <div className="row mx-0">
        <div className="d-flex align-items-center py-3">
          {selectedFile === undefined ? (
            <img
              src={watch("logo") ? watch("logo") : profile}
              style={{
                verticalAlign: "middle",
                width: "60px",
                height: "60px",
                borderRadius: "25%",
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
                borderRadius: "25%",
              }}
              className=" me-3"
            />
          )}
          <label
            htmlFor="files"
            className={!isEdit ? "disabled btn" : "btn"}
            style={{
              backgroundColor: "white",
              // border: "1px solid rgba(63, 81, 181, 0.5)",
              color: "#003ECB",
              fontSize: "1rem",
              boxShadow: "none",
              padding: "0.3rem",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
            }}
          >
            <UploadIcon /> Upload&nbsp;Logo
          </label>
          <input
            type="file"
            accept="image/*"
            id="files"
            onChange={onSelectFile}
            style={{ color: "white", visibility: "hidden" }}
          />
        </div>
      </div>
    </div>
  );
}
