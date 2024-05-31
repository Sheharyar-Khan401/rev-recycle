import { useState, useEffect } from "react";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import {
  useAddBeltsMutation,
  useGetBeltsQuery,
} from "redux/features/Settings/Productions/beltsApiSlice";
import ProductionSideNav from "components/Settings/Productions/ProductionSidenav";
import {
  Belt,
  BeltRequest,
} from "redux/types/Settings/Productions/belt";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";

export default function Belts() {
  const [addBelts, { isLoading: AddLoading }] = useAddBeltsMutation();
  const { isLoading, data } = useGetBeltsQuery(null);
  const [rowData, setRowData] = useState<BeltRequest[]>([]);
  const columns: column<"beltId", BeltRequest>[] = [
    {
      label: "Belt Name",
      field: "name",
      inputType: "text",
      sort: false,
    },
  ];
  const onSubmit = () => {
    addBelts(rowData);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setRowData(
        data?.map((item: Belt) => {
          return {
            name: item?.name ? item?.name : "",
            beltId: item?.beltId ? item?.beltId : 0,
          };
        })
      );
    }
  }, [data]);

  return (
    <div className="d-lg-flex">
      <ProductionSideNav type={3} />
      <div className="table-container">
        <EditableDataTable
          identifier="beltId"
          columns={columns}
          showSerialNumbers
          rows={rowData}
          setRows={setRowData}
          onSubmit={onSubmit}
          isLoading={isLoading}
          submitLoading={AddLoading}
        />
      </div>
    </div>
  );
}
