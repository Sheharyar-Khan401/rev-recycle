import { useState } from "react";
import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useNavigate } from "react-router-dom";
import IssuanceForm from "components/Production/issunaceForm";
import { issuanceRequest } from "redux/types/Productions/issuance";
import { issuanceResolver } from "validators/graderValidator/Productions/issuanceResolver";
import { useAddIssuanceMutation } from "redux/features/productions/issuanceApiSlice";
interface Props {
  issuanceTypeId: number;
}
const defaultValues: issuanceRequest = {
  issuanceDate: "",
  cartonId: 0,
  remarks: "",
};
export default function AddIssuance({ issuanceTypeId }: Props) {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<issuanceRequest, null>({
    defaultValues,
    resolver: issuanceResolver,
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [addProductionIssuance, { isLoading }] = useAddIssuanceMutation();

  const onSubmit = async (values: issuanceRequest) => {
    const addProductionIss: issuanceRequest = {
      issuanceDate: values?.issuanceDate ? values?.issuanceDate : "",
      carton: { cartonId: values?.cartonId ? values?.cartonId : 0 },
      remarks: values?.remarks ? values?.remarks : "",
      issuanceType: { issuanceTypeId: issuanceTypeId },
    };

    const res = await addProductionIssuance(addProductionIss);
    if ("data" in res && res.data.status === "SUCCESS") {
      navigate(-1);
    }
  };
  return (
    <>
      <div>
        <ActionBarAddEdit
          title={`${
            issuanceTypeId === 1
              ? "Production"
              : issuanceTypeId === 2
              ? "Reproduction"
              : issuanceTypeId === 3
              ? "Wiper"
              : issuanceTypeId === 4 && "Mutility"
          } Issuances`}
          mode={"ADD"}
          isLoading={isLoading}
          onSubmit={handleSubmit(onSubmit)}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />

        <IssuanceForm
          mode={"Add"}
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
