import { apiSlice } from "redux/api/apiSlice";
import {
  Notification,
  NotificationType,
} from "redux/types/Settings/notifications";

export const uomApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["notifications"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      addEditNotifications: builder.mutation({
        query: (body) => ({
          url: `/notificationEmails`,
          method: "PUT",
          body: body,
        }),
        invalidatesTags: ["notifications"],
      }),
      getNotifications: builder.query<Array<Notification>, null>({
        query: () => ({ url: "/notificationEmails" }),
        providesTags: ["notifications"],
        transformResponse: (response: { payLoad: Notification[] }) => {
          return response?.payLoad ? response?.payLoad : [];
        },
      }),
      getNotificationTypes: builder.query<Array<NotificationType>, null>({
        query: () => ({ url: "/notificationTypes" }),
        providesTags: ["notifications"],
        transformResponse: (response: { payLoad: NotificationType[] }) => {
          return response?.payLoad ? response?.payLoad : [];
        },
      }),
    }),
  });
export const { useGetNotificationsQuery, useGetNotificationTypesQuery, useAddEditNotificationsMutation } =
  uomApiSlice;
