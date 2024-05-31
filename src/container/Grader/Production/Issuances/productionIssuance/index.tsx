import { Route, Routes } from "react-router-dom";
import Issuances from "container/Grader/Production/Issuances/productionIssuance/Issuances";
import EditIssuances from "container/Grader/Production/Issuances/productionIssuance/EditIssuance";
import AddIssuance from "container/Grader/Production/Issuances/productionIssuance/AddIssuance";
import { hasPermission } from "helper/utility";
interface Props{
  issuanceTypeId:number;
}
export default function index({issuanceTypeId}:Props) {
  return (
    <Routes>
      <>
        <Route path="*" element={<Issuances issuanceTypeId={issuanceTypeId} />} />
        {hasPermission("pro_issu_100") && (
        <Route path="add/*" element={<AddIssuance issuanceTypeId={issuanceTypeId} />} />
        )}
        {hasPermission("pro_issu_101") && (
        <Route path="edit/:id/*" element={<EditIssuances issuanceTypeId={issuanceTypeId} />} />
        )}
      </>
    </Routes>
  );
}
