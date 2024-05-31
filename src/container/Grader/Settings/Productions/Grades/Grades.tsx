import { useState, useEffect } from "react";
import EditableDataTable from "shared/Components/EditableDatatable/EditableDatatable";
import ProductionSideNav from "components/Settings/Productions/ProductionSidenav";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";
import {
  useAddGradeMutation,
  useGetGradesQuery,
} from "redux/features/common/gradeApiSlice";
import { GradeRequest } from "redux/types/Settings/Productions/grade";
import { Grade } from "redux/types/common/grade";

export default function Grades() {
  const [addGrade, { isLoading: AddLoading }] = useAddGradeMutation();
  const { isLoading, data } = useGetGradesQuery(null);
  const [rowData, setRowData] = useState<GradeRequest[]>([]);
  const columns: column<"gradeId", GradeRequest>[] = [
    {
      label: "Name",
      field: "name",
      inputType: "text",
      sort: false,
    },
  ];
  const onSubmit = () => {
    addGrade(rowData);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setRowData(
        data?.map((item: Grade) => {
          return {
            name: item?.name ? item?.name : "",
            gradeId: item?.gradeId ? item?.gradeId : 0,
          };
        })
      );
    }
  }, [data]);

  return (
    <>
      <div>
        <div className="d-lg-flex">
          <ProductionSideNav type={12} />
          <div className="table-container">
            <EditableDataTable
              identifier="gradeId"
              columns={columns}
              showSerialNumbers
              rows={rowData}
              onSubmit={onSubmit}
              setRows={setRowData}
              submitLoading={AddLoading}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
