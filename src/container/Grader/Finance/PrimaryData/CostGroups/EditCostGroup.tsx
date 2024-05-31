import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { costgroupResolver } from "validators/graderValidator/Finance/primarydataResolver";
import { useState, useEffect } from "react";
import { CostGroupRequest } from "redux/types/Finance/PrimaryData/costgroup";
import { useNavigate, useParams } from "react-router-dom";
import CostGroupForm from "components/Finance/CostGroupForm/CostGroupForm";
import {
  useLazyGetByIdCostGroupQuery,
  useEditCostGroupMutation,
} from "redux/features/finance/primarydata/costgroupApiSlice";
const defaultValues: CostGroupRequest = {
  costGroupId: 0,
  costgrouptypeId: 0,
  name: "",
  parentCostgroupId: 0,
};
export default function EditCostGroup() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CostGroupRequest, null>({
    defaultValues,
    resolver: costgroupResolver,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editCostGroup, { isLoading: AddLoading }] = useEditCostGroupMutation();
  const [getCostGroupById, result] = useLazyGetByIdCostGroupQuery();
  const onSubmit = async (values: CostGroupRequest) => {
    const result = await editCostGroup(values);
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const id = params.id;

    if (id) {
      getCostGroupById(id);
    }
  }, [params.id, getCostGroupById]);
  useEffect(() => {
    if (result?.data) {
      setValue(
        "costGroupId",
        result?.data?.costGroupId ? result?.data?.costGroupId : 0
      );
      setValue("name", result?.data?.name ? result?.data?.name : "");
      setValue(
        "costgrouptypeId",
        result?.data?.costgrouptypeId ? result?.data?.costgrouptypeId : 0
      );
      setValue(
        "parentCostgroupId",
        result?.data?.parentCostgroupId ? result?.data?.parentCostgroupId : 0
      );
    }
  }, [result, setValue]);
  return (
    <>
      <ActionBarAddEdit
        title="Cost Groups"
        mode={"EDIT"}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={AddLoading}
      />
      <CostGroupForm
        mode={"EDIT"}
        isEdit={isEdit}
        control={control}
        errors={errors}
        parentCostgroupId={params.id ? +params?.id : 0}
      />
    </>
  );
}
