import { Route, Routes } from "react-router-dom";
import Dashboard from "./MainScreen/Dashboard";
import DashboardOverview from "../Production/Overview/Overview";

export default function ReportsNavigation() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
        <Route path="overview/*" element={<DashboardOverview />} />
      </Routes>
    </>
  );
}
