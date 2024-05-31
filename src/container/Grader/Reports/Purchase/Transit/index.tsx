import { Route, Routes } from "react-router-dom";
import Transit from "container/Grader/Reports/Purchase/Transit/Transit";

export default function TransitNavigation() {
  return (
    <Routes>
      <Route path="*" element={<Transit />} />
    </Routes>
  );
}
