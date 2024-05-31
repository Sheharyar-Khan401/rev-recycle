import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import DataTable from "shared/Components/DataTable";
import ProductionSideNav from "components/Settings/Productions/ProductionSidenav";
import {
  useDeleteDepartmentMutation,
  useLazyGetDepartmentsQuery,
} from "redux/features/Settings/Department/departmentApiSlice";
import { Department } from "redux/types/Settings/Productions/department";

export default function DepartmentsListing() {
  const navigate = useNavigate();
  const [deleteDept] = useDeleteDepartmentMutation();
  const [getDepts, result] = useLazyGetDepartmentsQuery();
  const [deptsList, setDeptsList] = useState<Department[]>([]);

  const handleDelete = (id: number) => {
    if (id) {
      deleteDept(id);
    }
  };

  useEffect(() => {
    if (result?.data) {
      setDeptsList(result?.data?.payLoad);
    }
  }, [result?.data]);

  useEffect(() => {
    getDepts({});
  }, [getDepts]);
  
  return (
    <>
      <div className="d-lg-flex">
        <ProductionSideNav type={13} />
        <div className="table-container">
          <DataTable
            isLoading={result?.isFetching}
            columns={[
              { label: "Sr.", field: "sr" },
              { label: "Name", field: "name" },
              { label: "Rate Department", field: "rateDept" },
              { label: "Display Order", field: "displayOrder" },
              { label: "Has Belt", field: "hasBelt" },
              { label: "Scan Code Purchase", field: "scanPurchase" },
              { label: "Scan Code Production", field: "scanProd" },
              { label: "Apply FOH Purchase", field: "fohPurchase" },
              { label: "Apply FOH Production", field: "fohProd" },
              { label: "Action", field: "action" },
            ]}
            rows={
              deptsList && deptsList?.length > 0
                ? deptsList?.map((item: Department, index: number) => {
                    return {
                      sr: index + 1,
                      name: item?.name ? item?.name : "-",
                      rateDept: item?.rateDepartment
                        ? item?.rateDepartment?.name
                        : "-",
                      displayOrder: item?.displayOrder ? item?.displayOrder : 0,
                      hasBelt: item?.hasBelt ? "Yes" : "No",
                      scanPurchase: item?.scanCodePurchase ? "Yes" : "No",
                      scanProd: item?.scanCodeProduction ? "Yes" : "No",
                      fohPurchase: item?.applyFOHPurchase ? "Yes" : "No",
                      fohProd: item?.applyFOHProduction ? "Yes" : "No",
                      action: (
                        <RoutingActionButton
                          onNavigate={() =>
                            navigate(
                              "/grader/settings/productions/departments/edit/" +
                                item?.departmentId
                            )
                          }
                          onDeleteClick={() => {
                            handleDelete(item?.departmentId);
                          }}
                        />
                      ),
                    };
                  })
                : []
            }
          />
        </div>
      </div>
    </>
  );
}
