import SetupSideNav from "components/Settings/Purchase/PurchaseSidenav";
import { useEffect, useState } from "react";
import {
  useAddChargeTypeMutation,
  useGetChargeTypeQuery,
} from "redux/features/Settings/purchase/chargetypeApiSlice";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import { ChargeTypeRequests } from "redux/types/Settings/Purchase/chargetype";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";

export default function ChargeTypes() {
  const [addChargeType, { isLoading: AddLoading }] = useAddChargeTypeMutation();
  const { isLoading, data } = useGetChargeTypeQuery(null);
  const [rowData, setRowData] = useState<ChargeTypeRequests[]>([]);

  const columns: column<"chargeTypeId", ChargeTypeRequests>[] = [
    {
      label: "Charge Name",
      field: "name",
      inputType: "text",
      sort: false,
    },
  ];

  const onSubmit = () => {
    addChargeType(rowData);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setRowData(
        data.map((item) => {
          return {
            name: item?.name ? item?.name : "",
            chargeTypeId: item?.chargeTypeId ? item?.chargeTypeId : 0,
          };
        })
      );
    }
  }, [data]);
  return (
    <>
      <div>
        <div className="d-lg-flex">
          <SetupSideNav type={8} />
          <div className="table-container">
            <EditableDataTable
              identifier="chargeTypeId"
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
