import { Route, Routes } from "react-router-dom";
import AccountsList from "container/Grader/Reports/Finance/AccountsList/AccountsList";

export default function AccountsListNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<AccountsList />} />
      </>
    </Routes>
  );
}
