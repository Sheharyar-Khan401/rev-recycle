import { useState } from "react";
import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useNavigate } from "react-router-dom";
import CodesForm from "components/Production/CodesForm";
import { useAddCodesMutation } from "redux/features/productions/codesApiSlice";
import { CodeRequest } from "redux/types/Productions/codes";
import { CodesResolver } from "validators/graderValidator/Productions/CodesResolver";

const defaultValues: CodeRequest = {
  codeId: 0,
  codeDate: new Date().toISOString().split("T")[0],
  tickets: 1,
  pieces: 1,
  description: "",
  unitWeight: 0,
  priQUnit: 0,
  labelTypeId: 0,
  departmentId: 0,
  gradeId: 0,
  itemId: 0,
  floorId: 0,
  isPrint: false,
  wunitId: 0,
  secUnitId: 0,
  isScanned: false,
  clientId: 0,
};
export default function AddCode() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CodeRequest, null>({ defaultValues, resolver: CodesResolver });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [addCodes, { isLoading }] = useAddCodesMutation();

  const onSubmit = async (values: CodeRequest) => {
    const res = await addCodes(values);

    if ("data" in res && res.data.status === "SUCCESS") {
      navigate(-1);
    }
  };
  return (
    <>
      <div style={{ marginTop: "mt-3" }}>
        <ActionBarAddEdit
          title="Codes"
          mode={"ADD"}
          isLoading={isLoading}
          onSubmit={handleSubmit(onSubmit)}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
        <CodesForm
          mode={"ADD"}
          isEdit
          control={control}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      </div>
    </>
  );
}
