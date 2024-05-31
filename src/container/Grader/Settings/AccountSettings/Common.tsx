import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useGetAllAccountsQuery } from "redux/features/finance/primarydata/accountApiSlice";
import { Account } from "redux/types/Finance/PrimaryData/account";
// import { accountsettingcommonResolver } from "validators/graderValidator/Settings/accountsettingResolver";
import SubmitBar from "shared/Components/SubmitBar";
import FormValidationError from "shared/Components/FormValidationError";
import { MDBSelect } from "mdb-react-ui-kit";
import Loader from "shared/Components/Loader/Loader";
import { AccountSettingCommon } from "redux/types/Settings/Productions/accountsettingcommon";
import {
  useAddAccountSettingCommonMutation,
  useGetAccountSettingCommonQuery,
} from "redux/features/Settings/Productions/accountSettingCommonApiSlice";
import AccountSettingsSideNav from "components/Settings/AccountSettings/AccountSettingsSidenav";
const defaultValues: AccountSettingCommon = {
  accountSettingCommonId: 0,
  purchaseAccount: 0,
};
export default function Common() {
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data } = useGetAllAccountsQuery(null);
  const { isLoading: getLoading, data: accountsettingcommondata } =
    useGetAccountSettingCommonQuery(null);
  const [addAccountSettingCommon, { isLoading: addLoading }] =
    useAddAccountSettingCommonMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AccountSettingCommon, null>({
    defaultValues,
    // resolver: accountsettingcommonResolver,
  });
  useEffect(() => {
    if (data) {
      setAccountData(data);
    }
  }, [data]);
  const accountDataList = (id: number) => {
    return accountData?.map((data: Account) => {
      return {
        text: data?.accountTitle ? data?.accountTitle : "",
        value: data?.accountId ? data?.accountId : 0,
        defaultSelected: data?.accountId === id,
      };
    });
  };
  const onSubmit = (values: AccountSettingCommon) => {
    addAccountSettingCommon(values);
  };
  useEffect(() => {
    if (accountsettingcommondata) {
      reset(accountsettingcommondata);
    }
  }, [accountsettingcommondata, reset]);

  return (
    <>
      <div className="d-lg-flex">
        <AccountSettingsSideNav type={4} />
        <div className="table-container">
          <SubmitBar
            mode={"EDIT"}
            isLoading={addLoading}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            onSubmit={handleSubmit(onSubmit)}
          />
          {getLoading ? (
            <Loader />
          ) : (
            <div>
              <h5 className="py-3 m-0 fw-bold">Purchase Account</h5>
              <hr className="mt-0" />
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="purchaseAccount"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Purchase Account"
                      inputClassName={errors.purchaseAccount && "is-invalid"}
                      data={accountDataList(value ?? 0)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                      preventFirstSelection
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.purchaseAccount?.message}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
