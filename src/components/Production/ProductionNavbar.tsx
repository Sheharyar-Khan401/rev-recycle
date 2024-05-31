import { hasPermission } from "helper/utility";
import NavigationWrapper from "shared/Components/NavigationWrapper/NavigationWrapper";

export default function ProductionNavbar() {
  return (
    <NavigationWrapper
      title={"Production"}
      navigations={[
        {
          title: "Overview",
          route: "/grader/production/overview",
        },
        {
          title: "Codes",
          route: "/grader/production/codes",
          invisible: !(
            hasPermission("pro_co_100") ||
            hasPermission("pro_co_101") ||
            hasPermission("pro_co_102") ||
            hasPermission("pro_co_103")
          ),
        },
        {
          title: "Production",
          route: "/grader/production/productions",
          invisible: !(
            hasPermission("pro_dp_100") ||
            hasPermission("pro_dp_101") ||
            hasPermission("pro_dp_102") ||
            hasPermission("pro_dp_103")
          ),
        },
        // {
        //   title: "Bundles",
        //   route: "/grader/production/bundles",
        // },
        {
          title: "Transfer Sale Order Units",
          route: "/grader/production/transfersaleorderunits",
          invisible: !(
            hasPermission("pro_tsou_100") ||
            hasPermission("pro_tsou_101") ||
            hasPermission("pro_tsou_102") ||
            hasPermission("pro_tsou_103")
          ),
        },

        {
          title: "Issuances",
          route: "/grader/production/issuances",
          invisible: !(
            hasPermission("pro_issu_100") ||
            hasPermission("pro_issu_101") ||
            hasPermission("pro_issu_102") ||
            hasPermission("pro_issu_103")
          ),
        },
        {
          title: "Settings",
          route: "/grader/production/settings",
          invisible: !(
            hasPermission("pro_set_100") ||
            hasPermission("pro_set_101") ||
            hasPermission("pro_set_102") ||
            hasPermission("pro_set_103")
          ),
        },
      ]}
    />
  );
}
