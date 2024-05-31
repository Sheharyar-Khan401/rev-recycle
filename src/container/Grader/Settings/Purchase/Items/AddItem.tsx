import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ItemRequest } from "redux/types/Settings/Purchase/item";
import { itemResolver } from "validators/graderValidator/Settings/Finance/itemResolver";
import { useAddItemMutation } from "redux/features/Settings/purchase/itemApiSlice";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import ItemForm from "components/Settings/Purchase/ItemForm";

const defaultValues: ItemRequest = {
  itemId: 0,
  name: "",
  active: false,
  categoryId: 0,
  gradeId: 0,
};
export default function AddItem() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ItemRequest, null>({ defaultValues, resolver: itemResolver });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [addItem, { isLoading }] = useAddItemMutation();

  const onSubmit = async (values: ItemRequest) => {
    const res = await addItem(values);
    if ("data" in res && res.data.status === "SUCCESS") {
      navigate(-1);
    }
  };
  return (
    <>
      <div style={{ marginTop: "mt-3" }}>
        <ActionBarAddEdit
          title="Items"
          mode={"ADD"}
          isLoading={isLoading}
          onSubmit={handleSubmit(onSubmit, (e) => {})}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />

        <ItemForm isEdit control={control} errors={errors} />
      </div>
    </>
  );
}
