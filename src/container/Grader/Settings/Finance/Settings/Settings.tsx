import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FinanceSideNav from "components/Settings/Finance/FinanceSideNav";
import {
  useGetSettingsQuery,
  useUpdateSettingMutation,
} from "redux/features/Settings/Finance/settingsApiSlice";
import { SettingsRequest } from "redux/types/Settings/Finance/setting";
import { Controller } from "react-hook-form";
import { MDBInput, MDBSwitch } from "mdb-react-ui-kit";
import SubmitBar from "shared/Components/SubmitBar";
import Loader from "shared/Components/Loader/Loader";
export default function Settings() {
  const { handleSubmit, control, setValue } = useForm<SettingsRequest>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { isLoading, data } = useGetSettingsQuery(null);
  const [updateSetting, { isLoading: UpdateLoading }] =
    useUpdateSettingMutation();
  const onSubmit = (values: SettingsRequest) => {
    updateSetting(values);
  };
  useEffect(() => {
    if (data) {
      setValue("tax", data?.tax);
      setValue("exchangeRateVoucher", data?.exchangeRateVoucher);
      setValue("misvalue", data?.misvalue);
      setValue("financeSettingId", data?.financeSettingId);
    } else {
      setValue("tax", 0)
    }
  }, [data, setValue]);
  return (
    <>
      <div className="d-lg-flex">
        <FinanceSideNav type={2} />
        <div className="table-container">
          <div className="mt-3">
            <SubmitBar
              mode={"EDIT"}
              isLoading={UpdateLoading}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              onSubmit={handleSubmit(onSubmit)}
            />
          </div>
          {isLoading ? (
            <div style={{ marginTop: "25vh" }}>
              <Loader />
            </div>
          ) : (
            <div>
              <div className="d-flex align-items-center mx-lg-5">
                <h6 className="mb-0 fw-bold">Tax %</h6>
                <div className=" col-lg-4 col-md-6 col-11 my-3 mx-5">
                  <Controller
                    control={control}
                    name="tax"
                    render={({ field: { onChange, value } }) => (
                      <MDBInput
                        // className={`${errors.name && "is-invalid"}`}
                        label="Tax"
                        type="number"
                        disabled={!isEdit}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-11 my-4 mx-5">
                <Controller
                  control={control}
                  name="misvalue"
                  render={({ field: { value, onChange } }) => (
                    <MDBSwitch
                      label="USE MIS VALUE IN REPORTS"
                      checked={value}
                      disabled={!isEdit}
                      onChange={onChange}
                      labelClass="black"
                    />
                  )}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-11 my-3 mx-5">
                <Controller
                  control={control}
                  name="exchangeRateVoucher"
                  render={({ field: { value, onChange } }) => (
                    <MDBSwitch
                      label={
                        <>
                          <span style={{ textTransform: "uppercase" }}>
                            update exchange rate on existing posted vouchers
                          </span>
                        </>
                      }
                      checked={value}
                      disabled={!isEdit}
                      onChange={onChange}
                      labelClass="black"
                    />
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
