import { Navigate, Route, Routes } from "react-router-dom";
import AccountNavigation from "container/Grader/Finance/PrimaryData/Accounts/index";
import BankAccountNavigation from "container/Grader/Finance/PrimaryData/BankAccounts/index";
import CashAccounts from "container/Grader/Finance/PrimaryData/CashAccounts/CashAccounts";
import CostGroupNavigation from "container/Grader/Finance/PrimaryData/CostGroups/index";
import FiscalGroupNavigation from "container/Grader/Finance/PrimaryData/FiscalGroups/index";

export default function PrimaryDataNavigation() {
  return (
    <Routes>
      <Route path="fiscalgroups/*" element={<FiscalGroupNavigation />} />
      <Route path="costgroups/*" element={<CostGroupNavigation />} />
      <Route path="accounts/*" element={<AccountNavigation />} />
      <Route path="cashaccounts/*" element={<CashAccounts />} />
      <Route path="bankaccounts/*" element={<BankAccountNavigation />} />
      <Route
        path="*"
        element={
          <Navigate to="fiscalgroups" replace />
        }
      />
    </Routes>
  );
}
