import { Route, Routes } from "react-router-dom";
import BulkUnpostInvoice from "container/Grader/Sales/BulkUnpostInvoice/BulkUnpostInvoice";

export default function BulkUnpostInvoiceNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<BulkUnpostInvoice />} />
      </>
    </Routes>
  );
}
