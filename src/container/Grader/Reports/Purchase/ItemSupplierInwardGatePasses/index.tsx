import { Route, Routes } from "react-router-dom";
import ItemSupplierInwardGatePassReports from "container/Grader/Reports/Purchase/ItemSupplierInwardGatePasses/ItemSupplierInwardGatePassReports";

export default function ItemSupplierInwardGatePassesNavigation() {
  return (
    <Routes>
      <Route path="*" element={<ItemSupplierInwardGatePassReports />} />
    </Routes>
  );
}
