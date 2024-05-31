import Belts from "container/Grader/Settings/Productions/Belts/Belts";
import Stockrooms from "container/Grader/Settings/Productions/Stockrooms/Stockrooms";
import Categories from "container/Grader/Settings/Productions/Categories/Categories";
import Floors from "container/Grader/Settings/Productions/Floors/Floors";
import { Route, Routes } from "react-router-dom";
import SortedRooms from "container/Grader/Settings/Productions/SortedRooms/SortedRooms";
import LabelTypes from "container/Grader/Settings/Productions/LabelTypes/LabelTypes";
import Stations from "container/Grader/Settings/Productions/Stations/Stations";
import Cartons from "container/Grader/Settings/Productions/Cartons/Cartons";
import BrandsNavigation from "container/Grader/Settings/Productions/Brands/index";
import AccountSettingNavigation from "container/Grader/Settings/AccountSettings/index";
import Grades from "container/Grader/Settings/Productions/Grades/Grades";
import DepartmentsNavigation from "container/Grader/Settings/Productions/Departments/index";
import ItemsNavigation from "container/Grader/Settings/Productions/Items/index";
export default function ProductionsNavigation() {
  return (
    <Routes>
      <Route path="*" element={<Categories />} />
      <Route path="/belts" element={<Belts />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/items/*" element={<ItemsNavigation />} />
      <Route path="/stockrooms" element={<Stockrooms />} />
      <Route path="/floors" element={<Floors />} />
      <Route path="/sortedrooms" element={<SortedRooms />} />
      <Route path="/accountsetting/*" element={<AccountSettingNavigation />} />
      <Route path="/labeltypes" element={<LabelTypes />} />
      <Route path="/stations" element={<Stations />} />
      <Route path="/cartons" element={<Cartons />} />
      <Route path="/brands/*" element={<BrandsNavigation />} />
      <Route path="/grades/*" element={<Grades />} />
      <Route path="/departments/*" element={<DepartmentsNavigation />} />
    </Routes>
  );
}
