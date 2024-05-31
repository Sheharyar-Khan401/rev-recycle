import Sidebar from "shared/Components/Sidebar/Sidebar";
interface Props {
  type: number;
}
export default function SettingDataSideNav({ type }: Props) {
  return (
    <>
      <Sidebar
        title="Setting"
        type={type}
        navigations={[
          {
            type: 1,
            name: "Basic",
            route: "/grader/sales/settings/basic",
          },
          {
            type: 2,
            name: "Prod. Profit FOH Deficit/Surplus Accounts",
            route: "/grader/sales/settings/productionprofitfohdeficit",
          },
          {
            type: 3,
            name: "Expense Accounts",
            route: "/grader/sales/settings/expenseaccount",
          },
        
          //   {
          //     type: 4,
          //     name: "Cash Accounts",
          //     route: "/grader/finance/primarydata/cashaccounts",
          //   },
          //   {
          //     type: 5,
          //     name: "Bank Accounts",
          //     route: "/grader/finance/primarydata/bankaccounts",
          //   },
          //   {
          //     type: 6,
          //     name: "Opening Balances",
          //     route: "/grader/finance/primarydata/openingbalances",
          //   },
        ]}
      />
    </>
  );
}
