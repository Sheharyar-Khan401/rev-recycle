import { Route, Routes } from "react-router-dom";
import ClearingInvoices from "container/Grader/Reports/Purchase/ClearingInvoices/clearingInvoices";
export default function ClearingInvoicesNavigation() {
  return (
    <Routes>
      <Route path="*" element={<ClearingInvoices />} />
    </Routes>
  );
}
