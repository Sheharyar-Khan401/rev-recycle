import Sidebar from "shared/Components/Sidebar/Sidebar";
interface Props {
  type: number;
}
export default function PrimaryDataSideNav({ type }: Props) {
  return (
    <>
      <Sidebar
        title="Primary Data"
        type={type}
        navigations={[
          {
            type: 1,
            name: "Fiscal Groups",
            route: "/grader/finance/primarydata/fiscalgroups",
          },
          {
            type: 2,
            name: "Cost Groups",
            route: "/grader/finance/primarydata/costgroups",
          },
          {
            type: 3,
            name: "Accounts",
            route: "/grader/finance/primarydata/accounts",
          },
          {
            type: 4,
            name: "Cash Accounts",
            route: "/grader/finance/primarydata/cashaccounts",
          },
          {
            type: 5,
            name: "Bank Accounts",
            route: "/grader/finance/primarydata/bankaccounts",
          },
          // {
          //   type: 6,
          //   name: "Opening Balances",
          //   route: "/grader/finance/primarydata/openingbalances",
          // },
        ]}
      />
    </>
  );
}
