import { Route, Routes } from "react-router-dom";
import AddCostGroup from "container/Grader/Finance/PrimaryData/CostGroups/AddCostGroup";
import CostGroups from "container/Grader/Finance/PrimaryData/CostGroups/CostGroups";
import EditCostGroup from "container/Grader/Finance/PrimaryData/CostGroups/EditCostGroup";

export default function CostGroupNavigation() {
  return (
    <Routes>
      <Route path="*" element={<CostGroups />} />
      <Route path="add/*" element={<AddCostGroup />} />
      <Route path="edit/:id/*" element={<EditCostGroup />} />
    </Routes>
  );
}
