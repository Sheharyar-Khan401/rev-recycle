import { Route, Routes } from "react-router-dom";
import TrialBalanceArranged from "container/Grader/Reports/Finance/TrialBalanceArranged/TrialBalanceArranged"

export default function TrialBalanceArrangedNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<TrialBalanceArranged />} />
      </>
    </Routes>
  );
}
