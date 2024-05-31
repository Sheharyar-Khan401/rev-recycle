import { Route, Routes } from "react-router-dom";
import Codes from "container/Grader/Production/Codes/Codes";
import AddCode from "container/Grader/Production/Codes/AddCode";
import EditCode from "container/Grader/Production/Codes/EditCode";
import { hasPermission } from "helper/utility";

export default function index() {
  return (
    <Routes>
      <>
        <Route path="*" element={<Codes />} />
        {hasPermission("pro_co_100") && (
        <Route path="add/*" element={<AddCode />} />
        )}
        {hasPermission("pro_co_101") && (
        <Route path="edit/:id/*" element={<EditCode />} />
        )}
      </>
    </Routes>
  );
}
