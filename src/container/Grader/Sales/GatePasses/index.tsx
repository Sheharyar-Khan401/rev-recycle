import { Route, Routes } from "react-router-dom";
import GetPasses from "container/Grader/Sales/GatePasses/GatePasses";
import EditGatePass from "container/Grader/Sales/GatePasses/EditGatePass";
import { hasPermission } from "helper/utility";

export default function GetPassesNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<GetPasses />} />
        {hasPermission("sal_gp_101") && (
          <Route path="edit/:id" element={<EditGatePass />} />
        )}
      </>
    </Routes>
  );
}
