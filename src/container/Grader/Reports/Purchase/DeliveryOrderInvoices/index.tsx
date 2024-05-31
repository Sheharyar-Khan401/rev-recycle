import { Route, Routes } from "react-router-dom";
import DeliveryOrderInvoices from "container/Grader/Reports/Purchase/DeliveryOrderInvoices/deliveryOrderInvoices";

export default function FreightInvoicesNavigation() {
  return (
    <Routes>
      <Route path="*" element={<DeliveryOrderInvoices />} />
    </Routes>
  );
}
