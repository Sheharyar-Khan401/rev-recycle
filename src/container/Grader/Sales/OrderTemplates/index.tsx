import { Route, Routes } from "react-router-dom";
import OrderTemplates from "container/Grader/Sales/OrderTemplates/OrderTemplates";
import AddOrderTemplate from "container/Grader/Sales/OrderTemplates/AddOrdertemplate";
import EditOrderTemplate from "container/Grader/Sales/OrderTemplates/EditOrderTemplate";
import { hasPermission } from "helper/utility";


export default function OrderTemplatesNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<OrderTemplates />} />
        {hasPermission("sal_ot_100") && (
          <Route path="add/*" element={<AddOrderTemplate />} />
        )}
        {hasPermission("sal_ot_101") && (
          <Route path="edit/:id" element={<EditOrderTemplate />} />
        )}
        {/* <Route path="editOrderTemplate" element={<EditOrderTemplate />} /> */}
      </>
    </Routes>
  );
}
