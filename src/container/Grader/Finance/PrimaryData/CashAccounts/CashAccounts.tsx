import { useEffect, useState } from "react";
import PrimaryDataSideNav from "components/Finance/PrimaryDataSidenav";
import {
  useAddCashAccountMutation,
  useGetCashAccountQuery,
} from "redux/features/finance/primarydata/cashaccountApiSlice";
import { CashAccountData } from "redux/types/Finance/PrimaryData/cashaccount";
import { useGetAllAccountsQuery } from "redux/features/finance/primarydata/accountApiSlice";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { hasPermission } from "helper/utility";
export default function CashAccounts() {
  const [rowData, setRowData] = useState<CashAccountData[]>([]);
  const [addCashAccount, { isLoading: AddLoading }] =
    useAddCashAccountMutation();

  const { isLoading, data } = useGetCashAccountQuery(null);
  const { data: accountData } = useGetAllAccountsQuery(null);

  const columns: column<"cashAccountId", CashAccountData>[] = [
    {
      label: "Cash Account Title",
      field: "accountId",
      inputType: "select",
      options: accountData?.length
        ? accountData.map((item) => {
            return {
              text: item?.accountTitle ? item.accountTitle : "",
              value: item?.accountId ? item?.accountId : 0,
            };
          })
        : [],
    },
  ];
  const onSubmit = () => {
    var rowDataa = rowData.map(({ accountId, cashAccountId }) => ({
      accountId,
      cashAccountId,
    }));

    var rowDat: {}[] = rowDataa.map((obj) => {
      return {
        cashAccountId: obj?.cashAccountId,
        account: { accountId: obj?.accountId },
      };
    });

    addCashAccount({ rowDat });
  };

  useEffect(() => {
    if (data) {
      setRowData(
        data.map((item) => {
          return {
            cashAccountTitle: item?.account ? item?.account?.accountTitle : "-",
            cashAccountId: item?.cashAccountId ? item?.cashAccountId : 0,
            accountId: item?.account?.accountId ? item?.account?.accountId : 0,
            accountTitle: item?.account ? item?.account?.accountTitle : "-",
          };
        })
      );
    }
  }, [data]);
  

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <PrimaryDataSideNav type={4} />
          {(hasPermission("fin_pd_100") ||
            hasPermission("fin_pd_101") ||
            hasPermission("fin_pd_102") ||
            hasPermission("fin_pd_103")) && (
              <div className="table-container">
                <EditableDataTable
                  identifier="cashAccountId"
                  columns={columns}
                  rows={rowData}
                  setRows={setRowData}
                  isLoading={isLoading}
                  submitLoading={AddLoading}
                  onSubmit={onSubmit}
                />
              </div>
            )}
        </div>
      </div>
    </>
  );
}
