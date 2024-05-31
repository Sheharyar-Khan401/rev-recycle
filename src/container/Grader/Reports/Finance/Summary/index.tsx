import { Route, Routes } from "react-router-dom";
import FinanceSummary from "container/Grader/Reports/Finance/Summary/FinanceSummary";

export default function FinanceSummaryNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<FinanceSummary />} />
      </>
    </Routes>
  );
}
