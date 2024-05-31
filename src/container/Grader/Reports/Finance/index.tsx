import { Navigate, Route, Routes } from "react-router-dom";
import AccountLedgerNavigation from "container/Grader/Reports/Finance/AccountLedger/index";
import AccountsListNavigation from "container/Grader/Reports/Finance/AccountsList/index";
import ActivityNavigation from "container/Grader/Reports/Finance/Activity/index";
import BalanceSheetNavigation from "container/Grader/Reports/Finance/BalanceSheet/index";
import IncomeStatementNavigation from "container/Grader/Reports/Finance/IncomeStatement/index";
import FinanceSummaryNavigation from "container/Grader/Reports/Finance/Summary/index";
import TrialBalanceNavigation from "container/Grader/Reports/Finance/TrialBalance/index";
import TrialBalanceArrangedNavigation from "container/Grader/Reports/Finance/TrialBalanceArranged/index";

export default function ReportsFinanceNavigation() {
  return (
    <>
      <Routes>
        <Route path="accountledger/*" element={<AccountLedgerNavigation />} />
        <Route path="accountslist/*" element={<AccountsListNavigation />} />
        <Route path="activity/*" element={<ActivityNavigation />} />
        <Route path="balancesheet/*" element={<BalanceSheetNavigation />} />
        <Route path="incomestatement/*" element={<IncomeStatementNavigation />} />
        <Route path="summary/*" element={<FinanceSummaryNavigation />} />
        <Route path="trialbalance/*" element={<TrialBalanceNavigation />} />
        <Route path="trialbalanceranged/*" element={<TrialBalanceArrangedNavigation />} />
        <Route
          path="/"
          element={<Navigate to="/grader/reports/finance/summary" replace />}
        />
      </Routes>
    </>
  );
}
