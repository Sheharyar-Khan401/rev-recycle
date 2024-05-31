import { Route, Routes } from "react-router-dom";
import DepartmentsListing from "container/Grader/Settings/Productions/Departments/DepartmentsListing";
import EditDepartment from "container/Grader/Settings/Productions/Departments/EditDepartment";

export default function DepartmentsNavigation() {
  return (
    <Routes >
      <>
        <Route path="*" element={<DepartmentsListing />} />
        <Route path="edit/:id/*" element={<EditDepartment />} />
      </>
    </Routes>
  );
}
