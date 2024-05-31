import { Route, Routes } from "react-router-dom";
import DailyProduction from "container/Grader/Production/DailyProduction/dailyProductions";
import AddDailyProduction from "container/Grader/Production/DailyProduction/addDailyProduction";
import EditDailyProduction from "container/Grader/Production/DailyProduction/editDailyProduction";
import { hasPermission } from "helper/utility";

export default function index() {
  return (
    <Routes>
      <>
        <Route path="*" element={<DailyProduction />} />
        {hasPermission("pro_dp_100") && (
        <Route path="add/*" element={<AddDailyProduction />} />
        )}
         {hasPermission("pro_dp_101") && (
        <Route path="edit/:id/*" element={<EditDailyProduction />} />
         )}
      </>
    </Routes>
  );
}
