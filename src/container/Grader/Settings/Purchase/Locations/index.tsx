import { Route, Routes } from "react-router-dom";
import Locations from "container/Grader/Settings/Purchase/Locations/Locations";

export default function LocationsNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<Locations />} />
      </>
    </Routes>
  );
}
