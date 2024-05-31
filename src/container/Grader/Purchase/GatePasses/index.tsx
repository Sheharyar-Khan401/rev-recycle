import { Route, Routes } from "react-router-dom";
import GatePasses from "container/Grader/Purchase/GatePasses/GatePasses";
import EditGatePass from "container/Grader/Purchase/GatePasses/EditGatePasses";
import { hasPermission } from "helper/utility";

export default function GatePassesNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<GatePasses />} />
        {(hasPermission("pur_gp_101")) &&
        <Route path="edit/:id/*" element={<EditGatePass />} />
}
      </>
    </Routes>
  );
}
