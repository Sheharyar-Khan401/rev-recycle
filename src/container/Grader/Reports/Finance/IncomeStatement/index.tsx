import { Route, Routes } from "react-router-dom";
import IncomeStatement from "container/Grader/Reports/Finance/IncomeStatement/IncomeStatement";

export default function IncomeStatementNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<IncomeStatement />} />
      </>
    </Routes>
  );
}
