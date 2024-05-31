import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { fiscalgroupResolver } from "validators/graderValidator/Finance/primarydataResolver";
import FiscalGroupForm from "components/Finance/FiscalGroupForm/FiscalGroupForm";
import { useState, useEffect } from "react";
import {
  useLazyGetByIdFiscalYearQuery,
  useEditFiscalYearMutation,
} from "redux/features/finance/primarydata/fiscalyearApiSlice";
import { FiscalYearRequest } from "redux/types/Finance/PrimaryData/fiscalyear";
import Loader from "shared/Components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { getDateFromMillis } from "helper/utility";
const defaultValues: FiscalYearRequest = {
  fiscalYearId: -1,
  name: "",
  startDate: "",
  endDate: "",
  active: false,
};
export default function EditFiscalGroup() {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FiscalYearRequest, null>({
    defaultValues,
    resolver: fiscalgroupResolver,
  });
  const navigate = useNavigate();
  const params = useParams();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editFiscalYear, { isLoading: AddLoading }] =
    useEditFiscalYearMutation();
  const [getFiscalYearById, result] = useLazyGetByIdFiscalYearQuery();

  useEffect(() => {
    const id = params.id;

    if (id) {
      getFiscalYearById(id);
    }
  }, [params.id, getFiscalYearById]);
  useEffect(() => {
    if (result?.data) {
      setValue(
        "startDate",
        result.data.startDate ? getDateFromMillis(result.data.startDate) : "-"
      );
      setValue(
        "endDate",
        result.data.endDate ? getDateFromMillis(result.data.endDate) : "-"
      );
      setValue(
        "fiscalYearId",
        result?.data?.fiscalYearId ? result?.data?.fiscalYearId : 0
      );
      setValue("active", result?.data?.active ? result?.data?.active : false);
      setValue("name", result?.data?.name ? result?.data?.name : "");
    }
  }, [result, reset, setValue]);
  const onSubmit = async (values: FiscalYearRequest) => {
    const result = await editFiscalYear(values);
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
        mode={"EDIT"}
        onSubmit={handleSubmit(onSubmit)}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isLoading={AddLoading}
      />
      {result.isLoading ? (
        <div style={{ marginTop: "25vh" }}>
          <Loader />{" "}
        </div>
      ) : (
        <FiscalGroupForm
          mode={"EDIT"}
          watch={watch}
          isEdit={isEdit}
          control={control}
          errors={errors}
        />
      )}
    </>
  );
}
