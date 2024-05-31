import { Route, Routes } from "react-router-dom";
import InvoicePriceComparisonReports from "container/Grader/Reports/Sales/InvoicePriceComparison/InvoicePriceComparisonReports"

export default function InvoicePriceComparisonNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<InvoicePriceComparisonReports />} />
      </>
    </Routes>
  );
}
