import { Route, Routes } from "react-router-dom";
import AddJournelVoucher from "container/Grader/Finance/Vouchers/JournelVouchers/AddJournelVoucher";
import EditJournelVoucher from "container/Grader/Finance/Vouchers/JournelVouchers/EditJournelVoucher";
import JournelVouchers from "container/Grader/Finance/Vouchers/JournelVouchers/JournelVouchers";

export default function JournelVoucherNavigation() {
  return (
    <Routes>
      <Route path="*" element={<JournelVouchers />} />
      <Route path="add/*" element={<AddJournelVoucher />} />
      <Route path="edit/:id/*" element={<EditJournelVoucher />} />
    </Routes>
  );
}
