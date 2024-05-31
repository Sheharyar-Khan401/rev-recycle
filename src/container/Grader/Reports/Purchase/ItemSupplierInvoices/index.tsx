import { Route, Routes } from "react-router-dom";
import ItemSupplierInvoices from "container/Grader/Reports/Purchase/ItemSupplierInvoices/itemSupplierInoices";

export default function ItemSupplierInvoicesNavigation() {
  return (
    <Routes>
      <Route path="*" element={<ItemSupplierInvoices />} />
    </Routes>
  );
}
