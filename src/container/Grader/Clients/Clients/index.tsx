import { Route, Routes } from "react-router-dom";
import AddClient from "container/Grader/Clients/Clients/AddClient";
import ClientListing from "container/Grader/Clients/Clients/ClientListing";
import EditClient from "container/Grader/Clients/Clients/EditClient";
import { hasPermission } from "helper/utility";

export default function ClientsNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<ClientListing />} />
        {hasPermission("cli_cl_100") && (
          <Route path="add/*" element={<AddClient />} />
        )}
        {hasPermission("cli_cl_101") && (
          <Route path="edit/:id/*" element={<EditClient />} />
        )}
      </>
    </Routes>
  );
}
