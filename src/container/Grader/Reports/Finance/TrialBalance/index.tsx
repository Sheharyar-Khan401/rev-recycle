import { Route, Routes } from "react-router-dom";
import TrialBalance from "container/Grader/Reports/Finance/TrialBalance/TrialBalance";

export default function TrialBalanceNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<TrialBalance />} />
      </>
    </Routes>
  );
}
