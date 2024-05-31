import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useGetAllAccountsQuery } from "redux/features/finance/primarydata/accountApiSlice";
import { Account } from "redux/types/Finance/PrimaryData/account";
// import { accountsettingpurchaseResolver } from "validators/graderValidator/Settings/accountsettingResolver";
import SubmitBar from "shared/Components/SubmitBar";
import FormValidationError from "shared/Components/FormValidationError";
import { MDBSelect } from "mdb-react-ui-kit";
import { AccountSettingPurchase } from "redux/types/Settings/Productions/accountsettingpurchase";
import {
  useAddAccountSettingPurchaseMutation,
  useGetAccountSettingPurchaseQuery,
} from "redux/features/Settings/Productions/accountSettingPurchaseApiSlice";
import Loader from "shared/Components/Loader/Loader";
import AccountSettingsSideNav from "components/Settings/AccountSettings/AccountSettingsSidenav";
const defaultValues: AccountSettingPurchase = {
  accountSettingId: 0,
  debitRawMaterials: 0,
  creditFreightPaymentAccounts: 0,
  clearingPaymentAccounts: 0,
  deliveryOrderprePaymentAcounts: 0,
  comissionPrePaymentAccounts: 0,
  freightBillAccounts: 0,
  clearingBillAccounts: 0,
  deliveryOrderBillAccounts: 0,
  clearBillInvoice: 0,
  otherBill: 0,
};
export default function Purchase() {
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data } = useGetAllAccountsQuery(null);
  const { isLoading: getLoading, data: accountsettingpurchasedata } =
    useGetAccountSettingPurchaseQuery(null);
  const [addAccountSettingPurchase, { isLoading: addLoading }] =
    useAddAccountSettingPurchaseMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AccountSettingPurchase, null>({
    defaultValues,
    // resolver: accountsettingpurchaseResolver,
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
  const onSubmit = (values: AccountSettingPurchase) => {
    addAccountSettingPurchase(values);
  };
  useEffect(() => {
    if (accountsettingpurchasedata) {
      reset(accountsettingpurchasedata);
    }
  }, [accountsettingpurchasedata, reset]);

  return (
    <>
      <div className="d-lg-flex">
        <AccountSettingsSideNav type={1} />
        <div className="table-container">
          <SubmitBar
            mode={"EDIT"}
            isLoading={addLoading}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            onSubmit={handleSubmit(onSubmit)}
          />
          {getLoading ? (
            <div className="m-5">
              <Loader />
            </div>
          ) : (
            <div>
              <h5 className="py-3 m-0 fw-bold">Gate Pass</h5>
              <hr className="mt-0" />
              <h6 className="fw-bold">Debit</h6>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="debitRawMaterials"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Raw Material"
                      inputClassName={errors.debitRawMaterials && "is-invalid"}
                      data={accountDataList(value ? value : 0)}
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
                  errorMessage={errors.debitRawMaterials?.message}
                />
              </div>
              <label className="fw-bold black">Credit</label>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="creditFreightPaymentAccounts"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Freight Prepayment Account"
                      inputClassName={
                        errors.creditFreightPaymentAccounts && "is-invalid"
                      }
                      data={accountDataList(value ? value : 0)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      search
                      preventFirstSelection
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.creditFreightPaymentAccounts?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="clearingPaymentAccounts"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Clearing Prepayment Account"
                      inputClassName={
                        errors.clearingPaymentAccounts && "is-invalid"
                      }
                      preventFirstSelection
                      data={accountDataList(value ? value : 0)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.clearingPaymentAccounts?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="deliveryOrderprePaymentAcounts"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Delivery Order Prepayment Account"
                      inputClassName={
                        errors.deliveryOrderprePaymentAcounts && "is-invalid"
                      }
                      preventFirstSelection
                      data={accountDataList(value ? value : 0)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.deliveryOrderprePaymentAcounts?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="comissionPrePaymentAccounts"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Commision Prepayment Account"
                      inputClassName={
                        errors.comissionPrePaymentAccounts && "is-invalid"
                      }
                      preventFirstSelection
                      data={accountDataList(value ? value : 0)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.comissionPrePaymentAccounts?.message}
                />
              </div>
              <h5 className="py-3 m-0 fw-bold">Bill Invoice</h5>
              <hr className="mt-0" />
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="freightBillAccounts"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Freight Bill Account"
                      inputClassName={
                        errors.freightBillAccounts && "is-invalid"
                      }
                      preventFirstSelection
                      data={accountDataList(value ? value : 0)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.freightBillAccounts?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="clearingBillAccounts"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Clearing Bill Account"
                      inputClassName={
                        errors.clearingBillAccounts && "is-invalid"
                      }
                      preventFirstSelection
                      data={accountDataList(value ? value : 0)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.clearingBillAccounts?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="deliveryOrderBillAccounts"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Delivery Order Bill Account"
                      inputClassName={
                        errors.deliveryOrderBillAccounts && "is-invalid"
                      }
                      preventFirstSelection
                      data={accountDataList(value ? value : 0)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      search
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.deliveryOrderBillAccounts?.message}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
