import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import { ActiveIcon, InactiveIcon } from "helper/icons";
import { UserData } from "redux/types/Settings/user";
import {
  useDeleteUserMutation,
  useLazyGetUsersQuery,
} from "redux/features/Settings/UserManagement/userApiSlice";
import { getDateFromMillis, hasPermission } from "helper/utility";
import DataTable from "shared/Components/DataTable";
import Filters from "shared/Components/Filters";

export default function Users() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);

  const [getUser, result] = useLazyGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [usersData, setUsersData] = useState<UserData[]>([]);

  useEffect(() => {
    hasPermission("set_um_103") && getUser({});
  }, []);

  useEffect(() => {
    if (result.data) {
      setUsersData(result?.data?.payLoad);
    }
  }, [result.data]);
  const handleDelete = (id: number) => {
    if (id) {
      deleteUser(id);
    }
  };

  return (
    <div className="table-container">
      <Filters
        printAble={usersData.length > 0}
        exportAble={usersData.length > 0}
        componentRef={ref}
        addRedirectPath={
          hasPermission("set_um_100") ? "/grader/settings/users/add" : ""
        }
      />
      {hasPermission("set_um_103") && (
        <DataTable
          ref={ref}
          isLoading={result?.isFetching}
          columns={[
            { label: "user name", field: "fullName" },
            { label: "roles", field: "listofuserrole" },
            { label: "expires on", field: "expires" },
            { label: "status", field: "status" },
            { label: "action", field: "action" },
          ]}
          rows={
            usersData
              ? usersData?.map((item: UserData) => {
                  return {
                    fullName: item?.fullName ? item?.fullName : "-",
                    listofuserrole:
                      item?.listofuserrole && item?.listofuserrole?.length > 0
                        ? item?.listofuserrole
                            ?.map((item) => item?.role?.roleName)
                            ?.join(", ")
                        : "-",
                    expires: item?.expiryDate
                      ? getDateFromMillis(item?.expiryDate)
                      : "-",
                    status:
                      item.userStatus === "Active" ? (
                        <ActiveIcon />
                      ) : (
                        <InactiveIcon />
                      ),
                    action: (
                      <RoutingActionButton
                        onNavigate={
                          hasPermission("set_um_101")
                            ? () =>
                                navigate(
                                  "/grader/settings/users/edit/" + item.userId
                                )
                            : undefined
                        }
                        onDeleteClick={
                          hasPermission("set_um_102")
                            ? () => {
                                handleDelete(item?.userId);
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
