import { Route, Routes } from "react-router-dom";
import PriceComparison from "container/Grader/Reports/Sales/PriceComparison/priceComparsion";

export default function OrderStatusesNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<PriceComparison />} />
      </>
    </Routes>
  );
}
