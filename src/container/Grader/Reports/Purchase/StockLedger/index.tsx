import { Route, Routes } from "react-router-dom";
import StockLedger from "container/Grader/Reports/Purchase/StockLedger/StockLedger";

export default function StockLedgerNavigation() {
  return (
    <Routes>
      <Route path="*" element={<StockLedger />} />
    </Routes>
  );
}
