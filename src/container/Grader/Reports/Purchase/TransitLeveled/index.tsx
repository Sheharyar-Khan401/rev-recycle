import { Route, Routes } from "react-router-dom";
import Transit from "container/Grader/Reports/Purchase/TransitLeveled/transitleveled";

export default function TransitLeveledNavigation() {
  return (
    <Routes>
      <Route path="*" element={<Transit />} />
    </Routes>
  );
}
