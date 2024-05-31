import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AccountForm from "components/Finance/AccountForm/AccountForm";
import {
  useEditAccountMutation,
  useGetAllAccountsQuery,
  useLazyGetByIdAccountQuery,
} from "redux/features/finance/primarydata/accountApiSlice";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import {
  Account,
  AccountRequest,
} from "redux/types/Finance/PrimaryData/account";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "shared/Components/Loader/Loader";
import { AccountType } from "redux/types/common/accountType";
import { useGetAccountTypeQuery } from "redux/features/finance/primarydata/accountTypeApiSlice";
import { editaccountResolver } from "validators/graderValidator/Finance/primarydataResolver";
const defaultValues: AccountRequest = {
  parentAccountId: 0,
  accountTitle: "",
  accountCode: "",
  accountTypeId: 0,
  reportGroupId: 0,
  groupId: 0,
  accountType: "",
  depth: 0,
  currencyId: 0,
  controlAccountRef: "",
};

export default function EditAccount() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AccountRequest, null>({
    defaultValues,
    resolver: editaccountResolver,
  });

  const params = useParams();
  const [EditAccount, { isLoading: AddLoading }] = useEditAccountMutation();
  const [getAccountById, result] = useLazyGetByIdAccountQuery();
  const { data: AccountType, isLoading } = useGetAccountTypeQuery(null);
  const { data } = useGetAllAccountsQuery(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [accountTypeData, setAccountTypeData] = useState<AccountType[]>([]);

  useEffect(() => {
    const id = params.id;
    if (id) {
      getAccountById(id);
    }
  }, [params.id, getAccountById]);
  useEffect(() => {
    if (data && AccountType) {
      setAccountData(data);
      setAccountTypeData(AccountType);
    }
  }, [data, AccountType]);
  useEffect(() => {
    if (result.data) {
      setValue(
        "accountCode",
        result?.data?.accountCode ? result?.data?.accountCode : "-"
      );
      setValue(
        "accountTitle",
        result?.data?.accountTitle ? result?.data?.accountTitle : "-"
      );
      setValue(
        "accountType",
        result?.data?.accountType?.name ? result?.data?.accountType?.name : "-"
      );
      setValue("depth", result?.data?.depth ? result?.data?.depth : 0);
      setValue(
        "currencyId",
        result?.data?.currency?.businesscurrencyId
          ? result?.data?.currency?.businesscurrencyId
          : 0
      );
      setValue(
        "parentAccountId",
        result?.data?.parentAccountId ? result?.data?.parentAccountId : 0
      );
      setValue(
        "reportGroupId",
        result?.data?.reportGroup?.reportGroupId
          ? result?.data?.reportGroup?.reportGroupId
          : 0
      );
      setValue(
        "groupId",
        result?.data?.group?.groupId ? result?.data?.group?.groupId : 0
      );
      setValue(
        "accountTypeId",
        result?.data?.accountType?.accountTypeId
          ? result?.data?.accountType?.accountTypeId
          : 0
      );
      setValue(
        "controlAccountRef",
        result?.data?.controlAccountRef
      );
    }
  }, [result, setValue]);

  const onSubmit = async (values: AccountRequest) => {
    const updatedObject: AccountRequest = (({ accountType, ...rest }) => rest)(
      values
    );
    updatedObject.accountId = params.id ? +params.id : 0;
    updatedObject.accountLevel = result.data?.accountLevel
      ? result.data?.accountLevel
      : 0;
    updatedObject.totalTxns = result.data?.totalTxns
      ? result.data?.totalTxns
      : 0;

    const response = await EditAccount(updatedObject);

    if ("data" in response && response.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  return (
    <>
      <ActionBarAddEdit
        title="Accounts"
        mode={"EDIT"}
        isLoading={AddLoading}
        onSubmit={handleSubmit(onSubmit)}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      {result.isLoading || isLoading ? (
        <div style={{ marginTop: "25vh" }}>
          <Loader />{" "}
        </div>
      ) : (
        <AccountForm
          isEdit={isEdit}
          errors={errors}
          data={accountData}
          control={control}
          mode={"EDIT"}
          accountTypeData={accountTypeData}
          accountId={params.id ? +params.id : 0}
        />
      )}
    </>
  );
}
