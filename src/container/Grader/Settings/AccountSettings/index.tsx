import { Navigate, Route, Routes } from "react-router-dom";
import Production from "container/Grader/Settings/AccountSettings/Production";
import Purchase from "container/Grader/Settings/AccountSettings/Puchase";
import Sale from "container/Grader/Settings/AccountSettings/Sale";
import Common from "container/Grader/Settings/AccountSettings/Common";

export default function AccountSettingNavigation() {
  return (
    <>
      <Routes>
        {/* <Route path="*" element={<Purchase />} /> */}
        <Route path="purchase/*" element={<Purchase />} />
        <Route path="production/*" element={<Production />} />
        <Route path="sale/*" element={<Sale />} />
        <Route path="common/*" element={<Common />} />
        <Route
          path="/"
          element={<Navigate to="/grader/settings/accountsetting/purchase" replace />}
        />
      </Routes>
    </>
  );
}
