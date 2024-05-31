import { Route, Routes } from "react-router-dom";
import BankPaymentVouchers from "container/Grader/Finance/Vouchers/BankPaymentVouchers/BankPaymentVouchers";
import AddBankPaymentVoucher from "container/Grader/Finance/Vouchers/BankPaymentVouchers/AddBankPaymentVoucher";
import EditBankPaymentVoucher from "container/Grader/Finance/Vouchers/BankPaymentVouchers/EditBankPaymentVoucher";

export default function BankPaymentVoucherNavigation() {
  return (
    <Routes>
      <Route path="*" element={<BankPaymentVouchers />} />
      <Route path="add/*" element={<AddBankPaymentVoucher />} />
      <Route path="edit/:id/*" element={<EditBankPaymentVoucher />} />
    </Routes>
  );
}
