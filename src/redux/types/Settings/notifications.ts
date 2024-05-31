import { UserData } from "./user";

export interface NotificationDisplay
  extends Record<string, number | string | boolean | File> {
  notificationEmailsId: number;
  userIds: string;
  notificationTypesId: number;
}
export interface Notification {
  notificationEmailsId: number;
  userIds: string;
  notificationTypes: NotificationType;
  createdBy: UserData;
  creationDate: number;
}
export interface NotificationType {
  notificationTypeId: number;
  name: string;
}
