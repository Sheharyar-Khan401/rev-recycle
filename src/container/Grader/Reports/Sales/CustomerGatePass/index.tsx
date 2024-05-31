import { Route, Routes } from "react-router-dom";
import CustomerGatePass from "container/Grader/Reports/Sales/CustomerGatePass/CustomerGatePass";

export default function CustomerGatePassNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<CustomerGatePass />} />
      </>
    </Routes>
  );
}
