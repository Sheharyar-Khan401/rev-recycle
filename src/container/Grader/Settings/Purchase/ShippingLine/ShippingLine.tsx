import { useState, useEffect } from "react";
import SetupSideNav from "components/Settings/Purchase/PurchaseSidenav";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";
import {
  ShippingLineData,
  ShippingLineRequest,
} from "redux/types/Settings/Purchase/shippingLine";
import {
  useAddShippingLineMutation,
  useGetShippingLineQuery,
} from "redux/features/Settings/purchase/shippingLineApiSlice";

export default function ShippingLine() {
  const [rowData, setRowData] = useState<ShippingLineRequest[]>([]);
  const [addShippingLine, { isLoading: AddLoading }] =
    useAddShippingLineMutation();
  const { isLoading, data } = useGetShippingLineQuery(null);
  const columns: column<"shippingLineId", ShippingLineRequest>[] = [
    {
      label: "Name",
      field: "name",
      inputType: "text",
      sort: false,
    },
  ];

  const onSubmit = () => {
    addShippingLine(rowData);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setRowData(
        data.map((item: ShippingLineData) => {
          return {
            name: item?.name ? item?.name : "",
            shippingLineId: item?.shippingLineId ? item?.shippingLineId : 0,
          };
        })
      );
    }
  }, [data]);

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <SetupSideNav type={10} />
          <div className="table-container">
            <EditableDataTable
              identifier="shippingLineId"
              columns={columns}
              showSerialNumbers
              rows={rowData}
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
