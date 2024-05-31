import { useState } from "react";
import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useNavigate } from "react-router-dom";
import { dailyProductionResolver } from "validators/graderValidator/Productions/dailyProductionResolver";
import DailyProductionForm from "components/Production/dailyProductionForm";
import { useAddDailyProductionMutation } from "redux/features/productions/dailyProductionApiSlice";
import { dailyProductionRequest } from "redux/types/Productions/dailyProduction";

const defaultValues: dailyProductionRequest = {
  date: new Date().toISOString().split("T")[0],
  cartonId: 0,
  stationId: 0,
  floorId: 0,
};
export default function AddMotilityIssuance() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<dailyProductionRequest, null>({
    defaultValues,
    resolver: dailyProductionResolver,
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [addDailyProduction, { isLoading }] = useAddDailyProductionMutation();
  const onSubmit = async (values: dailyProductionRequest) => {
    const res = await addDailyProduction(values);
    if ("data" in res && res.data.status === "SUCCESS") {
      navigate(-1);
    }
  };
  return (
    <>
      <ActionBarAddEdit
        title="Daily Productions"
        mode={"ADD"}
        isLoading={isLoading}
        onSubmit={handleSubmit(onSubmit)}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <DailyProductionForm
        mode={"Add"}
        isEdit
        watch={watch}
        setValue={setValue}
        control={control}
        errors={errors}
      />
    </>
  );
}
