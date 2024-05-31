import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useGetAllAccountsQuery } from "redux/features/finance/primarydata/accountApiSlice";
import { Account } from "redux/types/Finance/PrimaryData/account";
// import { accountsettingsaleResolver } from "validators/graderValidator/Settings/accountsettingResolver";
import SubmitBar from "shared/Components/SubmitBar";
import FormValidationError from "shared/Components/FormValidationError";
import { MDBSelect } from "mdb-react-ui-kit";
import Loader from "shared/Components/Loader/Loader";
import { AccountSettingSale } from "redux/types/Settings/Productions/accountsettingsale";
import {
  useAddAccountSettingSaleMutation,
  useGetAccountSettingSaleQuery,
} from "redux/features/Settings/Productions/accountSettingSaleApiSlice";
import AccountSettingsSideNav from "components/Settings/AccountSettings/AccountSettingsSidenav";
const defaultValues: AccountSettingSale = {
  accountSettingSaleId: 0,
  debitCostofGoods: 0,
  creditRawMaterial: 0,
  creditFinishedGoods: 0,
  saleIncomeAccount: 0,
  taxAccount: 0,
  saleInvoiceDiscount: 0,
  freightExpertise: 0,
  cleaningExpense: 0,
  cncExpense: 0,
  otherInvoice: 0,
  freightInvoice: 0,
  clearBillInvoice: 0,
  otherBill: 0,
  cncBillInvoice: 0,
};
export default function Sale() {
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data } = useGetAllAccountsQuery(null);
  const { isLoading: getLoading, data: accountsettingsaledata } =
    useGetAccountSettingSaleQuery(null);
  const [addAccountSettingSale, { isLoading: addLoading }] =
    useAddAccountSettingSaleMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AccountSettingSale, null>({
    defaultValues,
    // resolver: accountsettingsaleResolver,
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
  const onSubmit = (values: AccountSettingSale) => {
    addAccountSettingSale(values);
  };
  useEffect(() => {
    if (accountsettingsaledata) {
      reset(accountsettingsaledata);
    }
  }, [accountsettingsaledata, reset]);

  return (
    <>
      <div className="d-lg-flex">
        <AccountSettingsSideNav type={3} />
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
              <h5 className="py-3 m-0 fw-bold">Sale Gate Pass</h5>
              <hr className="mt-0" />
              <label className="fw-bold black">Debit</label>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="debitCostofGoods"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Cost of Goods"
                      inputClassName={errors.debitCostofGoods && "is-invalid"}
                      data={accountDataList(value ?? 0)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      disabled={!isEdit}
                      search
                      preventFirstSelection
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.debitCostofGoods?.message}
                />
              </div>
              <label className="fw-bold black">Credit</label>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="creditRawMaterial"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Raw Material"
                      inputClassName={errors.creditRawMaterial && "is-invalid"}
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
                  errorMessage={errors.creditRawMaterial?.message}
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
              <h5 className="py-3 m-0 fw-bold">Sale Invoice</h5>
              <hr className="mt-0" />
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="saleIncomeAccount"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Income Account"
                      inputClassName={errors.saleIncomeAccount && "is-invalid"}
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
                  errorMessage={errors.saleIncomeAccount?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="taxAccount"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Tax Account"
                      inputClassName={errors.taxAccount && "is-invalid"}
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
                  errorMessage={errors.taxAccount?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="saleInvoiceDiscount"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Invoice Discount"
                      inputClassName={
                        errors.saleInvoiceDiscount && "is-invalid"
                      }
                      search
                      data={accountDataList(value ?? 0)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      disabled={!isEdit}
                      preventFirstSelection
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.saleInvoiceDiscount?.message}
                />
              </div>

              <label className="fw-bold black">Bill to Supplier</label>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="freightExpertise"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Freight Expense"
                      inputClassName={errors.freightExpertise && "is-invalid"}
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
                  errorMessage={errors.freightExpertise?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="cleaningExpense"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Clearing Expense"
                      inputClassName={errors.cleaningExpense && "is-invalid"}
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
                  errorMessage={errors.cleaningExpense?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="cleaningExpense"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Clearing Expense"
                      inputClassName={errors.cleaningExpense && "is-invalid"}
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
                  errorMessage={errors.cleaningExpense?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="cncExpense"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="CNC/COC Expense"
                      inputClassName={errors.cncExpense && "is-invalid"}
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
                  errorMessage={errors.cncExpense?.message}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="otherInvoice"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Other Expense"
                      inputClassName={errors.otherInvoice && "is-invalid"}
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
                  errorMessage={errors.otherInvoice?.message}
                />
              </div>
              <h5 className="py-3 m-0 fw-bold">Freight Bill Invoice</h5>
              <hr className="mt-0" />
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="freightInvoice"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Freight Bill Invoice"
                      inputClassName={errors.freightInvoice && "is-invalid"}
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
                  errorMessage={errors.freightInvoice?.message}
                />
              </div>
              <h5 className="py-3 m-0 fw-bold">Clearing Bill Invoice</h5>
              <hr className="mt-0" />
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="clearBillInvoice"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Clearing Bill Invoice"
                      inputClassName={errors.clearBillInvoice && "is-invalid"}
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
                  errorMessage={errors.clearBillInvoice?.message}
                />
              </div>
              <h5 className="py-3 m-0 fw-bold">Other Exp Bill Invoice</h5>
              <hr className="mt-0" />
              <div className="col-lg-5 col-md-6 col-12 my-3">
                <Controller
                  control={control}
                  name="otherBill"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Other Exp Bill Invoice"
                      inputClassName={errors.otherBill && "is-invalid"}
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
                <FormValidationError errorMessage={errors.otherBill?.message} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
