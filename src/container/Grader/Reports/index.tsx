import { Navigate, Route, Routes } from "react-router-dom";
import ReportsNavbar from "components/Reports/ReportsNavbar";
import ReportsPurchaseNavigation from "container/Grader/Reports/Purchase/index";
import SalesFinanceNavigation from "container/Grader/Reports/Sales/index";
import ReportsProductionNavigation from "container/Grader/Reports/Production/index";

export default function ReportsNavigation() {
  return (
    <>
    <ReportsNavbar />
      <Routes>
        {/* <Route path="finance/*" element={<ReportsFinanceNavigation />} /> */}
        <Route path="purchase/*" element={<ReportsPurchaseNavigation />} />
         <Route path="sales/*" element={<SalesFinanceNavigation />} />
         <Route path="production/*" element={<ReportsProductionNavigation />} /> 
          
        <Route
          path="/"
          element={<Navigate to="/grader/reports/purchase/containerintransit" replace />}
        />
      </Routes>
    </>
  );
}
