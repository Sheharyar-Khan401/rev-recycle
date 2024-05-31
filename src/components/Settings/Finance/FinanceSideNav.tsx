import Sidebar from "shared/Components/Sidebar/Sidebar";

interface Props {
  type: number;
}
export default function FinanceSideNav({ type }: Props) {
  return (
    <>
      <Sidebar
        title="Finance"
        type={type}
        navigations={[
          {
            type: 1,
            name: "Currency",
            route: "/grader/settings/finance/currency",
          },
          {
            type: 2,
            name: "Settings",
            route: "/grader/settings/finance/settings",
          },
        ]}
      />
    </>
  );
}
