import { useState, useEffect } from "react";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import {
  useAddStationsMutation,
  useGetStationsQuery,
} from "redux/features/Settings/Productions/stationsApiSlice";
import {
  StationsData,
  StationsRequest,
} from "redux/types/Settings/Productions/station";
import ProductionSideNav from "components/Settings/Productions/ProductionSidenav";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";

export default function Stations() {
  const [addStations, { isLoading: AddLoading }] = useAddStationsMutation();
  const { isLoading, data } = useGetStationsQuery(null);
  const [rowData, setRowData] = useState<StationsRequest[]>([]);

  const columns: column<"stationId", StationsRequest>[] = [
    {
      label: "Station Name",
      field: "name",
      inputType: "text",
      sort: false,
    },
  ];

  const onSubmit = () => {
    addStations(rowData);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setRowData(
        data?.map((item: StationsData) => {
          return {
            name: item?.name,
            stationId: item?.stationId,
          };
        })
      );
    }
  }, [data]);

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <ProductionSideNav type={9} />
          <div className="table-container">
            <EditableDataTable
              identifier="stationId"
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
