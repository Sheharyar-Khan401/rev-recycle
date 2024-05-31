import { Route, Routes } from "react-router-dom";
import ClearingInvoice from "container/Grader/Reports/Purchase/RawMaterial/RawMaterial";

export default function ClearingInvoiceNavigation() {
  return (
    <Routes>
      <Route path="*" element={<ClearingInvoice />} />
    </Routes>
  );
}
