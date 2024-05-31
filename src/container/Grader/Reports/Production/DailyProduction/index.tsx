import { Route, Routes } from "react-router-dom";
import DailyProductionReports from "container/Grader/Reports/Production/DailyProduction/DailyProductionReports"

export default function DailyProductionReportsNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<DailyProductionReports />} />
      </>
    </Routes>
  );
}
