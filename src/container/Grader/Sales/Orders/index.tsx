import { Route, Routes } from "react-router-dom";
import Orders from "container/Grader/Sales/Orders/Orders";
import AddSaleOrder from "container/Grader/Sales/Orders/AddOrders";
import EditSaleOrder from "container/Grader/Sales/Orders/EditSaleOrder";
import { hasPermission } from "helper/utility";

export default function OrdersNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<Orders />} />
        {hasPermission("sal_so_100") && (
          <Route path="add/*" element={<AddSaleOrder />} />
        )}
        {hasPermission("sal_so_101") && (
          <Route path="edit/:id*" element={<EditSaleOrder />} />
        )}
        {/* <Route path="editOrderTemplate" element={<EditOrderTemplate />} /> */}
      </>
    </Routes>
  );
}
