import { Route, Routes } from "react-router-dom";
import AddCashPaymentVoucher from "container/Grader/Finance/Vouchers/CashPaymentVouchers/AddCashPaymentVoucher";
import CashPaymentVouchers from "container/Grader/Finance/Vouchers/CashPaymentVouchers/CashPaymentVouchers";
import EditCashPaymentVoucher from "container/Grader/Finance/Vouchers/CashPaymentVouchers/EditCashPaymentVoucher";

export default function CashPaymentVoucherNavigation() {
  return (
    <Routes>
      <Route path="*" element={<CashPaymentVouchers />} />
      <Route path="add/*" element={<AddCashPaymentVoucher />} />
      <Route path="edit/:id/*" element={<EditCashPaymentVoucher />} />
    </Routes>
  );
}
