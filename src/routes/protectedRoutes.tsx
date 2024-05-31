import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import OnBoarding from "shared/Components/LoginSteps/Onboarding";
import SettingsNavigation from "container/Grader/Settings";
import FinanceNavigation from "container/Grader/Finance";
import PurchaseNavigation from "container/Grader/Purchase";
import SalesNavigation from "container/Grader/Sales";
import Topbar from "shared/Components/Topbar/Topbar";
import ReportsNavigation from "container/Grader/Reports";
import ClientNavigation from "container/Grader/Clients";
import ProductionNavigation from "container/Grader/Production";
import { useAppSelector } from "redux/hooks";
import {
  hasClientsPermissions,
  hasFinancePermissions,
  hasProductionsPermissions,
  hasPurchasePermissions,
  hasSalePermissions,
  hasSettingsPermissions,
} from "helper/utility";
import Dashboard from "container/Grader/Dashboard/index";
const GraderRoutes = () => {
  const getDefaultRoute = () => {
    return hasFinancePermissions()
      ? "finance"
      : hasPurchasePermissions()
      ? "purchase"
      : hasSalePermissions()
      ? "sales"
      : hasClientsPermissions()
      ? "clients"
      : hasProductionsPermissions()
      ? "production"
      : "reports";
  };

  return (
    <>
      <Routes>
        {hasFinancePermissions() && (
          <Route path="/finance/*" element={<FinanceNavigation />} />
        )}
        {hasPurchasePermissions() && (
          <Route path="/purchase/*" element={<PurchaseNavigation />} />
        )}
        {hasSalePermissions() && (
          <Route path="/sales/*" element={<SalesNavigation />} />
        )}
        {hasClientsPermissions() && (
          <Route path="/clients/*" element={<ClientNavigation />} />
        )}
        {hasProductionsPermissions() && (
          <Route path="/production/*" element={<ProductionNavigation />} />
        )}
        <Route path="/reports/*" element={<ReportsNavigation />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        {hasSettingsPermissions() && (
          <Route path="/settings/*" element={<SettingsNavigation />} />
        )}
        <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
    </>
  );
};

export default function ProtectedRoutes() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <>
      <Topbar />
      <div className="custom-container">
        <Routes>
          {user?.businesses && user.businesses.length > 0 ? (
            <>
              <Route path="/grader/*" element={<GraderRoutes />} />
              <Route path="*" element={<Navigate to="grader" replace />} />
            </>
          ) : (
            <>
              <Route path="/loginsteps/*" element={<OnBoarding />} />
              <Route path="*" element={<Navigate to="loginsteps" replace />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}
