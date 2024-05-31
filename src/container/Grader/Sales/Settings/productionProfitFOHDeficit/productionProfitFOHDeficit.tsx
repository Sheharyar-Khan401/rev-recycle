import { useState, useEffect } from "react";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";
import SettingDataSideNav from "components/Sales/settingDataSideNav";
import {
  useAddSurplusMutation,
  useGetSurplusQuery,
} from "redux/features/sales/Settings/surplusApiSlice";
import { useGetAllAccountsQuery } from "redux/features/finance/primarydata/accountApiSlice";
import {
  SurplusData,
  SurplusRequest,
} from "redux/types/Sales/setting/surplus";
import { Account } from "redux/types/Finance/PrimaryData/account";
import { hasPermission } from "helper/utility";

export default function ProductionProfitFOHDeficit() {
  const [addSurplus, { isLoading: AddLoading }] = useAddSurplusMutation();
  const { isLoading, data } = useGetAllAccountsQuery(null);
  const { isLoading: dataLoading, data: SurplusData } =
    useGetSurplusQuery(null);
  const [rowData, setRowData] = useState<SurplusRequest[]>([]);

  const columns: column<"surplusAccountId", SurplusRequest>[] = [
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
    addSurplus(rowData);
  };

  useEffect(() => {
    if (SurplusData && SurplusData?.length > 0) {
      setRowData(
        SurplusData?.map((item: SurplusData) => {
          return {
            accountId: item?.account?.accountId ? item?.account?.accountId : 0,
            surplusAccountId: item?.surplusAccountId
              ? item?.surplusAccountId
              : 0,
          };
        })
      );
    }
  }, [SurplusData]);

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <SettingDataSideNav type={2} />
          {(hasPermission("sal_set_100") ||
            hasPermission("sal_set_101") ||
            hasPermission("sal_set_102") ||
            hasPermission("sal_set_103")) && (
            <div className="table-container">
              <EditableDataTable
                identifier="surplusAccountId"
                columns={columns}
                rows={rowData}
                showSerialNumbers
                setRows={setRowData}
                onSubmit={onSubmit}
                submitLoading={AddLoading}
                isLoading={isLoading || dataLoading}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
