import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "components/Settings/SettingsNavbar";
import FinanceNavigation from "container/Grader/Settings/Finance/index";
import ProductionsNavigation from "container/Grader/Settings/Productions/ProductionNavigation";
import RolesNavigation from "container/Grader/Settings/Roles/index";
import UsersNavigation from "container/Grader/Settings/Users/index";
import AccountSettingNavigation from "container/Grader/Settings/AccountSettings/index";
import PurchaseNavigation from "container/Grader/Settings/Purchase/index";
import { hasPermission } from "helper/utility";
export default function SettingsNavigation() {
  const getDefaultRoute = () => {
    return hasPermission("set_ps_100") ||
      hasPermission("set_ps_101") ||
      hasPermission("set_ps_102") ||
      hasPermission("set_ps_103")
      ? "purchase"
      : hasPermission("set_as_100") ||
        hasPermission("set_as_101") ||
        hasPermission("set_as_102") ||
        hasPermission("set_as_103")
      ? "accountsetting"
      : hasPermission("set_pro_100") ||
        hasPermission("set_pro_101") ||
        hasPermission("set_pro_102") ||
        hasPermission("set_pro_103")
      ? "productions"
      : hasPermission("set_fs_100") ||
        hasPermission("set_fs_101") ||
        hasPermission("set_fs_102") ||
        hasPermission("set_fs_103")
      ? "finance"
      : hasPermission("set_rm_100") ||
        hasPermission("set_rm_101") ||
        hasPermission("set_rm_102") ||
        hasPermission("set_rm_103")
      ? "roles"
      : hasPermission("set_um_100") ||
        hasPermission("set_um_101") ||
        hasPermission("set_um_102") ||
        hasPermission("set_um_103")
      ? "users"
      : "/";
  };
  return (
    <>
      <Navbar />
      <Routes>
        {(hasPermission("set_ps_100") ||
          hasPermission("set_ps_101") ||
          hasPermission("set_ps_102") ||
          hasPermission("set_ps_103")) && (
          <Route path="purchase/*" element={<PurchaseNavigation />} />
        )}
        {(hasPermission("set_as_100") ||
          hasPermission("set_as_101") ||
          hasPermission("set_as_102") ||
          hasPermission("set_as_103")) && (
          <Route
            path="accountsetting/*"
            element={<AccountSettingNavigation />}
          />
        )}
        {(hasPermission("set_pro_100") ||
          hasPermission("set_pro_101") ||
          hasPermission("set_pro_102") ||
          hasPermission("set_pro_103")) && (
          <Route path="productions/*" element={<ProductionsNavigation />} />
        )}
        {(hasPermission("set_fs_100") ||
          hasPermission("set_fs_101") ||
          hasPermission("set_fs_102") ||
          hasPermission("set_fs_103")) && (
          <Route path="finance/*" element={<FinanceNavigation />} />
        )}
        {(hasPermission("set_rm_100") ||
          hasPermission("set_rm_101") ||
          hasPermission("set_rm_102") ||
          hasPermission("set_rm_103")) && (
          <Route path="roles/*" element={<RolesNavigation />} />
        )}
        {(hasPermission("set_um_100") ||
          hasPermission("set_um_101") ||
          hasPermission("set_um_102") ||
          hasPermission("set_um_103")) && (
          <Route path="users/*" element={<UsersNavigation />} />
        )}
        <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
    </>
  );
}
