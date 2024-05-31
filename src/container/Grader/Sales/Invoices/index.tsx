import { Navigate, Route, Routes } from "react-router-dom";
import CustomInvoicesNavigation from "container/Grader/Sales/Invoices/CustomInvoices/index";
import Invoices from "container/Grader/Sales/Invoices/Invoices";
import AddInvoice from "container/Grader/Sales/Invoices/AddInvoice";
import EditInvoice from "container/Grader/Sales/Invoices/EditInvoice";
import { hasPermission } from "helper/utility";

export default function SalesInvoicesNavigation() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Invoices />} />
        {hasPermission("sal_si_100") && (
          <Route path="add/*" element={<AddInvoice />} />
        )}
        {hasPermission("sal_si_101") && (
          <Route path="edit/:id/*" element={<EditInvoice />} />
        )}
        <Route
          path="freightinvoices/*"
          element={<CustomInvoicesNavigation systemInvoiceId={7} />}
        />
        <Route
          path="clearinginvoices/*"
          element={<CustomInvoicesNavigation systemInvoiceId={6} />}
        />
        <Route
          path="cncinvoices/*"
          element={<CustomInvoicesNavigation systemInvoiceId={8} />}
        />
        <Route
          path="otherinvoices/*"
          element={<CustomInvoicesNavigation systemInvoiceId={9} />}
        />
        <Route
          path="/"
          element={<Navigate to="/grader/sales/invoices/" replace />}
        />
      </Routes>
    </>
  );
}
