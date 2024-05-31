import Sidebar from "shared/Components/Sidebar/Sidebar";
interface Props {
  type: number;
}
export default function SystemSideNav({ type }: Props) {
  return (
    <>
      <Sidebar
        title="Primary Data"
        type={type}
        navigations={[
          {
            type: 1,
            name: "Post Vouchers",
            route: "/grader/finance/systems/postvouchers",
          },
          {
            type: 2,
            name: "Unpost Vouchers",
            route: "/grader/finance/systems/unpostvouchers",
          },
        ]}
      />
    </>
  );
}
