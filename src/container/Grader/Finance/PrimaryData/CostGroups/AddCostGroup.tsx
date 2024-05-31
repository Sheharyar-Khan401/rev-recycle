import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { costgroupResolver } from "validators/graderValidator/Finance/primarydataResolver";
import CostGroupForm from "components/Finance/CostGroupForm/CostGroupForm";
import { useAddCostGroupMutation } from "redux/features/finance/primarydata/costgroupApiSlice";
import { CostGroupRequest } from "redux/types/Finance/PrimaryData/costgroup";
const defaultValues: CostGroupRequest = {
  costGroupId: 0,
  costgrouptypeId: 0,
  name: "",
  parentCostgroupId: 0,
};

export default function AddCostGroup() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CostGroupRequest, null>({
    defaultValues,
    resolver: costgroupResolver,
  });
  const [addCodtGroup, { isLoading: AddLoading }] = useAddCostGroupMutation();

  const onSubmit = async (values: CostGroupRequest) => {
    const result = await addCodtGroup(values);
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  return (
    <>
      <ActionBarAddEdit
        title="Cost Groups"
        mode={"ADD"}
        isLoading={AddLoading}
        onSubmit={handleSubmit(onSubmit)}
      />
      <CostGroupForm
        mode={"ADD"}
        isEdit
        control={control}
        errors={errors}
        setValue={setValue}
      />
    </>
  );
}
