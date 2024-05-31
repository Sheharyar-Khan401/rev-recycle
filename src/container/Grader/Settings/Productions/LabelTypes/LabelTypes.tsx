import { useState, useEffect } from "react";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import {
  useAddLabelTypesMutation,
  useGetLabelTypesQuery,
} from "redux/features/Settings/Productions/labeltypesApiSlice";

import {
  LabelTypesData,
  LabelTypesRequest,
} from "redux/types/Settings/Productions/labeltype";
import ProductionSideNav from "components/Settings/Productions/ProductionSidenav";
import { useGetAllDepartmentQuery } from "redux/features/Settings/Department/departmentApiSlice";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";
import { useGetStockRoomsQuery } from "redux/features/Settings/Productions/stockroomsApiSlice";
import { Department } from "redux/types/Settings/Productions/department";

export default function LabelTypes() {
  const [addLabelTypes, { isLoading: AddLoading }] = useAddLabelTypesMutation();
  const { isLoading, data } = useGetLabelTypesQuery(null);
  const { data: departmentData } = useGetAllDepartmentQuery(null);
  const { data: stockroomData } = useGetStockRoomsQuery(null);
  const [rowData, setRowData] = useState<LabelTypesRequest[]>([]);

  const columns: column<"labelTypeId", LabelTypesRequest>[] = [
    {
      label: "Name",
      field: "name",
      inputType: "text",
      sort: false,
    },
    {
      label: "Production Graph",
      field: "productionGraph",
      inputType: "checkbox",
      sort: false,
    },
    {
      label: "Sale Invoice Graph",
      field: "saleInvoiceGraph",
      inputType: "checkbox",
      sort: false,
    },
    {
      label: "Department",
      field: "departmentId",
      sort: false,
      inputType: "select",
      options: departmentData?.length
        ? departmentData?.map((item: Department) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.departmentId ? item?.departmentId : 0,
            };
          })
        : [],
    },
    {
      label: "Display Order",
      field: "displayOrder",
      sort: false,
      inputType: "number",
    },
    {
      label: "Stockroom",
      field: "stockRoomId",
      sort: false,
      inputType: "select",
      options: stockroomData?.length
        ? stockroomData?.map((item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.stockRoomId ? item?.stockRoomId : 0,
            };
          })
        : [],
    },
  ];
  const onSubmit = () => {
    addLabelTypes(rowData);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setRowData(
        data?.map((item: LabelTypesData) => {
          return {
            name: item?.name ? item?.name : "-",
            labelTypeId: item?.labelTypeId ? item?.labelTypeId : 0,
            displayOrder: item?.displayOrder,
            deptName: item?.department ? item?.department?.name : "-",
            departmentId: item?.departmentId,
            productionGraph: item?.productionGraph,
            saleInvoiceGraph: item?.saleInvoiceGraph,
            stockRoomId: item?.stockRoom ? item?.stockRoom?.stockRoomId : 0,
          };
        })
      );
    }
  }, [data, departmentData]);

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <ProductionSideNav type={8} />
          <div className="table-container">
            <EditableDataTable
              identifier="labelTypeId"
              columns={columns}
              rows={rowData}
              showSerialNumbers
              setRows={setRowData}
              submitLoading={AddLoading}
              isLoading={isLoading}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
