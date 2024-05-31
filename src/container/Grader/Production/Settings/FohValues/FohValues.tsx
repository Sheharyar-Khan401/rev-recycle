import ProductionSettingsSideNav from "components/Production/Settings/ProductionSettingsSideNav";
import { useGetAllAccountsQuery } from "redux/features/finance/primarydata/accountApiSlice";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { Account } from "redux/types/Finance/PrimaryData/account";
import {
  ProductionFOHValues,
  ProductionFOHValuesRequest,
} from "redux/types/Productions/Settings";
import { useEffect, useState } from "react";
import {
  useAddProductionFOHValuesMutation,
  useGetProductionFOHValuesQuery,
} from "redux/features/productions/Settings/fohValuesApiSlice";
import { getDateFromMillis, hasPermission } from "helper/utility";

export default function FohValues() {
  const [rowData, setRowData] = useState<ProductionFOHValuesRequest[]>([]);
  const { data: accountsData } = useGetAllAccountsQuery(null);
  const { data: productionData, isLoading } =
    useGetProductionFOHValuesQuery(null);
  const [addFohValue, { isLoading: AddLoading }] =
    useAddProductionFOHValuesMutation();

  const columns: column<"fohValueId", ProductionFOHValuesRequest>[] = [
    {
      label: "Date",
      field: "fohDate",
      inputType: "date",
      sort: false,
    },
    {
      label: "FOH",
      field: "fohValue",
      inputType: "text",
      sort: false,
    },
    {
      label: "Account",
      field: "accountId",
      sort: false,
      inputType: "select",
      options: accountsData?.length
        ? accountsData?.map((item: Account) => {
            return {
              text: item?.accountTitle ? item?.accountTitle : "",
              value: item?.accountId ? item?.accountId : 0,
            };
          })
        : [],
    },
  ];
  const onSubmit = () => {
    addFohValue(rowData);
  };
  useEffect(() => {
    if (productionData?.payLoad && productionData?.payLoad?.length > 0) {
      setRowData(
        productionData?.payLoad?.map((item: ProductionFOHValues) => {
          return {
            fohValueId: item?.fohValueId ? item?.fohValueId : 0,
            accountId: item?.account?.accountId ? item?.account?.accountId : 0,
            fohValue: item?.fohValue ? item?.fohValue : 0,
            fohDate: item?.fohDate ? getDateFromMillis(item?.fohDate) : "",
          };
        })
      );
    }
  }, [productionData]);
  return (
    <>
      <div className="d-lg-flex">
        <ProductionSettingsSideNav type={1} />
        {(hasPermission("pro_set_100") || hasPermission("pro_set_101") || hasPermission("pro_set_102") || hasPermission("pro_set_103")) &&
        <div className="table-container">
          <EditableDataTable
            identifier="fohValueId"
            columns={columns}
            rows={rowData}
            showSerialNumbers
            setRows={setRowData}
            submitLoading={AddLoading}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </div>
}
      </div>
    </>
  );
}
