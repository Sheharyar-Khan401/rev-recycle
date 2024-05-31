import { Route, Routes } from "react-router-dom";
import StockRoomItems from "container/Grader/Reports/Purchase/StockRoomItems/stockRoomItems";
export default function StockRoomItemsNavigation() {
  return (
    <Routes>
      <Route path="*" element={<StockRoomItems />} />
    </Routes>
  );
}
