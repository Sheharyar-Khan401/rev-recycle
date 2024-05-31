import { Route, Routes } from "react-router-dom";
import OrderStatuses from "container/Grader/Reports/Sales/OrderStatuses/orderStatues";

export default function OrderStatusesNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<OrderStatuses />} />
      </>
    </Routes>
  );
}
