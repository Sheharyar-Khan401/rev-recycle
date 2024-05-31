import { Navigate, Route, Routes } from "react-router-dom";
import SalesNavbar from "components/Sales/SalesNavbar";
import GetPassesNavigation from "container/Grader/Sales/GatePasses/index";
import SalesInvoicesNavigation from "container/Grader/Sales/Invoices/index";
import OrdersNavigation from "container/Grader/Sales/Orders/index";
import ClientItemsRatesNavigation from "container/Grader/Sales/ClientsItemsRates/index";
import OrderTemplatesNavigation from "container/Grader/Sales/OrderTemplates/index";
import SaleOtherInvoiceTypeNavigation from "container/Grader/Sales/SaleOtherInvoiceType/index";
import SettingsNavigation from "container/Grader/Sales/Settings/index";
import { hasPermission } from "helper/utility";

export default function SalesNavigation() {
  const getDefaultRoute = () => {
    return hasPermission("sal_so_100") ||
      hasPermission("sal_so_101") ||
      hasPermission("sal_so_102") ||
      hasPermission("sal_so_103")
      ? "orders"
      : hasPermission("sal_gp_100") ||
        hasPermission("sal_gp_101") ||
        hasPermission("sal_gp_102") ||
        hasPermission("sal_gp_103")
      ? "gatepasses"
      : hasPermission("sal_si_100") ||
        hasPermission("sal_si_101") ||
        hasPermission("sal_si_102") ||
        hasPermission("sal_si_103")
      ? "invoices"
      : hasPermission("sal_clr_100") ||
        hasPermission("sal_clr_101") ||
        hasPermission("sal_clr_102") ||
        hasPermission("sal_clr_103")
      ? "clientitemsrates"
      : hasPermission("sal_ot_100") ||
        hasPermission("sal_ot_101") ||
        hasPermission("sal_ot_102") ||
        hasPermission("sal_ot_103")
      ? "ordertemplates"
      : hasPermission("sal_set_100") ||
        hasPermission("sal_set_101") ||
        hasPermission("sal_set_102") ||
        hasPermission("sal_set_103")
      ? "settings"
      : "/";
  };
  return (
    <>
      <SalesNavbar />
      <Routes>
        {(hasPermission("sal_gp_100") ||
          hasPermission("sal_gp_101") ||
          hasPermission("sal_gp_102") ||
          hasPermission("sal_gp_103")) && (
          <Route path="gatepasses/*" element={<GetPassesNavigation />} />
        )}
        {(hasPermission("sal_si_100") ||
          hasPermission("sal_si_101") ||
          hasPermission("sal_si_102") ||
          hasPermission("sal_si_103")) && (
          <Route path="invoices/*" element={<SalesInvoicesNavigation />} />
        )}{" "}
        {(hasPermission("sal_so_100") ||
          hasPermission("sal_so_101") ||
          hasPermission("sal_so_102") ||
          hasPermission("sal_so_103")) && (
          <Route path="orders/*" element={<OrdersNavigation />} />
        )}
        {(hasPermission("sal_clr_100") ||
          hasPermission("sal_clr_101") ||
          hasPermission("sal_clr_102") ||
          hasPermission("sal_clr_103")) && (
          <Route
            path="clientitemsrates/*"
            element={<ClientItemsRatesNavigation />}
          />
        )}
        {(hasPermission("sal_ot_100") ||
          hasPermission("sal_ot_101") ||
          hasPermission("sal_ot_102") ||
          hasPermission("sal_ot_103")) && (
          <Route
            path="ordertemplates/*"
            element={<OrderTemplatesNavigation />}
          />
        )}
        s
        <Route
          path="salotherinvoicetype/*"
          element={<SaleOtherInvoiceTypeNavigation />}
        />
        {(hasPermission("sal_set_100") ||
          hasPermission("sal_set_101") ||
          hasPermission("sal_set_102") ||
          hasPermission("sal_set_103")) && (
          <Route path="settings/*" element={<SettingsNavigation />} />
        )}
        <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
    </>
  );
}
