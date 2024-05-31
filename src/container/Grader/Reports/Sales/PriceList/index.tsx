import { Route, Routes } from "react-router-dom";
import PriceListReports from "container/Grader/Reports/Sales/PriceList/PriceListReports";

export default function PriceListNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<PriceListReports />} />
      </>
    </Routes>
  );
}
