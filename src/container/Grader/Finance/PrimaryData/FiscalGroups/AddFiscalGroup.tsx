import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { fiscalgroupResolver } from "validators/graderValidator/Finance/primarydataResolver";
import FiscalGroupForm from "components/Finance/FiscalGroupForm/FiscalGroupForm";
import { FiscalYearRequest } from "redux/types/Finance/PrimaryData/fiscalyear";
import { useAddFiscalYearMutation } from "redux/features/finance/primarydata/fiscalyearApiSlice";
const defaultValues: FiscalYearRequest = {
  name: "",
  startDate: "",
  endDate: "",
  active: false,
};
export default function AddFiscalGroup() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FiscalYearRequest, null>({
    defaultValues,
    resolver: fiscalgroupResolver,
  });
  const navigate = useNavigate();
  const [addFiscalYear, { isLoading: AddLoading }] = useAddFiscalYearMutation();
  const onSubmit = async (values: FiscalYearRequest) => {
    const result = await addFiscalYear(values);
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  return (
    <>
      <ActionBarAddEdit
        title="Fiscal Groups"
        mode={"ADD"}
        isLoading={AddLoading}
        onSubmit={handleSubmit(onSubmit)}
      />
      <FiscalGroupForm
        mode={"ADD"}
        isEdit
        watch={watch}
        control={control}
        errors={errors}
      />
    </>
  );
}
