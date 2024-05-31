import { Route, Routes } from "react-router-dom";
import AlertLimits from "./Alerts";

export default function CategoriesNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<AlertLimits />} />
      </>
    </Routes>
  );
}
