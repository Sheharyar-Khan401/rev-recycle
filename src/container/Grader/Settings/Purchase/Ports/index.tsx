import { Route, Routes } from "react-router-dom";
import Ports from "container/Grader/Settings/Purchase/Ports/Ports";

export default function PortsNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<Ports/>} />
      </>
    </Routes>
  );
}
