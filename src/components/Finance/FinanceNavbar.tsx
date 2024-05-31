import { hasPermission } from "helper/utility";
import NavigationWrapper from "shared/Components/NavigationWrapper/NavigationWrapper";

export default function FinanceNavbar() {
  return (
    <NavigationWrapper
      title={"Finance"}
      navigations={[
        {
          title: <>Primary&nbsp;Data</>,
          route: "/grader/finance/primarydata",
          invisible: !(
            hasPermission("fin_pd_100") ||
            hasPermission("fin_pd_101") ||
            hasPermission("fin_pd_102") ||
            hasPermission("fin_pd_103")
          ),
        },
        {
          title: "Vouchers",
          route: "/grader/finance/vouchers",
          invisible: !(
            hasPermission("fin_v_100") ||
            hasPermission("fin_v_101") ||
            hasPermission("fin_v_102") ||
            hasPermission("fin_v_103")
          ),
        },
      ]}
    />
  );
}
