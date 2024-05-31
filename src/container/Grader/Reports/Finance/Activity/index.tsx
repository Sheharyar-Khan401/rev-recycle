import { Route, Routes } from "react-router-dom";
import Activity from "container/Grader/Reports/Finance/Activity/Activity";

export default function ActivityNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<Activity />} />
      </>
    </Routes>
  );
}
