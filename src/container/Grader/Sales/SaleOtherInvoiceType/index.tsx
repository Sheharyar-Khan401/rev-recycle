import { Route, Routes } from "react-router-dom";
import SaleOtherInvoiceType from "container/Grader/Sales/SaleOtherInvoiceType/SaleOtherInvoiceType";

export default function SaleOtherInvoiceTypeNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<SaleOtherInvoiceType />} />
      </>
    </Routes>
  );
}
