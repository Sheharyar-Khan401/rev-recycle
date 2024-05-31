import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useGetAllAccountsQuery } from "redux/features/finance/primarydata/accountApiSlice";
import { Account } from "redux/types/Finance/PrimaryData/account";
import SubmitBar from "shared/Components/SubmitBar";
import FormValidationError from "shared/Components/FormValidationError";
import { MDBSelect } from "mdb-react-ui-kit";
import {
  useAddAccountSettingProductionMutation,
  useGetAccountSettingProductionQuery,
} from "redux/features/Settings/Productions/accountSettingProductionApiSlice";
import { AccountSettingProduction } from "redux/types/Settings/Productions/accountsettingproduction";
import Loader from "shared/Components/Loader/Loader";
// import { accountsettingproductionResolver } from "validators/graderValidator/Settings/accountsettingResolver";
import AccountSettingsSideNav from "components/Settings/AccountSettings/AccountSettingsSidenav";
const defaultValues: AccountSettingProduction = {
  accountSettingProductionId: 0,
  finishedGoods: 0,
  workProgress: 0,
  accusedProductionExpense: 0,
  production: 0,
  workInProgress: 0,
  productionRawMaterial: 0,
  productionAccuredExpense: 0,
  debitWorkinProgress: 0,
  creditFinishedGoods: 0,
  creditProductionAccureExpense: 0,
  wipWorkInProgress: 0,
  retainedEarnings: 0,
  impairedStockAccount: 0,
  wipFinishedGoods: 0,
};
export default function Production() {
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data } = useGetAllAccountsQuery(null);
  const { isLoading: getLoading, data: accountsettingdata } =
    useGetAccountSettingProductionQuery(null);
  const [addAccountSettingProduction, { isLoading: addLoading }] =
    useAddAccountSettingProductionMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AccountSettingProduction, null>({
    defaultValues,
    // resolver: accountsettingproductionResolver,
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
        defaultSelected: data.accountId === id,
      };
    });
  };
  const onSubmit = (values: AccountSettingProduction) => {
    addAccountSettingProduction(values);
  };

  useEffect(() => {
    if (accountsettingdata) {
      reset(accountsettingdata);
    }
  }, [accountsettingdata, reset]);

  return (
    <>
      <div className="d-lg-flex">
        <AccountSettingsSideNav type={2} />
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
              <h5 className="py-3 m-0 fw-bold">Daily Production</h5>
              <hr className="mt-0" />
              <label className="fw-bold black">Debit</label>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="finishedGoods"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Finished Goods"
                      inputClassName={errors.finishedGoods && "is-invalid"}
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
                  errorMessage={errors.finishedGoods?.message}
                />
              </div>
              <label className="fw-bold black">Credit</label>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="workProgress"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Work in Progress"
                      inputClassName={errors.workProgress && "is-invalid"}
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
                  errorMessage={errors.workProgress?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="accusedProductionExpense"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Accured Production Expense"
                      inputClassName={
                        errors.accusedProductionExpense && "is-invalid"
                      }
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
                  errorMessage={errors.accusedProductionExpense?.message}
                />
              </div>
              <label className="fw-bold black">Debit/Credit</label>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="production"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Production P/L"
                      inputClassName={errors.production && "is-invalid"}
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
                  errorMessage={errors.production?.message}
                />
              </div>

              <h6></h6>
              <h5 className="py-3 m-0 fw-bold">Production Issuance (Purchase)</h5>
              <hr className="mt-0" />
              <label className="fw-bold black">Debit</label>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="workInProgress"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Work In Progress"
                      inputClassName={errors.workInProgress && "is-invalid"}
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
                  errorMessage={errors.workInProgress?.message}
                />
              </div>
              <label className="fw-bold black">Credit</label>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="productionRawMaterial"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Raw Material"
                      inputClassName={
                        errors.productionRawMaterial && "is-invalid"
                      }
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
                  errorMessage={errors.productionRawMaterial?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="productionAccuredExpense"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Accured Production Expense"
                      inputClassName={
                        errors.productionAccuredExpense && "is-invalid"
                      }
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
                  errorMessage={errors.productionAccuredExpense?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="creditFinishedGoods"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Finished Goods"
                      inputClassName={
                        errors.creditFinishedGoods && "is-invalid"
                      }
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
                  errorMessage={errors.creditFinishedGoods?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="creditProductionAccureExpense"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Production Accure Expense"
                      inputClassName={
                        errors.creditProductionAccureExpense && "is-invalid"
                      }
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
                  errorMessage={errors.creditProductionAccureExpense?.message}
                />
              </div>
              <h5 className="py-3 m-0 fw-bold">WIP Opening</h5>
              <hr className="mt-0" />
              <label className="fw-bold black">Debit</label>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="debitWorkinProgress"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Work In Progress"
                      inputClassName={
                        errors.debitWorkinProgress && "is-invalid"
                      }
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
                  errorMessage={errors.debitWorkinProgress?.message}
                />
              </div>
              <label className="fw-bold black">Credit</label>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="retainedEarnings"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Retained Earnings"
                      inputClassName={errors.retainedEarnings && "is-invalid"}
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
                  errorMessage={errors.retainedEarnings?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="wipWorkInProgress"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Work in Progress"
                      inputClassName={errors.wipWorkInProgress && "is-invalid"}
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
                  errorMessage={errors.wipWorkInProgress?.message}
                />
              </div>
              <h5 className="py-3 m-0 fw-bold">Impaired Stock</h5>
              <hr className="mt-0" />
              <label className="fw-bold black">Debit</label>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="impairedStockAccount"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Impaired Stock Account"
                      inputClassName={
                        errors.impairedStockAccount && "is-invalid"
                      }
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
                  errorMessage={errors.impairedStockAccount?.message}
                />
              </div>
              <label className="fw-bold black">Credit</label>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="wipFinishedGoods"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Finished Goods"
                      inputClassName={errors.wipFinishedGoods && "is-invalid"}
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
                  errorMessage={errors.wipFinishedGoods?.message}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
