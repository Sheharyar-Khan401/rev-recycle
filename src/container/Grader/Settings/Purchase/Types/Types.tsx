import SetupSideNav from "components/Settings/Purchase/PurchaseSidenav";
import { useEffect, useState } from "react";
import {
  useAddInvoiceTypeMutation,
  useGetInvoiceTypesQuery,
} from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import { InvoiceTypeRequest } from "redux/types/Settings/Purchase/invoicetype";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";

export default function Types() {
  const [addInvoiceType, { isLoading: AddLoading }] =
    useAddInvoiceTypeMutation();
  const { isLoading, data } = useGetInvoiceTypesQuery(null);
  const [rowData, setRowData] = useState<InvoiceTypeRequest[]>([]);
  const columns: column<"invoiceTypeId", InvoiceTypeRequest>[] = [
    {
      label: "Invoice Name",
      field: "name",
      inputType: "text",
      sort: false,
    },
  ];

  const onSubmit = () => {
    addInvoiceType(rowData);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setRowData(
        data?.map((item) => {
          return {
            name: item?.name ? item?.name : "-",
            invoiceTypeId: item?.invoiceTypeId ? item?.invoiceTypeId : 0,
          };
        })
      );
    }
  }, [data]);
  return (
    <>
      <div>
        <div className="d-lg-flex">
          <SetupSideNav type={5} />
          <div className="table-container">
            <EditableDataTable
              identifier="invoiceTypeId"
              rows={rowData}
              columns={columns}
              setRows={setRowData}
              isLoading={isLoading}
              submitLoading={AddLoading}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
