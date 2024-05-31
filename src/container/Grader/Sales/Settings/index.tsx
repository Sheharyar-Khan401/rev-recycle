import { Navigate, Route, Routes } from "react-router-dom";
import Basic from "container/Grader/Sales/Settings/basic/basic";
import ProductionProfitFOHDeficit from "container/Grader/Sales/Settings/productionProfitFOHDeficit/productionProfitFOHDeficit"
import ExpenseAccount from "container/Grader/Sales/Settings/expenseAccount/expenseAccount";
import { hasPermission } from "helper/utility";

export default function SeetingsNavigation() {
  return (
    <>
      <Routes>
        {(hasPermission("sal_set_100") ||
          hasPermission("sal_set_101") ||
          hasPermission("sal_set_102") ||
          hasPermission("sal_set_103")) && (
          <>
            <Route path="basic/*" element={<Basic />} />
            <Route
              path="productionprofitfohdeficit/*"
              element={<ProductionProfitFOHDeficit />}
            />
            <Route path="expenseaccount/*" element={<ExpenseAccount />} />
            <Route
              path="/"
              element={<Navigate to="/grader/sales/settings/basic" replace />}
            />
          </>
        )}
      </Routes>
    </>
  );
}
