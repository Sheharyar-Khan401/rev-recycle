import { Route, Routes } from "react-router-dom";
import AddCashReceiptVoucher from "container/Grader/Finance/Vouchers/CashReceiptVouchers/AddCashReceiptVoucher";
import CashReceiptVouchers from "container/Grader/Finance/Vouchers/CashReceiptVouchers/CashReceiptVouchers";
import EditCashReceiptVoucher from "container/Grader/Finance/Vouchers/CashReceiptVouchers/EditCashReceiptVoucher";

export default function CashReceiptVoucherNavigation() {
  return (
    <Routes>
      <Route path="*" element={<CashReceiptVouchers />} />
      <Route path="add/*" element={<AddCashReceiptVoucher />} />
      <Route path="edit/:id/*" element={<EditCashReceiptVoucher />} />
    </Routes>
  );
}
