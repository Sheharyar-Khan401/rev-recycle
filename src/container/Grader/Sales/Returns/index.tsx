import { Route, Routes } from "react-router-dom";
import Return from "container/Grader/Sales/Returns/Returns";

export default function ReturnsNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<Return />} />
      </>
    </Routes>
  );
}
