import { Route, Routes } from "react-router-dom";
import ClientItemRates from "container/Grader/Sales/ClientsItemsRates/ClientItemsRates";

export default function ClientItemsRatesNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<ClientItemRates />} />
      </>
    </Routes>
  );
}
