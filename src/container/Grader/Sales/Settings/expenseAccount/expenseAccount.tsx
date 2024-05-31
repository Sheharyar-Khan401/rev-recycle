import { useState, useEffect } from "react";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";
import SettingDataSideNav from "components/Sales/settingDataSideNav";
import { useGetAllAccountsQuery } from "redux/features/finance/primarydata/accountApiSlice";
import { Account } from "redux/types/Finance/PrimaryData/account";
import {
  useAddExpenseMutation,
  useGetExpenseQuery,
} from "redux/features/sales/Settings/expenseApiSlice";
import {
  ExpenseData,
  ExpenseRequest,
} from "redux/types/Sales/setting/expense";
import { hasPermission } from "helper/utility";

export default function ExpenseAccount() {
  const [addExpense, { isLoading: AddLoading }] = useAddExpenseMutation();
  const { isLoading, data } = useGetAllAccountsQuery(null);
  const { isLoading: dataLoading, data: ExpenseData } =
    useGetExpenseQuery(null);

  const [rowData, setRowData] = useState<ExpenseRequest[]>([]);

  const columns: column<"expenseAccountId", ExpenseRequest>[] = [
    {
      label: "Account",
      field: "accountId",
      sort: false,
      inputType: "select",
      options: data?.length
        ? data?.map((item: Account) => {
            return {
              text: item?.accountTitle ? item?.accountTitle : "-",
              value: item?.accountId ? item?.accountId : 0,
            };
          })
        : [],
    },
  ];
  const onSubmit = () => {
    addExpense(rowData);
  };

  useEffect(() => {
    if (ExpenseData && ExpenseData?.length > 0) {
      setRowData(
        ExpenseData?.map((item: ExpenseData) => {
          return {
            accountId: item?.account?.accountId ? item?.account?.accountId : 0,
            expenseAccountId: item?.expenseAccountId
              ? item?.expenseAccountId
              : 0,
          };
        })
      );
    }
  }, [ExpenseData]);

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <SettingDataSideNav type={3} />
          <div className="table-container">
            {(hasPermission("sal_set_100") ||
              hasPermission("sal_set_101") ||
              hasPermission("sal_set_102") ||
              hasPermission("sal_set_103")) && (
              <EditableDataTable
                identifier="expenseAccountId"
                columns={columns}
                rows={rowData}
                onSubmit={onSubmit}
                showSerialNumbers
                setRows={setRowData}
                submitLoading={AddLoading}
                isLoading={isLoading || dataLoading}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
