import Sidebar from "shared/Components/Sidebar/Sidebar";
interface Props {
  type: number ;
}
export default function AccountSettingsSideNav({ type }: Props) {
  return (
    <>
      <Sidebar
        title="Account Settings"
        type={type}
        navigations={[
          {
            type: 1,
            name: "Purchase",
            route: "/grader/settings/accountsetting/purchase",
          },
          {
            type: 2,
            name: "Production",
            route: "/grader/settings/accountsetting/production/",
          },
          {
            type: 3,
            name: "Sale",
            route: "/grader/settings/accountsetting/sale",
          },
          {
            type: 4,
            name: "Common",
            route: "/grader/settings/accountsetting/common",
          },
        ]}
      />
    </>
  );
}
