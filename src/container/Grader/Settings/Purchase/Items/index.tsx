import { Route, Routes } from "react-router-dom";
import Items from "container/Grader/Settings/Purchase/Items/Items";
import AddItems from "container/Grader/Settings/Purchase/Items/AddItem";
import EditItem from "container/Grader/Settings/Purchase/Items/EditItem";

export default function index() {
  return (
    <Routes>
      <>
        <Route path="*" element={<Items />} />
        <Route path="add/*" element={<AddItems />} />
        <Route path="edit/:id/*" element={<EditItem />} />
      </>
    </Routes>
  );
}
