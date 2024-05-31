import { Route, Routes } from "react-router-dom";
import FreightInvoices from "container/Grader/Reports/Purchase/FreightInvoices/freightInvoices";

export default function FreightInvoicesNavigation() {
  return (
    <Routes>
      <Route path="*" element={<FreightInvoices />} />
    </Routes>
  );
}
