import PrimaryDataSideNav from "components/Finance/PrimaryDataSidenav";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import {
  useDeleteAccountMutation,
  useLazyGetAccountsQuery,
} from "redux/features/finance/primarydata/accountApiSlice";
import { Account } from "redux/types/Finance/PrimaryData/account";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import Filters from "shared/Components/Filters";
import { hasPermission } from "helper/utility";
import { useGetAccountTypeQuery } from "redux/features/finance/primarydata/accountTypeApiSlice";

export default function Accounts() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const { data: AccountData } = useGetAccountTypeQuery(null);
  const [getAccounts, result] = useLazyGetAccountsQuery();
  const [deleteAccount] = useDeleteAccountMutation();
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
  });
  const accountsList = result?.data?.payLoad;

  const handleDelete = (id: number) => {
    if (id) {
      deleteAccount(id);
    }
  };

  useEffect(() => {
    hasPermission("fin_pd_103") && getAccounts(queryParams);
  }, [queryParams, getAccounts]);
  return (
    <div className="d-lg-flex">
      <PrimaryDataSideNav type={3} />
      <div className="table-container">
        <Filters
          printAble={(accountsList && accountsList?.length > 0) ?? false}
          exportAble={(accountsList && accountsList?.length > 0) ?? false}
          componentRef={ref}
          addRedirectPath={
            hasPermission("fin_pd_100")
              ? "/grader/finance/primarydata/accounts/add"
              : ""
          }
          filters={[
            {
              label: "Account",
              name: "accountType",
              inputType: "select",
              options: AccountData
                ? AccountData?.map((item) => {
                    return {
                      text: item?.name ? item?.name : "",
                      value: item?.accountTypeId ? item?.accountTypeId : 0,
                    };
                  })
                : [],
            },
            {
              label: "Account Title",
              name: "accountTitle",
              inputType: "text",
            },
          ]}
          onSubmit={(query) => {
            if (Object.keys(query).length === 0) {
              setQueryParams({
                pageNumber: queryParams.pageNumber,
                pageSize: queryParams.pageSize,
              });
            } else setQueryParams({ ...queryParams, ...query });
          }}
        />
        {hasPermission("fin_pd_103") && (
          <DataTable
            ref={ref}
            tableTitle="Accounts"
            isLoading={result?.isFetching}
            totalItems={
              result?.data?.numberOfItems ? result?.data?.numberOfItems : 0
            }
            setOffset={(offset, limit) => {
              setQueryParams({
                ...queryParams,
                pageNumber: offset,
                pageSize: limit ? limit : globalVariables.ItemsPerPageLimit,
              });
            }}
            columns={[
              { label: "Account code", field: "accountCode" },
              { label: "Name", field: "accountTitle" },
              { label: "Currency", field: "currency" },
              { label: "Level", field: "accountLevel" },
              { label: "account type", field: "accountType" },
              { label: "Report Group", field: "reportGroup" },
              { label: "Control Account Ref", field: "controlAccountRef" },
              { label: "Group", field: "group" },
              { label: "Total Txns", field: "totalTxns" },
              { label: "Action", field: "action" },
            ]}
            rows={
              accountsList && accountsList?.length > 0
                ? accountsList?.map((item: Account) => {
                    return {
                      accountCode: item?.accountCode ? item?.accountCode : "-",
                      accountTitle: item?.accountTitle
                        ? item?.accountTitle
                        : "-",
                      accountLevel: item?.accountLevel
                        ? item?.accountLevel
                        : "-",
                      accountType: item?.accountType
                        ? item?.accountType.name
                        : "-",
                      currency: item?.currency?.currency
                        ? item?.currency?.currency?.name
                        : "-",
                      reportGroup: item?.reportGroup?.name
                        ? item?.reportGroup?.name
                        : "-",
                      controlAccountRef: "None",
                      group: item?.group?.name ? item?.group?.name : "-",
                      totalTxns: item?.totalTxns ? item?.totalTxns : 0,

                      action: (
                        <RoutingActionButton
                          onNavigate={
                            hasPermission("fin_pd_101")
                              ? () =>
                                  navigate(
                                    "/grader/finance/primarydata/accounts/edit/" +
                                      item?.accountId
                                  )
                              : undefined
                          }
                          onDeleteClick={
                            hasPermission("fin_pd_102")
                              ? () => {
                                  handleDelete(item.accountId);
                                }
                              : undefined
                          }
                        />
                      ),
                    };
                  })
                : []
            }
          />
        )}
      </div>
    </div>
  );
}
