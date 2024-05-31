import { useState, useEffect } from "react";
import SetupSideNav from "components/Settings/Purchase/PurchaseSidenav";
import {
  useGetLocationQuery,
  useAddLocationMutation,
} from "redux/features/Settings/purchase/locationApiSlice";
import {
  Location,
  LocationRequest,
} from "redux/types/Settings/Purchase/location";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";

export default function Locations() {
  const [rowData, setRowData] = useState<LocationRequest[]>([]);
  const [addLocation, { isLoading: AddLoading }] = useAddLocationMutation();
  const { isLoading, data } = useGetLocationQuery(null);
  const columns: column<"locationId", LocationRequest>[] = [
    {
      label: "Location Name",
      field: "name",
      inputType: "text",
      sort: false,
    },
    {
      label: "Short Name",
      field: "shortName",
      inputType: "text",
      sort: false,
    },
    {
      label: "Display Order",
      field: "displayOrder",
      inputType: "text",
      sort: false,
    },
  ];

  const onSubmit = () => {
    addLocation(rowData);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setRowData(
        data.map((item: Location) => {
          return {
            name: item?.name ? item?.name : "",
            locationId: item?.locationId,
            shortName: item?.shortName,
            displayOrder: item?.displayOrder,
          };
        })
      );
    }
  }, [data]);

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <SetupSideNav type={7} />
          <div className="table-container">
            <EditableDataTable
              identifier="locationId"
              columns={columns}
              rows={rowData}
              showSerialNumbers
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
