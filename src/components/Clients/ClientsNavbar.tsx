import { hasPermission } from "helper/utility";
import NavigationWrapper from "shared/Components/NavigationWrapper/NavigationWrapper";

export default function ClientsNavbar() {
  return (
    <NavigationWrapper
      title={"Clients"}
      navigations={[
        {
          title: "Clients",
          route: "/grader/clients/clients",
          invisible: !(
            hasPermission("cli_cl_100") ||
            hasPermission("cli_cl_101") ||
            hasPermission("cli_cl_102") ||
            hasPermission("cli_cl_103")
          ),
        },
        {
          title: "Suppliers",
          route: "/grader/clients/suppliers",
          invisible: !(
            hasPermission("cli_sp_100") ||
            hasPermission("cli_sp_101") ||
            hasPermission("cli_sp_102") ||
            hasPermission("cli_sp_103")
          ),
        },
        {
          title: "Agents",
          route: "/grader/clients/agents",
          invisible: !(
            hasPermission("cli_ag_100") ||
            hasPermission("cli_ag_101") ||
            hasPermission("cli_ag_102") ||
            hasPermission("cli_ag_103")
          ),
        },
      ]}
    />
  );
}
