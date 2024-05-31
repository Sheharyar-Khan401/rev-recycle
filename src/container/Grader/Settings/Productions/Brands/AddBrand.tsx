import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BrandForm from "components/Settings/Productions/BrandForm";
import { useAddBrandMutation } from "redux/features/Settings/Productions/brandApiSlice";
import { BrandRequest } from "redux/types/Settings/Productions/brand";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { BrandsResolver } from "validators/graderValidator/Settings/brandsResolver";
const defaultValues: BrandRequest = {
  brandId: 0,
  name: "",
  code: "",
  logoUrl: "",
  weightInKgs: 0,
  printableName: "",
  weightLimit: 0,
  weightOnPrint: false,
  weightUnitId: 0,
  logo: null,
};
export default function AddBrand() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BrandRequest, null>({ defaultValues, resolver: BrandsResolver });
  const [addBrand, { isLoading: AddLoading }] = useAddBrandMutation();

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
      })
    );
    formData.append("logo", values?.logo ? values?.logo  : "");
    const result = await addBrand(formData);
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
          mode={"ADD"}
          isLoading={AddLoading}
          onSubmit={handleSubmit(onSubmit)}
        />

        <div>
          <BrandForm
            mode={"ADD"}
            isEdit
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        </div>
      </div>
    </>
  );
}
