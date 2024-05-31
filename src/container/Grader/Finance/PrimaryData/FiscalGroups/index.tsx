import { Route, Routes } from "react-router-dom";
import AddFiscalGroup from "container/Grader/Finance/PrimaryData/FiscalGroups/AddFiscalGroup";
import EditFiscalGroup from "container/Grader/Finance/PrimaryData/FiscalGroups/EditFiscalGroup";
import FiscalGroups from "container/Grader/Finance/PrimaryData/FiscalGroups/FiscalGroups";

export default function FiscalGroupNavigation() {
  return (
    <Routes>
      <Route path="*" element={<FiscalGroups />} />
      <Route path="add/*" element={<AddFiscalGroup />} />
      <Route path="edit/:id/*" element={<EditFiscalGroup />} />
    </Routes>
  );
}
