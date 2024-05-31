import { useState } from "react";
import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useNavigate } from "react-router-dom";
import { transferSaleOrderUnitRequest } from "redux/types/Productions/transferSaleOrderUnit";
import TransferSaleOrderUnitForm from "components/Production/transferSaleOrderUnitForm";
import { transferSaleOrderUnitResolver } from "validators/graderValidator/Productions/transferSaleOrderUnitResolver";
import { useAddTransferSaleOrderUnitMutation } from "redux/features/productions/transferSaleOrderUnitApiSlice";
import { format } from "date-fns";
const defaultValues: transferSaleOrderUnitRequest = {
  transferDate: format(new Date(), "yyyy-MM-dd"),
  description: "",
};
export default function AddTransferSaleOrderUnit() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<transferSaleOrderUnitRequest, null>({
    defaultValues,
    resolver: transferSaleOrderUnitResolver,
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [addTransferSaleOrderUnit, { isLoading }] =
    useAddTransferSaleOrderUnitMutation();
  const onSubmit = async (values: transferSaleOrderUnitRequest) => {
    const res = await addTransferSaleOrderUnit(values);

    if ("data" in res && res.data.status === "SUCCESS") {
      navigate(-1);
    }
  };

  return (
    <>
      <ActionBarAddEdit
        title="Transfer Sale Order Units"
        mode={"ADD"}
        isLoading={isLoading}
        onSubmit={handleSubmit(onSubmit)}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <TransferSaleOrderUnitForm
        mode={"Add"}
        isEdit
        control={control}
        errors={errors}
      />
    </>
  );
}
