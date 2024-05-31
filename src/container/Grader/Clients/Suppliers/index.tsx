import { Route, Routes } from "react-router-dom";
import AddSupplier from "container/Grader/Clients/Suppliers/AddSupplier";
import EditSupplier from "container/Grader/Clients/Suppliers/EditSupplier";
import SupplierListing from "container/Grader/Clients/Suppliers/SupplierListing";
import { hasPermission } from "helper/utility";

export default function SuppliersNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<SupplierListing />} />
        {hasPermission("cli_sp_100") && (
          <Route path="add/*" element={<AddSupplier />} />
        )}
        {hasPermission("cli_sp_101") && (
          <Route path="edit/:id/*" element={<EditSupplier />} />
        )}
      </>
    </Routes>
  );
}
