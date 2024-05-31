import { Navigate, Route, Routes } from "react-router-dom";
import CashPaymentVoucherNavigation from "./CashPaymentVouchers";
import CashReceiptVoucherNavigation from "./CashReceiptVouchers";
import BankReceiptVoucherNavigation from "./BankReceiptVouchers";
import BankPaymentVoucherNavigation from "./BankPaymentVouchers";
import JournelVoucherNavigation from "./JournelVouchers";

export default function VouchersNavigation() {
  return (
    <Routes>
      <Route path="cashpaymentvouchers/*" element={<CashPaymentVoucherNavigation />} />
      <Route path="cashreceiptvouchers/*" element={<CashReceiptVoucherNavigation />} />
      <Route path="bankreceiptvouchers/*" element={<BankReceiptVoucherNavigation />} />
      <Route path="bankpaymentvouchers/*" element={<BankPaymentVoucherNavigation />} />
      <Route path="journelvouchers/*" element={<JournelVoucherNavigation />} />
      <Route
        path="*"
        element={
          <Navigate to="cashpaymentvouchers" replace />
        }
      />
    </Routes>
  );
}
