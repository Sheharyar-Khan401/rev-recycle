import { Route, Routes } from "react-router-dom";
import IssuedMaterial from "container/Grader/Reports/Purchase/IssuedMaterial/issuedMaterial";

export default function IssuedMaterialNavigation() {
  return (
    <Routes>
      <Route path="*" element={<IssuedMaterial />} />
    </Routes>
  );
}
