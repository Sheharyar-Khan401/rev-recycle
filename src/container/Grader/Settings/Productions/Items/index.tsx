import { Route, Routes } from "react-router-dom";
import Items from 'container/Grader/Settings/Productions/Items/Items';
import AddItems from 'container/Grader/Settings/Productions/Items/addItems';
import EditItems from 'container/Grader/Settings/Productions/Items/editItems';

export default function ItemsNavigation() {
  return (
    <Routes >
      <>
        <Route path="*" element={<Items />} />
        <Route path="add/*" element={<AddItems />} />
        <Route path="edit/:id/*" element={<EditItems />} />
      </>
    </Routes>
  );
}
