import { Route, Routes } from "react-router-dom";
import ChargeTypes from "container/Grader/Settings/Purchase/ChargeTypes/ChargeTypes";

export default function ChargeTypeNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<ChargeTypes />} />\
      </>
    </Routes>
  );
}
