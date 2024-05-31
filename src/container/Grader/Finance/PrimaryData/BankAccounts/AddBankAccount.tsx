import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BankAccountForm from "components/Finance/BankAccountForm/BankAccountForm";
import { useAddbankAccountsMutation } from "redux/features/finance/primarydata/bankAccountApiSlice";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { addBankAccountResolver } from "validators/graderValidator/Finance/primarydataResolver";
import { Account } from "redux/types/Finance/PrimaryData/account";
import { useGetAllAccountsQuery } from "redux/features/finance/primarydata/accountApiSlice";
import { BankAccount } from "redux/types/Finance/PrimaryData/bankAccount";
const defaultValues: BankAccount = {
  accountId: 0,
};
export default function AddBankAccount() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<BankAccount, null>({
    defaultValues,
    resolver: addBankAccountResolver,
  });
  const [accountData, setAccountData] = useState<Account[]>([]);
  const { data } = useGetAllAccountsQuery(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [AddBankAccount, { isLoading: AddLoading }] =
    useAddbankAccountsMutation();
  useEffect(() => {
    if (data) {
      setAccountData(data);
      setValue("accountId", data ? data[0]?.accountId : 0);
    }
  }, [data]);
  const onSubmit = async (values: BankAccount) => {
    const result = await AddBankAccount(values);
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  return (
    <>
      <ActionBarAddEdit
        title="Bank Accounts"
        mode={"ADD"}
        isLoading={AddLoading}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onSubmit={handleSubmit(onSubmit)}
      />
      <BankAccountForm
        isEdit={!isEdit}
        errors={errors}
        control={control}
        data={accountData}
        mode={"ADD"}
      />
    </>
  );
}
