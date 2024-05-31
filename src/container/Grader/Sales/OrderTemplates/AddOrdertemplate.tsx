import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import {
  OrderTemplateItemsData,
  OrderTemplateRequest,
} from "redux/types/Sales/ordertemplate";
import OrderTemplateForm from "components/Sales/OrderTemplateForm/OrderTemplateForm";
import { useAddordertemplateMutation } from "redux/features/sales/ordertemplateApiSlice";
import { useState } from "react";
import { orderTemplateResolver } from "validators/graderValidator/Sales/orderTemplateResolver";
const defaultValues: OrderTemplateRequest = {
  name: "",
  brandId: 0,
  clientId: 0,
};
export default function AddOrderTemplate() {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderTemplateRequest, null>({
    defaultValues,
    resolver: orderTemplateResolver,
  });
  const navigate = useNavigate();
  const [addordertemplate, { isLoading: AddLoading }] =
    useAddordertemplateMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [rowData, setRowData] = useState<OrderTemplateItemsData[]>([]);
  const onSubmit = async (values: OrderTemplateRequest) => {
    const result = await addordertemplate(values);
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
          title="Order Templates"
          mode={"ADD"}
          isLoading={AddLoading}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={handleSubmit(onSubmit)}
        />

        <div>
          <OrderTemplateForm
            mode={"ADD"}
            isEdit
            watch={watch}
            setValue={setValue}
            control={control}
            errors={errors}
            rowData={rowData}
            setRowData={setRowData}
          />
        </div>
      </div>
    </>
  );
}
