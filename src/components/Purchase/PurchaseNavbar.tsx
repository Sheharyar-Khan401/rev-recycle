import { hasPermission } from "helper/utility";
import NavigationWrapper from "shared/Components/NavigationWrapper/NavigationWrapper";

export default function PurchaseNavbar() {
  return (
    <NavigationWrapper
      title={"Purchase"}
      navigations={[
        {
          title: "Overview",
          route: "/grader/purchase/overview",
        },
        {
          title: "Orders",
          route: "/grader/purchase/orders",
          invisible: !(
            hasPermission("pur_po_100") ||
            hasPermission("pur_po_101") ||
            hasPermission("pur_po_102") ||
            hasPermission("pur_po_103")
          ),
        },
        {
          title: "Invoices",
          route: "/grader/purchase/invoices",
          invisible: !(
            hasPermission("pur_pi_100") ||
            hasPermission("pur_pi_101") ||
            hasPermission("pur_pi_102") ||
            hasPermission("pur_pi_103")
          ),
        },
        {
          title: "Gate Passes",
          route: "/grader/purchase/gatepasses",
          invisible: !(
            hasPermission("pur_gp_100") ||
            hasPermission("pur_gp_101") ||
            hasPermission("pur_gp_102") ||
            hasPermission("pur_gp_103")
          ),
        },
        // {
        //   title: "Settings",
        //   route: "/grader/purchase/settings",
        // },
      ]}
    />
  );
}
