import { Navigate, Route, Routes } from "react-router-dom";
import CustomInvoicesNavigation from "container/Grader/Purchase/Invoices/CustomInvoices/index";
import InvoiceDefaults from "container/Grader/Purchase/Invoices/InvoiceDefaults/InvoiceDefaults";
import Invoices from "container/Grader/Purchase/Invoices/Invoices";
import AddInvoice from "container/Grader/Purchase/Invoices/AddInvoice";
import EditInvoice from "container/Grader/Purchase/Invoices/EditInvoice";
import { hasPermission } from "helper/utility";

export default function InvoicesNavigation() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Invoices />} />
        {hasPermission("pur_pi_100") &&
        <Route path="add/*" element={<AddInvoice />} />
  }
        {hasPermission("pur_pi_101") &&
        <Route path="edit/:id/*" element={<EditInvoice />} />
  }
        <Route
          path="freightinvoices/*"
          element={<CustomInvoicesNavigation systemInvoiceId={2} />}
        />
        <Route
          path="clearinginvoices/*"
          element={<CustomInvoicesNavigation systemInvoiceId={3} />}
        />
        <Route
          path="deliveryorderinvoices/*"
          element={<CustomInvoicesNavigation systemInvoiceId={4} />}
        />
        <Route path="invoicedefaults/*" element={<InvoiceDefaults />} />
        <Route
          path="/"
          element={<Navigate to="/grader/purchase/invoices/" replace />}
        />
      </Routes>
    </>
  );
}
