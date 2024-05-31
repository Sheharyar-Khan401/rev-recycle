import { Navigate, Route, Routes } from "react-router-dom";
import ClientsNavbar from "components/Clients/ClientsNavbar";
import AgentsNavigation from "container/Grader/Clients/Agents/index";
import ClientsNavigation from "container/Grader/Clients/Clients/index";
import SuppliersNavigation from "container/Grader/Clients/Suppliers/index";
import { hasPermission } from "helper/utility";

export default function ClientNavigation() {
  const getDefaultRoute = () => {
    return hasPermission("cli_cl_100") ||
      hasPermission("cli_cl_101") ||
      hasPermission("cli_cl_102") ||
      hasPermission("cli_cl_103")
      ? "clients"
      : hasPermission("cli_sp_100") ||
        hasPermission("cli_sp_101") ||
        hasPermission("cli_sp_102") ||
        hasPermission("cli_sp_103")
      ? "suppliers"
      : hasPermission("cli_ag_100") ||
        hasPermission("cli_ag_101") ||
        hasPermission("cli_ag_102") ||
        hasPermission("cli_ag_103")
      ? "agents"
      : "/";
  };
  return (
    <>
      <ClientsNavbar />
      <Routes>
        {(hasPermission("cli_cl_100") ||
          hasPermission("cli_cl_101") ||
          hasPermission("cli_cl_102") ||
          hasPermission("cli_cl_103")) && (
          <Route path="clients/*" element={<ClientsNavigation />} />
        )}
        {(hasPermission("cli_sp_100") ||
          hasPermission("cli_sp_101") ||
          hasPermission("cli_sp_102") ||
          hasPermission("cli_sp_103")) && (
          <Route path="suppliers/*" element={<SuppliersNavigation />} />
        )}
        {(hasPermission("cli_ag_100") ||
          hasPermission("cli_ag_101") ||
          hasPermission("cli_ag_102") ||
          hasPermission("cli_ag_103")) && (
          <Route path="agents/*" element={<AgentsNavigation />} />
        )}
        <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
    </>
  );
}
