import { Navigate, Route, Routes } from "react-router-dom";
import ProductionNavbar from "components/Production/ProductionNavbar";
import ProductionSettingsNavigation from "container/Grader/Production/Settings/index";
import Codes from "container/Grader/Production/Codes/index";
import Production from "container/Grader/Production/DailyProduction/index";
import Issuance from "container/Grader/Production/Issuances/index";
import TransferSaleOrderUnit from "container/Grader/Production/transferSaleOrderUnit/index";
import { hasPermission } from "helper/utility";
import DashboardOverview from "./Overview/Overview";

export default function ProductionNavigation() {
  const getDefaultRoute = () => {
    return true
      ? "overview"
      : hasPermission("pro_cl_100") ||
        hasPermission("pro_co_101") ||
        hasPermission("pro_co_102") ||
        hasPermission("pro_co_103")
      ? "codes"
      : hasPermission("pro_dp_100") ||
        hasPermission("pro_dp_101") ||
        hasPermission("pro_dp_102") ||
        hasPermission("pro_dp_103")
      ? "productions"
      : hasPermission("pro_tsou_100") ||
        hasPermission("pro_tsou_101") ||
        hasPermission("pro_tsou_102") ||
        hasPermission("pro_tsou_103")
      ? "transfersaleorderunits"
      : hasPermission("pro_issu_100") ||
        hasPermission("pro_issu_101") ||
        hasPermission("pro_issu_102") ||
        hasPermission("pro_issu_103")
      ? "issuances"
      : hasPermission("pro_set_100") ||
        hasPermission("pro_set_101") ||
        hasPermission("pro_set_102") ||
        hasPermission("pro_set_103")
      ? "settings"
      : "/";
  };
  return (
    <>
      <ProductionNavbar />
      <Routes>
        <Route path="overview/*" element={<DashboardOverview />} />

        {(hasPermission("pro_co_100") ||
          hasPermission("pro_co_101") ||
          hasPermission("pro_co_102") ||
          hasPermission("pro_co_103")) && (
          <Route path="codes/*" element={<Codes />} />
        )}
        {(hasPermission("pro_dp_100") ||
          hasPermission("pro_dp_101") ||
          hasPermission("pro_dp_102") ||
          hasPermission("pro_dp_103")) && (
          <Route path="productions/*" element={<Production />} />
        )}
        {(hasPermission("pro_tsou_100") ||
          hasPermission("pro_tsou_101") ||
          hasPermission("pro_tsou_102") ||
          hasPermission("pro_tsou_103")) && (
          <Route
            path="transfersaleorderunits/*"
            element={<TransferSaleOrderUnit />}
          />
        )}
        {(hasPermission("pro_issu_100") ||
          hasPermission("pro_issu_101") ||
          hasPermission("pro_issu_102") ||
          hasPermission("pro_issu_103")) && (
          <Route path="issuances/*" element={<Issuance />} />
        )}
        {(hasPermission("pro_set_100") ||
          hasPermission("pro_set_101") ||
          hasPermission("pro_set_102") ||
          hasPermission("pro_set_103")) && (
          <Route path="settings/*" element={<ProductionSettingsNavigation />} />
        )}
        <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
    </>
  );
}
