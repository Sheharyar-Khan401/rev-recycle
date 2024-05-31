import { useState, useEffect } from "react";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import ProductionSideNav from "components/Settings/Productions/ProductionSidenav";
import {
  useAddFloorsMutation,
  useGetFloorsQuery,
} from "redux/features/Settings/Productions/floorApiSlice";
import { FloorsRequest } from "redux/types/Settings/Productions/floor";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";
import { Floors } from "redux/types/common/floor";

export default function Floor() {
  const [addFloors, { isLoading: AddLoading }] = useAddFloorsMutation();
  const { isLoading, data } = useGetFloorsQuery(null);
  const [rowData, setRowData] = useState<FloorsRequest[]>([]);
  const columns: column<"floorId", FloorsRequest>[] = [
    {
      label: "Floor Name",
      field: "name",
      inputType: "text",
      sort: false,
    },
  ];
  const onSubmit = () => {
    addFloors(rowData);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setRowData(
        data?.map((item: Floors) => {
          return {
            name: item?.name ? item?.name : "",
            floorId: item?.floorId ? item?.floorId : 0,
          };
        })
      );
    }
  }, [data]);
  return (
    <>
      <div>
        <div className="d-lg-flex">
          <ProductionSideNav type={5} />
          <div className="table-container">
            <EditableDataTable
              identifier="floorId"
              columns={columns}
              showSerialNumbers
              rows={rowData}
              setRows={setRowData}
              isLoading={isLoading}
              onSubmit={onSubmit}
              submitLoading={AddLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
