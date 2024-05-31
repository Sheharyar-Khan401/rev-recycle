import { Route, Routes } from "react-router-dom";
import Accounts from "container/Grader/Finance/PrimaryData/Accounts/Accounts";
import AddAccount from "container/Grader/Finance/PrimaryData/Accounts/AddAccount";
import EditAccount from "container/Grader/Finance/PrimaryData/Accounts/EditAccount";

export default function AccountNavigation() {
  return (
    <Routes>
      <Route path="*" element={<Accounts />} />
      <Route path="add/*" element={<AddAccount />} />
      <Route path="edit/:id/*" element={<EditAccount />} />
    </Routes>
  );
}
