import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BankAccountForm from "components/Finance/BankAccountForm/BankAccountForm";
import { useGetAllAccountsQuery } from "redux/features/finance/primarydata/accountApiSlice";
import {
  useEditBankAccountMutation,
  useLazyGetbyByIdbankAccountQuery,
} from "redux/features/finance/primarydata/bankAccountApiSlice";
import { Account } from "redux/types/Finance/PrimaryData/account";
import { BankAccount } from "redux/types/Finance/PrimaryData/bankAccount";

import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import Loader from "shared/Components/Loader/Loader";
import { editBankAccountResolver } from "validators/graderValidator/Finance/primarydataResolver";

const defaultValues: BankAccount = {
  bankAccountId: 0,
  linkedAccountTitle: "",
  bankAccountTitle: "",
  bankAccountCode: "",
  bankName: "",
  nameOfBranch: "",
  address: "",
  bankIbanNumber: "",
  phoneNumber: "",
  faxNumber: "",
  emailAddress: "",
  receivableAccountId: 0,
  payableAccountId: 0,
  accountId: 0,
};

export default function EditBankAccount() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BankAccount, null>({
    defaultValues,
    resolver: editBankAccountResolver,
  });

  const params = useParams();
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data } = useGetAllAccountsQuery(null);
  const [getByIdbankAccount, result] = useLazyGetbyByIdbankAccountQuery();
  const [EditBankAccount, { isLoading: AddLoading }] =
    useEditBankAccountMutation();

  useEffect(() => {
    const id = params.id;
    if (id) {
      getByIdbankAccount(id);
    }
  }, [params.id, getByIdbankAccount]);
  useEffect(() => {
    if (data) {
      setAccountData(data);
    }
  }, [data]);
  useEffect(() => {
    if (result.data) {
      setValue(
        "linkedAccountTitle",
        result?.data?.account ? result?.data?.account?.accountTitle : ""
      );
      setValue(
        "accountId",
        result?.data?.account ? result?.data?.account?.accountId : 0
      );
      setValue(
        "bankAccountTitle",
        result?.data?.bankAccountTitle ? result?.data?.bankAccountTitle : ""
      );
      setValue(
        "bankAccountCode",
        result?.data?.bankAccountCode ? result?.data?.bankAccountCode : ""
      );
      setValue(
        "bankName",
        result?.data?.bankName ? result?.data?.bankName : ""
      );
      setValue(
        "nameOfBranch",
        result?.data?.nameOfBranch ? result?.data?.nameOfBranch : ""
      );
      setValue("address", result?.data?.address ? result?.data?.address : "");
      setValue(
        "bankIbanNumber",
        result?.data?.bankIbanNumber ? result?.data?.bankIbanNumber : ""
      );
      setValue(
        "phoneNumber",
        result?.data?.phoneNumber ? result?.data?.phoneNumber : ""
      );
      setValue(
        "faxNumber",
        result?.data?.faxNumber ? result?.data?.faxNumber : ""
      );
      setValue(
        "emailAddress",
        result?.data?.emailAddress ? result?.data?.emailAddress : ""
      );
      setValue(
        "payableAccountId",
        result?.data?.payableAccount
          ? result?.data?.payableAccount?.accountId
          : 0
      );
      setValue(
        "receivableAccountId",
        result?.data?.receivableAccount
          ? result?.data?.receivableAccount?.accountId
          : 0
      );
    }
  }, [result, reset, setValue]);
  const onSubmit = async (values: BankAccount) => {
    if (params?.id) {
      values.bankAccountId = +params?.id;
    }

    const result = await EditBankAccount(values);
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
        mode={"EDIT"}
        isLoading={AddLoading}
        onSubmit={handleSubmit(onSubmit)}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      {result.isLoading ? (
        <div style={{ marginTop: "25vh" }}>
          <Loader />{" "}
        </div>
      ) : (
        <BankAccountForm
          isEdit={isEdit}
          errors={errors}
          data={accountData}
          control={control}
          mode={"EDIT"}
        />
      )}
    </>
  );
}
