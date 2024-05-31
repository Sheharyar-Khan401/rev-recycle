import { Route, Routes } from "react-router-dom";

import Types from "container/Grader/Settings/Purchase/Types/Types";

export default function TypesNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<Types />} />
      </>
    </Routes>
  );
}
