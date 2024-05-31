import { Route, Routes } from "react-router-dom";
import DetailedInward from "container/Grader/Reports/Purchase/DetailedInwardGatePass/DetailedInwardGatePass";

export default function DetailedInwardNavigation() {
  return (
    <Routes>
      <Route path="*" element={<DetailedInward />} />
    </Routes>
  );
}
