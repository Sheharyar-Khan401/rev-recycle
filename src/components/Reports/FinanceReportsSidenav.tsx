import Sidebar from "shared/Components/Sidebar/Sidebar";
interface Props {
  type: number;
}
export default function FinanceReportsSideNav({ type }: Props) {
  return (
    <>
      {/* <Sidebar
        title="Primary Data"
        type={type}
        navigations={[
          {
            type: 1,
            name: "Summary",
            route: "/grader/reports/finance/summary",
          },
          {
            type: 2,
            name: "Account Ledger",
            route: "/grader/reports/finance/accountledger",
          },
          {
            type: 3,
            name: "Activity B/W Two Dates",
            route: "/grader/reports/finance/activity",
          },
          {
            type: 4,
            name: "Balance Sheet",
            route: "/grader/reports/finance/balancesheet",
          },
          {
            type: 5,
            name: "Income Statement",
            route: "/grader/reports/finance/incomestatement",
          },
          {
            type: 6,
            name: "Trial Balance",
            route: "/grader/reports/finance/trialbalance",
          },
          {
            type: 7,
            name: "Trial Balance Ranged",
            route: "/grader/reports/finance/trialbalanceranged",
          },
          {
            type: 8,
            name: "List of Accounts",
            route: "/grader/reports/finance/accountslist",
          },
        ]}
      /> */}
    </>
  );
}
