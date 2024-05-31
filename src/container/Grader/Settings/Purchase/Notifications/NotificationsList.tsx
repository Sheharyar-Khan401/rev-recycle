import SetupSideNav from "components/Settings/Purchase/PurchaseSidenav";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { useEffect, useState } from "react";
import { NotificationDisplay } from "redux/types/Settings/notifications";
import {
  useAddEditNotificationsMutation,
  useGetNotificationTypesQuery,
  useGetNotificationsQuery,
} from "redux/features/Settings/Notifications/nottifications";
import { useGetAllUsersQuery } from "redux/features/Settings/UserManagement/userApiSlice";

export default function NotificationsList() {
  const [rowData, setRowData] = useState<NotificationDisplay[]>([]);
  const { isLoading: isNotificationsLoading, data: notificationsData } =
    useGetNotificationsQuery(null);
  const [submitNotificationsTrigger, { isLoading }] =
    useAddEditNotificationsMutation();
  const {
    isLoading: isNotificationsTypesLoading,
    data: notificationsTypeData,
  } = useGetNotificationTypesQuery(null);
  const { isLoading: isUsersLoading, data: usersData } =
    useGetAllUsersQuery(null);

  useEffect(() => {
    if (notificationsData && notificationsData?.length > 0)
      setRowData(
        notificationsData.map((d) => {
          return {
            userIds: d.userIds,
            notificationEmailsId: d.notificationEmailsId,
            notificationTypesId: d.notificationTypes.notificationTypeId,
          };
        })
      );
  }, [notificationsData]);

  const columns: column<"notificationEmailsId", NotificationDisplay>[] = [
    {
      label: "Notification Type",
      field: "notificationTypesId",
      inputType: "select",
      options:
        notificationsTypeData?.map((d) => {
          return { text: d.name, value: d.notificationTypeId };
        }) ?? [],
      sort: false,
    },

    {
      label: "User",
      field: "userIds",
      inputType: "select",
      options: usersData
        ? [...usersData]?.map((u, i) => {
            return { text: u.fullName, value: u.userId };
          })
        : [],
      sort: false,
      multiple: true,
    },
  ];
  const onSubmit = () => {
    submitNotificationsTrigger(rowData);
  };

  return (
    <>
      <div className="d-lg-flex">
        <SetupSideNav type={12} />
        <div className="table-container">
          <EditableDataTable
            identifier="notificationEmailsId"
            columns={columns}
            rows={rowData}
            setRows={setRowData}
            isLoading={
              isNotificationsLoading ||
              isNotificationsTypesLoading ||
              isUsersLoading
            }
            submitLoading={isLoading}
            onSubmit={onSubmit}
            showDeleteButton
            showEditButton
          ></EditableDataTable>
        </div>
      </div>
    </>
  );
}
