import { Route, Routes } from "react-router-dom";
import DailyProductionProfitReports from "container/Grader/Reports/Sales/DailyProductionProfit/DailyProductionProfitReports"
export default function DailyProductionProfitNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<DailyProductionProfitReports />} />
      </>
    </Routes>
  );
}
