import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import {
  useDeleteRoleMutation,
  useLazyGetBranchRolesQuery,
} from "redux/features/roles/roleApiSlice";
import { Role, Screen } from "redux/types/Settings/role";
import DataTable from "shared/Components/DataTable";
import { globalVariables } from "helper/globalVariables";
import Filters from "shared/Components/Filters";
import { hasPermission } from "helper/utility";

export default function Roles() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);

  const [getRoles, result] = useLazyGetBranchRolesQuery();
  const [deleteRole] = useDeleteRoleMutation();
  const [rolesList, setRolesList] = useState<Role[]>([]);

  const handleDelete = (id: number) => {
    if (id) {
      deleteRole(id);
    }
  };
  useEffect(() => {
    if (result?.data) {
      setRolesList(result?.data?.payLoad);
    }
  }, [result?.data]);

  useEffect(() => {
    getRoles({});
  }, [getRoles]);

  return (
    <div className="table-container">
      <Filters
        printAble={false}
        exportAble={false}
        componentRef={ref}
        addRedirectPath={
          hasPermission("set_rm_100") ? "/grader/settings/roles/add" : ""
        }
      />
      {hasPermission("set_rm_103") && (
        <DataTable
          isLoading={result?.isFetching}
          columns={[
            { label: "Roles", field: "roleName" },
            { label: "Access Permissions", field: "screenAction" },
            { label: "Action", field: "action" },
          ]}
          rows={
            rolesList
              ? rolesList?.map((item: Role) => {
                  return {
                    roleName: item?.roleName ? item?.roleName : "-",
                    screenAction:
                      item.screen && item?.screen?.length > 0
                        ? item?.screen
                            ?.map((item: Screen) => item?.screen)
                            ?.join(", ")
                        : "-",
                    action: !item.locked && (
                      <RoutingActionButton
                        onNavigate={() =>
                          navigate("/grader/settings/roles/edit/" + item.roleId)
                        }
                        onDeleteClick={
                          hasPermission("set_rm_102")
                            ? () => {
                                handleDelete(item?.roleId);
                              }
                            : undefined
                        }
                      />
                    ),
                  };
                })
              : []
          }
        />
      )}
    </div>
  );
}
