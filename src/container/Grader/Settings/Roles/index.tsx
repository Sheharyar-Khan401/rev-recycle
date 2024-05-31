import { Route, Routes } from "react-router-dom";
import AddRole from "container/Grader/Settings/Roles/AddRole";
import EditRole from "container/Grader/Settings/Roles/EditRole";
import Roles from "container/Grader/Settings/Roles/Roles";
import { hasPermission } from "helper/utility";

export default function RolesNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<Roles />} />
        {hasPermission("set_rm_100") && (
          <Route path="add/*" element={<AddRole />} />
        )}
        {hasPermission("set_rm_101") && (
          <Route path="edit/:id/*" element={<EditRole />} />
        )}
      </>
    </Routes>
  );
}
