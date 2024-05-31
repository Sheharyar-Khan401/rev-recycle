import SetupSideNav from "components/Settings/Purchase/PurchaseSidenav";
import { useEffect, useState } from "react";
import {
  useGetPortsQuery,
  useAddPortMutation,
} from "redux/features/Settings/purchase/portApiSlice";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import { Port, PortRequest } from "redux/types/Settings/Purchase/port";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";

export default function Ports() {
  const [addPort, { isLoading: AddLoading }] = useAddPortMutation();
  const [rowData, setRowData] = useState<PortRequest[]>([]);
  const { isLoading, data } = useGetPortsQuery(null);
  const columns: column<"portId", PortRequest>[] = [
    {
      label: "Port Name",
      field: "name",
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
    addPort(rowData);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setRowData(
        data.map((item: Port) => {
          return {
            name: item?.name ? item?.name : "",
            portId: item?.portId ? item?.portId : 0,
            displayOrder: item?.displayOrder ? item?.displayOrder : 0,
          };
        })
      );
    }
  }, [data]);
  return (
    <>
      <div>
        <div className="d-lg-flex">
          <SetupSideNav type={6} />
          <div className="table-container">
            <EditableDataTable
              identifier="portId"
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
