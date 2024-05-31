import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useEffect, useState } from "react";
import { itemsResolver } from "validators/graderValidator/Settings/Production/ItemsResolver";
import { ProductionItemsRequest } from "redux/types/Settings/Productions/items";
import ItemForm from "components/Settings/Productions/ItemForm";
import { useNavigate, useParams } from "react-router-dom";
import {
  useLazyGetProductionItemsByIdQuery,
  useUpdateProductionItemMutation,
} from "redux/features/Settings/Productions/productionItemApiSlice";
import Loader from "shared/Components/Loader/Loader";
import { roundValue, convertWghtToLbs } from "helper/utility";
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
  unitPieces: 0,
  unitRate: 0,
  rateOnId: 0,
  unitOfMeasurementId: 0,
  unitWeight: 0,
  weightKgs: 0,
  weightLbs: 0,
  amount: 0,
  expProKgs: 0,
};
export default function EditItems() {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductionItemsRequest, null>({
    defaultValues,
    resolver: itemsResolver,
  });
  const navigate = useNavigate();
  const params = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [triggerGetProductionById, resultGetProductionById] =
    useLazyGetProductionItemsByIdQuery();
  const [updateProductionItem, { isLoading: updateItemsLoading }] =
    useUpdateProductionItemMutation();

  useEffect(() => {
    const id = params.id;
    if (id) {
      triggerGetProductionById(+id);
    }
  }, [triggerGetProductionById, params.id]);

  useEffect(() => {
    if (resultGetProductionById.data) {
      setValue("itemId", resultGetProductionById?.data?.itemId ? resultGetProductionById?.data?.itemId : 0);
      setValue("name", resultGetProductionById.data?.name ? resultGetProductionById.data?.name : "");
      setValue(
        "labelTypeId",
        resultGetProductionById.data?.labelType?.labelTypeId ? resultGetProductionById.data?.labelType?.labelTypeId : 0
      );
      setValue(
        "categoryId",
        resultGetProductionById.data?.category ? resultGetProductionById.data?.category?.categoryId : 0
      );
      setValue("itemCode", resultGetProductionById?.data?.itemCode ? resultGetProductionById?.data?.itemCode : "");
      setValue("gradeId", resultGetProductionById?.data?.grade ? resultGetProductionById?.data?.grade?.gradeId : 0);
      setValue("active", resultGetProductionById?.data?.active ? resultGetProductionById?.data?.active : false);
      setValue("expProQty", resultGetProductionById?.data?.expProQty ? resultGetProductionById?.data?.expProQty : 0);
      setValue("groupId", resultGetProductionById.data?.group ? resultGetProductionById.data?.group?.groupId : 0);
      setValue(
        "weightUnitId",
        resultGetProductionById.data?.weightUnit ? resultGetProductionById.data?.weightUnit?.weightUnitId : 0
      );
      setValue(
        "quantityUnitId",
        resultGetProductionById.data?.quantityUnit ? resultGetProductionById.data?.quantityUnit?.quantityUnitId : 0
      );
      setValue("unitPieces", resultGetProductionById?.data?.unitPieces ? resultGetProductionById?.data?.unitPieces:  1);
      setValue("unitRate", resultGetProductionById?.data?.unitRate ? resultGetProductionById?.data?.unitRate : 0);
      setValue(
        "rateOnId",
        resultGetProductionById?.data?.rateOn ? resultGetProductionById?.data?.rateOn?.rateOnId : 0
      );
      setValue(
        "unitOfMeasurementId",
        resultGetProductionById?.data?.uom ? resultGetProductionById?.data?.uom?.unitId : 0
      );
      setValue("weightKgs", resultGetProductionById?.data?.weightKgs ? resultGetProductionById?.data?.weightKgs : 0);
      setValue("weightLbs", resultGetProductionById?.data?.weightKgs ? roundValue(convertWghtToLbs(+resultGetProductionById?.data?.weightKgs)) : 0);
      setValue("amount", resultGetProductionById?.data?.amount ? resultGetProductionById?.data?.amount : 0);
      setValue("unitWeight", resultGetProductionById?.data?.unitWeight ? resultGetProductionById?.data?.unitWeight : 0);
      setValue("expProKgs", resultGetProductionById?.data?.expProKgs ? resultGetProductionById?.data?.expProKgs : 0);
    }
  }, [resultGetProductionById.data, setValue]);
  const onSubmit = async (values: ProductionItemsRequest) => {
    const result = await updateProductionItem(values);
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
          title="Production Items"
          mode={"EDIT"}
          onSubmit={handleSubmit(onSubmit)}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isLoading={updateItemsLoading}
        />

        {resultGetProductionById?.isLoading ? (
          <div style={{ margin: "5rem" }}>
            <Loader />
          </div>
        ) : (
          <ItemForm
            mode={"EDIT"}
            isEdit={isEdit}
            control={control}
            errors={errors}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            watch={watch}
            setValue={setValue}
          />
        )}
      </div>
    </>
  );
}
