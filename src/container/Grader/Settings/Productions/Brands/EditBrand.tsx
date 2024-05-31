import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BrandForm from "components/Settings/Productions/BrandForm";
import {
  useEditBrandMutation,
  useLazyGetByIdBrandQuery,
} from "redux/features/Settings/Productions/brandApiSlice";
import { BrandRequest } from "redux/types/Settings/Productions/brand";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import Loader from "shared/Components/Loader/Loader";
import { BrandsResolver } from "validators/graderValidator/Settings/brandsResolver";
const defaultValues: BrandRequest = {
  brandId: 0,
  name: "",
  code: "",
  logoUrl: "",
  logo: null,
  weightInKgs: 0,
  printableName: "",
  weightLimit: 0,
  weightOnPrint: false,
  weightUnitId: 0,
};
export default function EditBrand() {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BrandRequest, null>({ defaultValues, resolver: BrandsResolver });
  const params = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editBrand, { isLoading: AddLoading }] = useEditBrandMutation();
  const [getBrandById, result] = useLazyGetByIdBrandQuery();
  useEffect(() => {
    const id = params.id;
    if (id) {
      getBrandById(id);
    }
  }, [getBrandById, params.id]);
  useEffect(() => {
    if (result.data) {
      const data = result?.data;
      setValue("name", data?.name ? data?.name : "-");
      setValue("brandId", data?.brandId ? data?.brandId : 0);
      setValue("code", data?.code ? data?.code : "-");
      setValue("weightInKgs", data?.weightInKgs ? data?.weightInKgs : 0);
      setValue(
        "printableName",
        data?.printableName ? data?.printableName : "-"
      );
      setValue("weightLimit", data?.weightLimit ? data?.weightLimit : 0);
      setValue(
        "weightOnPrint",
        data?.weightOnPrint ? data?.weightOnPrint : false
      );
      setValue(
        "weightUnitId",
        data?.weightUnit ? data?.weightUnit?.weightUnitId : 0
      );
      // setValue("logo", data?.logoUrl ? data?.logoUrl : "");
    }
  }, [result, setValue]);

  const onSubmit = async (values: BrandRequest) => {
    let formData = new FormData();
    formData.append(
      "brand",
      JSON.stringify({
        name: values?.name,
        code: values?.code,
        weightInKgs: values?.weightInKgs,
        printableName: values?.printableName,
        weightLimit: values?.weightLimit,
        weightOnPrint: values?.weightOnPrint,
        weightUnitId: values?.weightUnitId,
        brandId: values?.brandId,
      })
    );
    formData.append("logo", values?.logo ? values?.logo : "");
    const result = await editBrand(formData);
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };
  return (
    <>
      <div className="mt-3">
        <ActionBarAddEdit
          title="Brands"
          mode={"EDIT"}
          isLoading={AddLoading}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={handleSubmit(onSubmit)}
        />

        <div>
          {result.isLoading ? (
            <div style={{ marginTop: "25vh" }}>
              <Loader />{" "}
            </div>
          ) : (
            <BrandForm
              mode={"EDIT"}
              isEdit={isEdit}
              control={control}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
          )}
        </div>
      </div>
    </>
  );
}
