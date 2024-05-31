import { Route, Routes } from "react-router-dom";
import AddBankReceiptVoucher from "container/Grader/Finance/Vouchers/BankReceiptVouchers/AddBankReceiptVoucher";
import BankReceiptVouchers from "container/Grader/Finance/Vouchers/BankReceiptVouchers/BankReceiptVouchers";
import EditBankReceiptVoucher from "container/Grader/Finance/Vouchers/BankReceiptVouchers/EditBankReceiptVoucher";

export default function BankReceiptVoucherNavigation() {
  return (
    <Routes>
      <Route path="*" element={<BankReceiptVouchers />} />
      <Route path="add/*" element={<AddBankReceiptVoucher />} />
      <Route path="edit/:id/*" element={<EditBankReceiptVoucher />} />
    </Routes>
  );
}
