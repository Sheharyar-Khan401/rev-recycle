import { Navigate, Route, Routes } from "react-router-dom";
import IssuannceNavigation from "container/Grader/Production/Issuances/productionIssuance/index";

export default function IssuanceNavigations() {
  return (
    <>
      <Routes>
         
        <Route
          path="issuance/*"
          element={<IssuannceNavigation issuanceTypeId={1} />}
        />
        <Route
          path="wiperissuance/*"
          element={<IssuannceNavigation issuanceTypeId={3} />}
        />
        <Route
          path="mutilityissuance/*"
          element={<IssuannceNavigation issuanceTypeId={4} />}
        />
        <Route
          path="reproductionissuance/*"
          element={<IssuannceNavigation issuanceTypeId={2} />}
        />

        <Route
          path="/"
          element={
            <Navigate to="/grader/production/issuances/wiperissuance" replace />
          }
        />
      </Routes>
    </>
  );
}
