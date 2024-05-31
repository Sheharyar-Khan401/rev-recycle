import { Route, Routes } from "react-router-dom";
import ItemCustomerGPLevelReports from "container/Grader/Reports/Sales/ItemCustomerGatePassLeveled/ItemCustomerGPLevelReports"

export default function ItemCustomerGatePassNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<ItemCustomerGPLevelReports />} />
      </>
    </Routes>
  );
}
