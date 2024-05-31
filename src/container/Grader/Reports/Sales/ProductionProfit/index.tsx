import { Route, Routes } from "react-router-dom";
import ProductionProfitReports from "container/Grader/Reports/Sales/ProductionProfit/ProductionProfitReports";

export default function DailyProductionProfitNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<ProductionProfitReports />} />
      </>
    </Routes>
  );
}
