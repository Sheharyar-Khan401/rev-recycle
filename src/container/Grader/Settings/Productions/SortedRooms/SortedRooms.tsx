import { useState, useEffect } from "react";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import {
  useAddSortedRoomsMutation,
  useGetSortedRoomsQuery,
} from "redux/features/Settings/Productions/sortedroomsApiSlice";
import {
  SortedRoomRequest,
  SortedRoomsData,
} from "redux/types/Settings/Productions/sortedroom";
import ProductionSideNav from "components/Settings/Productions/ProductionSidenav";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";

export default function SortedRooms() {
  const [addSortedRooms, { isLoading: AddLoading }] =
    useAddSortedRoomsMutation();
  const { isLoading, data } = useGetSortedRoomsQuery(null);
  const [rowData, setRowData] = useState<SortedRoomRequest[]>([]);

  const columns: column<"sortedRoomId", SortedRoomRequest>[] = [
    {
      label: "Sorted Room Name",
      field: "name",
      inputType: "text",
      sort: false,
    },
  ];
  const onSubmit = () => {
    addSortedRooms(rowData);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setRowData(
        data?.map((item: SortedRoomsData) => {
          return {
            name: item?.name,
            sortedRoomId: item?.sortedRoomId,
          };
        })
      );
    }
  }, [data]);

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <ProductionSideNav type={6} />
          <div className="table-container">
            <EditableDataTable
              identifier="sortedRoomId"
              columns={columns}
              showSerialNumbers
              rows={rowData}
              setRows={setRowData}
              onSubmit={onSubmit}
              submitLoading={AddLoading}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
