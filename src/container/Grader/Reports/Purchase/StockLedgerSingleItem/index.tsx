import { Route, Routes } from "react-router-dom";
import StockLedgerSingleItem from "container/Grader/Reports/Purchase/StockLedgerSingleItem/stockLedgerSingleItems";

export default function StockLedgerNavigation() {
  return (
    <Routes>
      <Route path="*" element={<StockLedgerSingleItem />} />
    </Routes>
  );
}
