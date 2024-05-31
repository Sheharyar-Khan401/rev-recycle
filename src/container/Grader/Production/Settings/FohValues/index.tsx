import { Route, Routes } from "react-router-dom";
import FohValues from "container/Grader/Production/Settings/FohValues/FohValues";

export default function FOHValuesNavigation() {
  return (
    <Routes >
      <>
        <Route path="*" element={<FohValues />} />
      </>
    </Routes>
  );
}
