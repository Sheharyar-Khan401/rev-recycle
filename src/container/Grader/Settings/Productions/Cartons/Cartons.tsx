import { useState, useEffect } from "react";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import {
  useAddCartonsMutation,
  useGetCartonsQuery,
} from "redux/features/Settings/Productions/cartonsApiSlice";
import {
  CartonTableRequest,
  CartonsData,
} from "redux/types/Settings/Productions/carton";
import ProductionSideNav from "components/Settings/Productions/ProductionSidenav";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";

export default function Cartons() {
  const [addCartons, { isLoading: AddLoading }] = useAddCartonsMutation();
  const { isLoading, data } = useGetCartonsQuery(null);
  const [rowData, setRowData] = useState<CartonTableRequest[]>([]);

  const columns: column<"cartonId", CartonTableRequest>[] = [
    {
      label: "Carton Name",
      field: "name",
      inputType: "text",
      sort: false,
    },
  ];
  const onSubmit = () => {
    addCartons(rowData);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setRowData(
        data?.map((item: CartonsData) => {
          return {
            name: item?.name,
            cartonId: item?.cartonId,
          };
        })
      );
    }
  }, [data]);

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <ProductionSideNav type={10} />
          <div className="table-container">
            <EditableDataTable
              identifier="cartonId"
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
      </div>
    </>
  );
}
