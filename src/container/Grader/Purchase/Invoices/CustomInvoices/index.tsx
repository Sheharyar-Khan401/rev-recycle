import { Route, Routes } from "react-router-dom";
import AddCustomInvoice from "container/Grader/Purchase/Invoices/CustomInvoices/AddCustomInvoice";
import EditCustomInvoice from "container/Grader/Purchase/Invoices/CustomInvoices/EditCustomInvoice";
import CustomInvoices from "container/Grader/Purchase/Invoices/CustomInvoices/CustomInvoices";
import { hasPermission } from "helper/utility";

export default function CustomInvoicesNavigation({
  systemInvoiceId,
}: {
  systemInvoiceId: number;
}) {
  return (
    <Routes>
      <>
        <Route
          path="*"
          element={<CustomInvoices systemInvoiceId={systemInvoiceId} />}
        />
        {hasPermission("pur_pi_100") &&
        <Route
          path="add/*"
          element={<AddCustomInvoice systemInvoiceId={systemInvoiceId} />}
        />
  }
          {hasPermission("pur_pi_101") &&
        <Route
          path="edit/:id/*"
          element={<EditCustomInvoice systemInvoiceId={systemInvoiceId} />}
        />
}
      </>
    </Routes>
  );
}
