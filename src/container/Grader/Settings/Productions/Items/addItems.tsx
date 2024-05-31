import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useForm } from "react-hook-form";
import { ProductionItemsRequest } from "redux/types/Settings/Productions/items";
import { itemsResolver } from "validators/graderValidator/Settings/Production/ItemsResolver";
import ItemForm from "components/Settings/Productions/ItemForm";
import { useAddProductionItemMutation } from "redux/features/Settings/Productions/productionItemApiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const defaultValues: ProductionItemsRequest = {
  itemId: 0,
  name: "",
  labelTypeId: 0,
  categoryId: 0,
  itemCode: "",
  gradeId: 0,
  active: false,
  groupId: 0,
  expProQty: 0,
  quantityUnitId: 0,
  weightUnitId: 0,
  unitPieces: 1,
  unitRate: 0,
  rateOnId: 2,
  unitOfMeasurementId: 0,
  unitWeight: 0,
  weightKgs: 0,
  weightLbs: 0,
  amount: 0,
  expProKgs: 0,
};
export default function AddItems() {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductionItemsRequest, null>({
    defaultValues,
    resolver: itemsResolver,
  });
  const navigate = useNavigate();
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [addProductionItem, { isLoading: AddLoading }] =
    useAddProductionItemMutation();
  const onSubmit = async (values: ProductionItemsRequest) => {
    const result = await addProductionItem({ values, brands: selectedBrands });
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
          title="Production Item"
          mode={"ADD"}
          isLoading={AddLoading}
          onSubmit={handleSubmit(onSubmit)}
        />

        <div>
          <ItemForm
            mode={"ADD"}
            isEdit
            control={control}
            errors={errors}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            watch={watch}
            setValue={setValue}
          />
        </div>
      </div>
    </>
  );
}
