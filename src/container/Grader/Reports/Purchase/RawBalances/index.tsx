import { Route, Routes } from "react-router-dom";
import RawBalances from "container/Grader/Reports/Purchase/RawBalances/rawBalances";
export default function RawBalancesNavigation() {
  return (
    <Routes>
      <Route path="*" element={<RawBalances />} />
    </Routes>
  );
}
