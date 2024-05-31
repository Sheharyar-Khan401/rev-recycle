import { Route, Routes } from "react-router-dom";
import AddUser from "container/Grader/Settings/Users/AddUser";
import EditUser from "container/Grader/Settings/Users/EditUser";
import Users from "container/Grader/Settings/Users/Users";
import { hasPermission } from "helper/utility";

export default function UsersNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<Users />} />
        {hasPermission("set_um_100") && (
          <Route path="add/*" element={<AddUser />} />
        )}
        {hasPermission("set_um_101") && (
          <Route path="edit/:id/*" element={<EditUser />} />
        )}
      </>
    </Routes>
  );
}
