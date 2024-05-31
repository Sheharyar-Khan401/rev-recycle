import { Route, Routes } from "react-router-dom";
import ContainersCosts from "./ContainersCosts";

export default function ClearingInvoiceNavigation() {
  return (
    <Routes>
      <Route path="*" element={<ContainersCosts />} />
    </Routes>
  );
}
