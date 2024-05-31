import NavigationWrapper from "shared/Components/NavigationWrapper/NavigationWrapper";

export default function ReportsNavbar() {
  return (
    <NavigationWrapper
      title={"Reports"}
      navigations={[
        // {
        //   title: "Finance",
        //   route: "/grader/reports/finance",
        // },
        {
          title: "Purchase",
          route: "/grader/reports/purchase",
        },
        {
          title: "Sales",
          route: "/grader/reports/sales",
        },
        {
          title: "Production",
          route: "/grader/reports/production",
        },
      ]}
    />
  );
}
