import { Route, Routes } from "react-router-dom";
import BalanceSheet from "container/Grader/Reports/Finance/BalanceSheet/BalanceSheet";

export default function BalanceSheetNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<BalanceSheet />} />
      </>
    </Routes>
  );
}
