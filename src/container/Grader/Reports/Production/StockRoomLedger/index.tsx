import { Route, Routes } from "react-router-dom";
import StockRoomLedgerData from "container/Grader/Reports/Production/StockRoomLedger/StockRoomLedger";

export default function StockRoomLedger() {
  return (
    <Routes>
      <>
        <Route path="*" element={<StockRoomLedgerData />} />
      </>
    </Routes>
  );
}
