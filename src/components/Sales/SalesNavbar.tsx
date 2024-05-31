import { hasPermission } from "helper/utility";
import NavigationWrapper from "shared/Components/NavigationWrapper/NavigationWrapper";

export default function SalesNavbar() {
  return (
    <NavigationWrapper
      title={"Sales"}
      navigations={[
        {
          title: "Orders",
          route: "/grader/sales/orders",
          invisible: !(
            hasPermission("sal_so_100") ||
            hasPermission("sal_so_101") ||
            hasPermission("sal_so_102") ||
            hasPermission("sal_so_103")
          ),
        },
        {
          title: "Gate Passes",
          route: "/grader/sales/gatepasses",
          invisible: !(
            hasPermission("sal_gp_100") ||
            hasPermission("sal_gp_101") ||
            hasPermission("sal_gp_102") ||
            hasPermission("sal_gp_103")
          ),
        },
        {
          title: "Invoices",
          route: "/grader/sales/invoices",
          invisible: !(
            hasPermission("sal_si_100") ||
            hasPermission("sal_si_101") ||
            hasPermission("sal_si_102") ||
            hasPermission("sal_si_103")
          ),
        },
        // {
        //   title: "Returns",
        //   route: "/grader/sales/returns",
        // },
        {
          title: "Client Item Rates",
          route: "/grader/sales/clientitemsrates",
          invisible: !(
            hasPermission("sal_clr_100") ||
            hasPermission("sal_clr_101") ||
            hasPermission("sal_clr_102") ||
            hasPermission("sal_clr_103")
          ),
        },
        {
          title: "Order Templates",
          route: "/grader/sales/ordertemplates",
          invisible: !(
            hasPermission("sal_ot_100") ||
            hasPermission("sal_ot_101") ||
            hasPermission("sal_ot_102") ||
            hasPermission("sal_ot_103")
          ),
        },
        // {
        //   title: "Sale Other Invoice Type",
        //   route: "/grader/sals/salotherinvoicetype",
        // },
        {
          title: "Settings",
          route: "/grader/sales/settings",
          invisible: !(
            hasPermission("sal_set_100") ||
            hasPermission("sal_set_101") ||
            hasPermission("sal_set_102") ||
            hasPermission("sal_set_103")
          ),
        },
      ]}
    />
  );
}
