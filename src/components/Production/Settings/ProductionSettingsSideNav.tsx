import Sidebar from "shared/Components/Sidebar/Sidebar";

interface Props {
  type: number;
}
export default function ProductionSettingsSideNav({ type }: Props) {
  return (
    <>
      <Sidebar
        title="Settings"
        type={type}
        navigations={[
          {
            type: 1,
            name: "FOH Values",
            route: "/grader/production/settings/fohvalues",
          },
          {
            type: 2,
            name: "Opening Balances",
            route: "/grader/production/settings/openingbalances",
          },
        ]}
      />
    </>
  );
}
