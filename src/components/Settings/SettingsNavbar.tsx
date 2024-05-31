import { hasPermission } from "helper/utility";
import NavigationWrapper from "shared/Components/NavigationWrapper/NavigationWrapper";

export default function Navbar() {
  return (
    <NavigationWrapper
      title={"Settings"}
      navigations={[
        {
          title: <>Purchase</>,
          route: "/grader/settings/purchase",
          invisible: !(
            hasPermission("set_ps_100") ||
            hasPermission("set_ps_101") ||
            hasPermission("set_ps_102") ||
            hasPermission("set_ps_103")
          ),
        },
        {
          title: <>Finance</>,
          route: "/grader/settings/finance",
          invisible: !(
            hasPermission("set_fs_100") ||
            hasPermission("set_fs_101") ||
            hasPermission("set_fs_102") ||
            hasPermission("set_fs_103")
          ),
        },
        {
          title: <>Productions</>,
          route: "/grader/settings/productions",
          invisible: !(
            hasPermission("set_pro_100") ||
            hasPermission("set_pro_101") ||
            hasPermission("set_pro_102") ||
            hasPermission("set_pro_103")
          ),
        },
        {
          title: <>Account Settings</>,
          route: "/grader/settings/accountsetting",
          invisible: !(
            hasPermission("set_as_100") ||
            hasPermission("set_as_101") ||
            hasPermission("set_as_102") ||
            hasPermission("set_as_103")
          ),
        },
        {
          title: <>Role Management</>,
          route: "/grader/settings/roles",
          invisible: !(
            hasPermission("set_rm_100") ||
            hasPermission("set_rm_101") ||
            hasPermission("set_rm_102") ||
            hasPermission("set_rm_103")
          ),
        },
        {
          title: <>User Management</>,
          route: "/grader/settings/users",
          invisible: !(
            hasPermission("set_um_100") ||
            hasPermission("set_um_101") ||
            hasPermission("set_um_102") ||
            hasPermission("set_um_103")
          ),
        },
      ]}
    />
  );
}
