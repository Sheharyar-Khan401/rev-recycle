import { Route, Routes } from "react-router-dom";
import AddBankAccount from "container/Grader/Finance/PrimaryData/BankAccounts/AddBankAccount";
import BankAccounts from "container/Grader/Finance/PrimaryData/BankAccounts/BankAccounts";
import EditBankAccount from "container/Grader/Finance/PrimaryData/BankAccounts/EditBankAccount";

export default function BankAccountNavigation() {
  return (
    <Routes>
      <Route path="*" element={<BankAccounts />} />
      <Route path="add/*" element={<AddBankAccount />} />
      <Route path="edit/:id/*" element={<EditBankAccount />} />
    </Routes>
  );
}
