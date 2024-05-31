import { Route, Routes } from "react-router-dom";
import StockroomBalanceReports from "container/Grader/Reports/Production/StockRoomBalance/StockroomBalanceReports";

export default function StockRoomBalanceNavigation() {
  return (
    <Routes>
      <Route path="*" element={<StockroomBalanceReports />} />
    </Routes>
  );
}
