import { Route, Routes } from "react-router-dom";
import NotificationsList from "./NotificationsList";

export default function NotificationsNavigation() {
  return (
    <Routes>
      <Route path="*" element={<NotificationsList />} />
    </Routes>
  );
}
