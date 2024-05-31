import { Route, Routes } from "react-router-dom";
import Categories from "container/Grader/Settings/Purchase/Categories/Categories";

export default function CategoriesNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<Categories />} />
      </>
    </Routes>
  );
}
