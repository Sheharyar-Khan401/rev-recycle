import { useEffect, useRef, useState } from "react";
import { globalVariables } from "helper/globalVariables";
import { ListofvoucherAccount } from "redux/types/Invoices/Invoices";
import Filters from "shared/Components/Filters";
import DataTable from "shared/Components/DataTable";
import { useParams } from "react-router-dom";
import { useLazyGetFinancialEntriesByGatePassIdQuery } from "redux/features/purchase/gatePassesApiSlice";
export default function GatePassesFiancialEnteries() {
  const params = useParams();
  const ref = useRef<HTMLInputElement | null>(null);

  const [getData, result] = useLazyGetFinancialEntriesByGatePassIdQuery();
  const [feList, setFeList] = useState<ListofvoucherAccount[]>([]);
  const [queryParams, setQueryParams] = useState({
    invoiceId: params?.id,
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
  });

  useEffect(() => {
    if (result?.data) {
      setFeList(result?.data?.payLoad?.listofvoucherAcc ?? []);
    }
  }, [result?.data]);

  useEffect(() => {
    getData(queryParams);
  }, [queryParams, getData]);

  return (
    <>
      <div className="table-container">
        <Filters
          componentRef={ref}
          printAble={feList?.length > 0}
          exportAble={feList?.length > 0}
        />
        <DataTable
          ref={ref}
          tableTitle="Gate Pass Financial Enteries"
          isLoading={result.isFetching}
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
            { label: "Txn Id", field: "id" },
            { label: "Report Group", field: "rp" },
            { label: "Account Title", field: "accTitle" },
            { label: "Txn Type", field: "txnType" },
            { label: "Debit", field: "debit" },
            { label: "Credit", field: "credit" },
            { label: "Narration", field: "narration" },
          ]}
          rows={
            feList?.length > 0
              ? feList?.map((item: ListofvoucherAccount) => {
                  return {
                    id: item?.voucherAccountId ? item?.voucherAccountId : "-",
                    rp: "-",
                    accTitle: item?.vochrAccTitle ? item?.vochrAccTitle : "-",
                    txnType: item?.credit ? "Credit" : "Debit",
                    debit: item?.debit ? item?.debit : 0,
                    credit: item?.credit ? item?.credit : 0,
                    narration: item?.narration ? item?.narration : "-",
                  };
                })
              : []
          }
        />
      </div>
    </>
  );
}
