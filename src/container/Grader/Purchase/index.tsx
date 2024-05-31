import { Navigate, Route, Routes } from "react-router-dom";
import PurchaseNavbar from "components/Purchase/PurchaseNavbar";
import GatePassesNavigation from "container/Grader/Purchase/GatePasses/index";
import OrdersNavigation from "container/Grader/Purchase/Orders/index";
import InvoicesNavigation from "container/Grader/Purchase/Invoices/index";
import { hasPermission } from "helper/utility";
import DashboardOverview from "container/Grader/Purchase/Overview/Overview";

export default function PurchaseNavigation() {
  const getDefaultRoute = () => {
    return true
      ? "overview"
      : hasPermission("pur_po_100") ||
        hasPermission("pur_po_101") ||
        hasPermission("pur_po_102") ||
        hasPermission("pur_po_103")
      ? "orders"
      : hasPermission("pur_pi_100") ||
        hasPermission("pur_pi_101") ||
        hasPermission("pur_pi_102") ||
        hasPermission("pur_pi_103")
      ? "invoices"
      : hasPermission("pur_gp_100") ||
        hasPermission("pur_gp_101") ||
        hasPermission("pur_gp_102") ||
        hasPermission("pur_gp_103")
      ? "gatepasses"
      : "/";
  };
  return (
    <>
      <PurchaseNavbar />
      <Routes>
        <Route path="overview/*" element={<DashboardOverview />} />

        {(hasPermission("pur_po_100") ||
          hasPermission("pur_po_101") ||
          hasPermission("pur_po_102") ||
          hasPermission("pur_po_103")) && (
          <Route path="orders/*" element={<OrdersNavigation />} />
        )}
        {(hasPermission("pur_pi_100") ||
          hasPermission("pur_pi_101") ||
          hasPermission("pur_pi_102") ||
          hasPermission("pur_pi_103")) && (
          <Route path="invoices/*" element={<InvoicesNavigation />} />
        )}
        {(hasPermission("pur_gp_100") ||
          hasPermission("pur_gp_101") ||
          hasPermission("pur_gp_102") ||
          hasPermission("pur_gp_103")) && (
          <Route path="gatepasses/*" element={<GatePassesNavigation />} />
        )}
        <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
    </>
  );
}
