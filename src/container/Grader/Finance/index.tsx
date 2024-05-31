import { Navigate, Route, Routes } from "react-router-dom";
import FinanceNavbar from "components/Finance/FinanceNavbar";
import PrimaryDataNavigation from "container/Grader/Finance/PrimaryData/index";
import { hasPermission } from "helper/utility";
import VouchersNavigation from "./Vouchers";

export default function FinanceNavigation() {
  const getDefaultRoute = () => {
    return hasPermission("fin_pd_100") ||
      hasPermission("fin_pd_101") ||
      hasPermission("fin_pd_102") ||
      hasPermission("fin_pd_103")
      ? "primarydata"
      : hasPermission("fin_v_100") ||
        hasPermission("fin_v_101") ||
        hasPermission("fin_v_102") ||
        hasPermission("fin_v_103")
      ? "vouchers"
      : "/";
  };
  return (
    <>
      <FinanceNavbar />

      <Routes>
        {(hasPermission("fin_pd_100") ||
          hasPermission("fin_pd_101") ||
          hasPermission("fin_pd_102") ||
          hasPermission("fin_pd_103")) && (
          <Route path="primarydata/*" element={<PrimaryDataNavigation />} />
        )}
        {(hasPermission("fin_v_100") ||
          hasPermission("fin_v_101") ||
          hasPermission("fin_v_102") ||
          hasPermission("fin_v_103")) && (
          <Route path="vouchers/*" element={<VouchersNavigation />} />
        )}

        <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
    </>
  );
}
