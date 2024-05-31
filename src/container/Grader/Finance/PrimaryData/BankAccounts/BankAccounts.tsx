import PrimaryDataSideNav from "components/Finance/PrimaryDataSidenav";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import {
  useDeletebankAccountMutation,
  useLazyGetbankAccountsQuery,
} from "redux/features/finance/primarydata/bankAccountApiSlice";
import { BankAccount } from "redux/types/Finance/PrimaryData/bankAccount";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import Filters from "shared/Components/Filters";
import { hasPermission } from "helper/utility";

export default function Accounts() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);

  const [getBankAccounts, result] = useLazyGetbankAccountsQuery();
  const [deletebankAccount] = useDeletebankAccountMutation();

  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
  });
  const bankAccountsList = result?.data?.payLoad;
  const handleDelete = (id: number) => {
    if (id) {
      deletebankAccount(id);
    }
  };

  useEffect(() => {
    hasPermission("fin_pd_103") && getBankAccounts(queryParams);
  }, [queryParams, getBankAccounts]);
  return (
    <div className="d-lg-flex">
      <PrimaryDataSideNav type={5} />
      <div className="table-container">
        <Filters
          componentRef={ref}
          addRedirectPath={
            hasPermission("fin_pd_100")
              ? "/grader/finance/primarydata/bankaccounts/add"
              : ""
          }
          printAble={
            (bankAccountsList && bankAccountsList?.length > 0) ?? false
          }
          exportAble={
            (bankAccountsList && bankAccountsList?.length > 0) ?? false
          }
        />
        {hasPermission("fin_pd_103") && (
          <DataTable
            ref={ref}
            tableTitle="Bank Accounts"
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
              { label: "Bank Account Code", field: "bankAccountCode" },
              { label: "Bank Account Title", field: "bankAccountTitle" },
              { label: "Bank Name", field: "bankName" },
              { label: "Branch Name", field: "nameOfBranch" },
              { label: "Bank IBAN Number", field: "bankIbanNumber" },
              { label: "Phone Number", field: "phoneNumber" },
              {
                label: "PDC Account Payable Title",
                field: "accountPayableTitle",
              },
              {
                label: "PDC Account Receiveable Title",
                field: "accountReceiveableTitle",
              },
              { label: "Action", field: "action" },
            ]}
            rows={
              bankAccountsList && bankAccountsList?.length > 0
                ? bankAccountsList?.map((item: BankAccount) => {
                    return {
                      bankAccountCode: item?.bankAccountCode
                        ? item?.bankAccountCode
                        : "-",
                      bankAccountTitle: item?.bankAccountTitle
                        ? item?.bankAccountTitle
                        : "-",
                      nameOfBranch: item?.nameOfBranch
                        ? item?.nameOfBranch
                        : "-",
                      bankName: item?.bankName ? item?.bankName : "-",
                      accountPayableTitle: item?.payableAccount
                        ? item?.payableAccount?.accountTitle
                        : "-",
                      accountReceiveableTitle: item?.receivableAccount
                        ? item?.receivableAccount?.accountTitle
                        : "-",
                      bankIbanNumber: item?.bankIbanNumber
                        ? item?.bankIbanNumber
                        : "-",
                      phoneNumber: item?.phoneNumber ? item?.phoneNumber : "-",
                      faxNumber: item?.faxNumber ? item?.faxNumber : "-",
                      address: item?.address ? item?.address : "-",
                      emailAddress: item?.emailAddress
                        ? item?.emailAddress
                        : "-",
                      action: (
                        <RoutingActionButton
                          onNavigate={
                            hasPermission("fin_pd_101")
                              ? () =>
                                  navigate(
                                    "/grader/finance/primarydata/bankaccounts/edit/" +
                                      item?.bankAccountId
                                  )
                              : undefined
                          }
                          onDeleteClick={
                            hasPermission("fin_pd_102")
                              ? () => {
                                  handleDelete(item?.bankAccountId ?? 0);
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
