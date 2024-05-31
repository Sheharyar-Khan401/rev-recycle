import { useEffect, useState } from "react";
import FinanceSideNav from "components/Settings/Finance/FinanceSideNav";
import {
  BusinessCurrency,
  CurrencyRequest,
} from "redux/types/Settings/Finance/currency";
import {
  useAddBusinessCurrencyMutation,
  useGetBusinessCurrrencyQuery,
  useGetCurrrencyQuery,
} from "redux/features/currency/currencyApiSlice";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";

export default function Currency() {
  const { isLoading, data: getCurrency } = useGetCurrrencyQuery(null);
  const [rowData, setRowData] = useState<CurrencyRequest[]>([]);
  const { data: getBusinessCurrency } = useGetBusinessCurrrencyQuery(null);
  const [addBusinessCurrency, { isLoading: AddLoading }] =
    useAddBusinessCurrencyMutation();

  const columns: column<"businesscurrencyId", CurrencyRequest>[] = [
    {
      label: "Currency Name",
      field: "currencyId",
      inputType: "select",
      options: getCurrency?.length
        ? getCurrency.map((item) => {
            return {
              text: item?.name ? item?.name : "-",
              value: item?.currencyId ? item?.currencyId : 0,
            };
          })
        : [],
    },
    {
      label: "Lock",
      field: "locked",
      inputType: "checkbox"
      
    },
  ];

  const onSubmit = () => {
    addBusinessCurrency(rowData);
  };

  useEffect(() => {
    if (getBusinessCurrency && getBusinessCurrency?.length > 0) {
      setRowData(
        getBusinessCurrency.map((item: BusinessCurrency) => {
          return {
            name: item?.currency?.name ? item?.currency?.name : "",
            currencyId: item.currencyId ? item.currencyId : 0,
            businesscurrencyId: item.businesscurrencyId
              ? item.businesscurrencyId
              : 0,
              locked : item?.locked ? item?.locked : false
          };
        })
      );
    }
  }, [getBusinessCurrency]);

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <FinanceSideNav type={1} />
          <div className="table-container">
            <EditableDataTable
              identifier="businesscurrencyId"
              columns={columns}
              submitLoading={AddLoading}
              rows={rowData}
              setRows={setRowData}
              isLoading={isLoading}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
