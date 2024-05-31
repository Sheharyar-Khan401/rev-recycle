import SettingDataSideNav from "components/Sales/settingDataSideNav";
import { useEffect, useState } from "react";
import { BasicData } from "redux/types/Sales/setting/basic";
import { useForm } from "react-hook-form";
import SalesSettingForm from "components/Sales/Setting/salesSettingForm";
import {
  useAddSalesSettingsMutation,
  useGetBasicSettingQuery,
} from "redux/features/sales/Settings/salesettingsApiSlice";
import SubmitBar from "shared/Components/SubmitBar";
import Loader from "shared/Components/Loader/Loader";
import { hasPermission } from "helper/utility";
const defaultValues: BasicData = {
  postGPbeforeConversion: false,
  recordProfit: false,
  salesSettingId: 0,
};

export default function Basic() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<BasicData, null>({
    defaultValues,
  });
  const [addBasic, { isLoading: AddLoading }] = useAddSalesSettingsMutation();
  const { data, isLoading } = useGetBasicSettingQuery(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // eslint-disable-next-line
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const onSubmit = (values: BasicData) => {
    addBasic(values);
  };
  useEffect(() => {
    if (data) {
      setValue(
        "postGPbeforeConversion",
        data?.postGPbeforeConversion ? data?.postGPbeforeConversion : false
      );
      setValue("recordProfit", data?.recordProfit ? data?.recordProfit : false);
      setValue(
        "salesSettingId",
        data?.salesSettingId ? data?.salesSettingId : 0
      );
    }
  }, [data, setValue]);
  return (
    <>
      <div className="d-lg-flex  mt-4">
        <SettingDataSideNav type={1} />
        {(hasPermission("sal_set_101") || hasPermission("sal_set_103")) && (
          <div className="mt-lg-3 ms-md-2 ms-4 ps-md-0 ps-2 col-11 col-lg-9">
            {hasPermission("sal_set_101") && (
              <SubmitBar
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                isLoading={AddLoading}
                setIsDisabled={setIsDisabled}
                onSubmit={handleSubmit(onSubmit)}
                mode={"EDIT"}
              />
            )}
            {isLoading ? (
              <div style={{ margin: "5rem" }}>
                <Loader />
              </div>
            ) : (
              <div className="my-3">
                <SalesSettingForm
                  mode="edit"
                  isEdit={isEdit}
                  control={control}
                  errors={errors}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
