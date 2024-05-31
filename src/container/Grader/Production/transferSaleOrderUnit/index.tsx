import { Route, Routes } from "react-router-dom";
import TransferSaleOrderUnit from "container/Grader/Production/transferSaleOrderUnit/transferSaleOrderUnit"
import AddTransferSaleOrderUnit from "container/Grader/Production/transferSaleOrderUnit/addTransferSaleOrderUnit"
import EditTransferSaleOrderUnit from "container/Grader/Production/transferSaleOrderUnit/editTransferSaleOrderUnit"
import { hasPermission } from "helper/utility";
export default function index() {
  return (
    <Routes>
      <>
        <Route path="*" element={<TransferSaleOrderUnit />} />
        {hasPermission("pro_tsou_100") && (
        <Route path="add/*" element={<AddTransferSaleOrderUnit />} />
        )}
        {hasPermission("pro_tsou_101") && (
        <Route path="edit/:id/*" element={<EditTransferSaleOrderUnit />} />
        )}
      </>
    </Routes>
  );
}
