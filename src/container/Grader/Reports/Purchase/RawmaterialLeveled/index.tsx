import { Route, Routes } from "react-router-dom";
import RawmaterialLeveled from "container/Grader/Reports/Purchase/RawmaterialLeveled/RawmaterialLeveled";

export default function RawMaterialLeveledNavigation() {
  return (
    <Routes>
      <Route path="*" element={<RawmaterialLeveled />} />
    </Routes>
  );
}
