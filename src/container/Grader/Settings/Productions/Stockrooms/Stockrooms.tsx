import { useState, useEffect } from "react";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import {
  useAddStockRoomsMutation,
  useGetStockRoomsQuery,
} from "redux/features/Settings/Productions/stockroomsApiSlice";
import ProductionSideNav from "components/Settings/Productions/ProductionSidenav";
import {
  StockroomRequest,
  StockroomsData,
} from "redux/types/Settings/Productions/Stockroom";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";
export default function Stockrooms() {
  const [addStockRooms, { isLoading: AddLoading }] = useAddStockRoomsMutation();
  const { isLoading, data } = useGetStockRoomsQuery(null);
  const [rowData, setRowData] = useState<StockroomRequest[]>([]);

  const columns: column<"stockRoomId", StockroomRequest>[] = [
    {
      label: "Stockroom Name",
      field: "name",
      inputType: "text",
      sort: false,
    },
  ];

  const onSubmit = () => {
    addStockRooms(rowData);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setRowData(
        data?.map((item: StockroomsData) => {
          return {
            name: item?.name ? item?.name : "",
            stockRoomId: item?.stockRoomId ? item?.stockRoomId : 0,
          };
        })
      );
    }
  }, [data]);

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <ProductionSideNav type={4} />
          <div className="table-container">
            <EditableDataTable
              identifier="stockRoomId"
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
