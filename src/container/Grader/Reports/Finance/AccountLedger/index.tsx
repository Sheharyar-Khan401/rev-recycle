import { Route, Routes } from "react-router-dom";
import AccountLedger from "container/Grader/Reports/Finance/AccountLedger/AccountLedger";

export default function AccountLedgerNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<AccountLedger />} />
      </>
    </Routes>
  );
}
