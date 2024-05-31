import { useForm } from "react-hook-form";
import { OpeningBalanceRequest } from "redux/types/Productions/Settings";
import { SettingsOpeningBalanceResolver } from "validators/graderValidator/Productions/SettingsResolver";
import { Controller } from "react-hook-form";
import { MDBDatepicker, MDBInput } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import FormValidationError from "shared/Components/FormValidationError";
import {
  useEditProductionOpeningBalanceMutation,
  useGetProductionOpeningBalanceQuery,
} from "redux/features/productions/Settings/openingBalanceApiSlice";
import ProductionSettingsSideNav from "components/Production/Settings/ProductionSettingsSideNav";
import SubmitBar from "shared/Components/SubmitBar";
import Loader from "shared/Components/Loader/Loader";
import { getDateFromMillis, hasPermission } from "helper/utility";
const defaultValues: OpeningBalanceRequest = {
  openingBalanceId: 0,
  wipOpeningDate: "",
  wipOpeningAmount: 0,
  wipOpeningIBS: 0,
};
export default function OpeningBalance() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<OpeningBalanceRequest, null>({
    defaultValues,
    resolver: SettingsOpeningBalanceResolver,
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editOpeningBalance, { isLoading: AddLoading }] =
    useEditProductionOpeningBalanceMutation();
  const { isLoading, data } = useGetProductionOpeningBalanceQuery(null);
  const onSubmit = async (values: OpeningBalanceRequest) => {
    await editOpeningBalance(values);
  };

  useEffect(() => {
    if (data) {
      setValue("openingBalanceId", data?.openingBalanceId);
      setValue(
        "wipOpeningDate",
        data?.wipOpeningDate ? getDateFromMillis(data?.wipOpeningDate) : ""
      );
      setValue("wipOpeningAmount", data?.wipOpeningAmount);
      setValue("wipOpeningIBS", data?.wipOpeningIBS);
    }
  }, [data, setValue]);
  return (
    <>
      <div className="d-lg-flex">
        <ProductionSettingsSideNav type={2} />
        {(hasPermission("pro_set_100") || hasPermission("pro_set_101") || hasPermission("pro_set_102") || hasPermission("pro_set_103")) &&

        <div className="table-container">
          {isLoading ? (
            <div style={{ margin: "5rem" }}>
              <Loader />
            </div>
          ) : (
            <>
              <div className="mt-3">
                <SubmitBar
                  mode={"EDIT"}
                  isLoading={AddLoading}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  onSubmit={handleSubmit(onSubmit)}
                />
              </div>

              <div>
                <div className="col-lg-5 col-xl-5 col-md-6 col-11 my-4">
                  <Controller
                    control={control}
                    name="wipOpeningDate"
                    render={({ field: { onChange, value } }) => (
                      <>
                        <MDBDatepicker
                          label="WIP Opening Date"
                          format="yyyy-mm-dd"
                          className={errors.wipOpeningDate && "is-invalid"}
                          value={value}
                          onChange={onChange}
                          inputLabel=" "
                          inline
                          disabled={!isEdit}
                        />
                      </>
                    )}
                  />
                  <FormValidationError
                    errorMessage={errors.wipOpeningDate?.message}
                  />
                </div>
                <div className="col-lg-5 col-xl-5 col-md-6 col-11 my-4">
                  <Controller
                    control={control}
                    name="wipOpeningAmount"
                    render={({ field: { onChange, value } }) => (
                      <MDBInput
                        className={`${errors.wipOpeningAmount && "is-invalid"}`}
                        label="WIP Opening Amount"
                        type="number"
                        disabled={!isEdit}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  <FormValidationError
                    errorMessage={errors.wipOpeningAmount?.message}
                  />
                </div>
                <div className="col-lg-5 col-xl-5 col-md-6 col-11 my-4">
                  <Controller
                    control={control}
                    name="wipOpeningIBS"
                    render={({ field: { onChange, value } }) => (
                      <MDBInput
                        className={`${errors.wipOpeningIBS && "is-invalid"}`}
                        label="WIP Opening LBS"
                        type="number"
                        disabled={!isEdit}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  <FormValidationError
                    errorMessage={errors.wipOpeningIBS?.message}
                  />
                </div>
              </div>
            </>
          )}
        </div>
}
      </div>
    </>
  );
}
