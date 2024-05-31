import { Route, Routes } from "react-router-dom";
import Currency from "container/Grader/Settings/Finance/Currency/Currency";
import Settings from "container/Grader/Settings/Finance/Settings/Settings";

export default function FinanceNavigation() {
  return (
    <>
      <Routes>
        <>
          <Route path="*" element={<Currency />} />
          <Route path="currency/*" element={<Currency />} />
          <Route path="settings/*" element={<Settings />} />
        </>
      </Routes>
    </>
  );
}
