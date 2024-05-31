import { Route, Routes } from "react-router-dom";
import AddOrder from "container/Grader/Purchase/Orders/AddOrder";
import EditOrder from "container/Grader/Purchase/Orders/EditOrder";
import Orders from "container/Grader/Purchase/Orders/Orders";
import { hasPermission } from "helper/utility";

export default function OrdersNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<Orders />} />
        {(hasPermission("pur_gp_100")) &&
        <Route path="add/*" element={<AddOrder />} />
  }
  {(hasPermission("pur_gp_101")) &&
        <Route path="edit/:id/*" element={<EditOrder />} />
}
      </>
    </Routes>
  );
}
