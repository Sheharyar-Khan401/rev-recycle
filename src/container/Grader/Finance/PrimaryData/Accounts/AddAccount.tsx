import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AccountForm from "components/Finance/AccountForm/AccountForm";
import {
  useAddAccountMutation,
  useGetAllAccountsQuery,
} from "redux/features/finance/primarydata/accountApiSlice";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { accountResolver } from "validators/graderValidator/Finance/primarydataResolver";
import {
  Account,
  AccountRequest,
} from "redux/types/Finance/PrimaryData/account";
import { useNavigate } from "react-router-dom";
import { useGetAccountTypeQuery } from "redux/features/finance/primarydata/accountTypeApiSlice";
import { AccountType } from "redux/types/common/accountType";
import Loader from "shared/Components/Loader/Loader";
const defaultValues: AccountRequest = {
  parentAccountId: 0,
  accountTitle: "",
  accountCode: "",
  accountTypeId: 0,
  currencyId: 0,
  controlAccountRef: "",
};

export default function AddAccount() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AccountRequest, null>({
    defaultValues,
    resolver: accountResolver,
  });

  const { data } = useGetAllAccountsQuery(null);
  const [addAccount, { isLoading: AddLoading }] = useAddAccountMutation();
  const { data: AccountType, isLoading } = useGetAccountTypeQuery(null);
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [accountTypeData, setAccountTypeData] = useState<AccountType[]>([]);

  useEffect(() => {
    setValue("parentAccountId", 0);
    if (data && AccountType) {
      setAccountData(data);
      setAccountTypeData(AccountType);
    }
  }, [data, AccountType, setValue]);
  const onSubmit = async (values: AccountRequest) => {
    const result = await addAccount({
      ...values,
      accountTypeId: +values.accountTypeId,
    });
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };
  useEffect(() => {
    setValue(
      "accountTypeId",
      AccountType && AccountType?.length > 0 ? AccountType[0]?.accountTypeId : 0
    );
  }, [AccountType]);
  return (
    <>
      <ActionBarAddEdit
        title="Accounts"
        mode={"ADD"}
        isLoading={AddLoading}
        onSubmit={handleSubmit(onSubmit)}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <AccountForm
          isEdit
          errors={errors}
          data={accountData}
          accountTypeData={accountTypeData}
          control={control}
        />
      )}
    </>
  );
}
