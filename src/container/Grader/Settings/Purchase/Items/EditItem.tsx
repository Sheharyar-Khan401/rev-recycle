import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ItemRequest } from "redux/types/Settings/Purchase/item";
import { itemResolver } from "validators/graderValidator/Settings/Finance/itemResolver";
import {
  useLazyGetItemQuery,
  useUpdateItemMutation,
} from "redux/features/Settings/purchase/itemApiSlice";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import ItemForm from "components/Settings/Purchase/ItemForm";
import Loader from "shared/Components/Loader/Loader";

const defaultValues: ItemRequest = {
  itemId: 0,
  name: "",
  active: false,
  categoryId: 0,
  gradeId: 0,
};
export default function EditItem() {
  const navigate = useNavigate();
  const params = useParams();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ItemRequest, null>({ defaultValues, resolver: itemResolver });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [getItem, item] = useLazyGetItemQuery();
  const [updateItem, { isLoading: updateItemLoading }] =
    useUpdateItemMutation();
  useEffect(() => {
    if (params.id) getItem(+params.id);
  }, [getItem, params.id]);

  useEffect(() => {
    if (item?.data)
      reset({
        itemId: item.data?.itemId,
        name: item?.data?.name,
        active: item?.data?.active,
        gradeId: item?.data?.grade?.gradeId,
        categoryId: item?.data?.category?.categoryId,
      });
  }, [item.data, reset]);
  const onSubmit = async (values: ItemRequest) => {
    const res = await updateItem(values);
    if ("data" in res && res.data.status === "SUCCESS") {
      navigate(-1);
    }
  };
  return (
    <>
      <div style={{ marginTop: "mt-3" }}>
        <ActionBarAddEdit
          title="Codes"
          mode={"EDIT"}
          isLoading={updateItemLoading}
          onSubmit={handleSubmit(onSubmit, (e) => {})}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />

        {item?.isLoading ? (
          <div style={{ margin: "5rem" }}>
            <Loader />
          </div>
        ) : (
          <ItemForm isEdit={isEdit} control={control} errors={errors} />
        )}
      </div>
    </>
  );
}
