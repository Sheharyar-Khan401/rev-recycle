import { Route, Routes } from "react-router-dom";
import DetailedOutwardGatePass from "container/Grader/Reports/Sales/DetailedOutwardGatePass2/DetailedOutwardGatePass2";

export default function DetailedOutwardGatePassNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<DetailedOutwardGatePass />} />
      </>
    </Routes>
  );
}
