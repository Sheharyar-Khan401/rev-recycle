import { Navigate, Route, Routes } from "react-router-dom";
import DetailedOutwardGatePass from "container/Grader/Reports/Sales/DetailedOutwardGatePass/index";
import CustomerGatePassNavigation from "container/Grader/Reports/Sales/CustomerGatePass/index";
import PriceListNavigation from "container/Grader/Reports/Sales/PriceList/index";
import DailyProductionProfit from "container/Grader/Reports/Sales/DailyProductionProfit/index";
import ProductionProfit from "container/Grader/Reports/Sales/ProductionProfit/index";
import DetailedOutwardGatePass2 from "container/Grader/Reports/Sales/DetailedOutwardGatePass2/index";
import InvoicePriceComparison from "container/Grader/Reports/Sales/InvoicePriceComparison/index";
import ItemCustomerGatePass from "container/Grader/Reports/Sales/ItemCustomerGatePassLeveled/index";
import OrderStatuses from "container/Grader/Reports/Sales/OrderStatuses/index";
import PriceComparison from "container/Grader/Reports/Sales/PriceComparison/index";

export default function SalesFinanceNavigation() {
  return (
    <>
      <Routes>
        <Route
          path="detailedoutwardgatepass/*"
          element={<DetailedOutwardGatePass />}
        />
        <Route
          path="customergatepass/*"
          element={<CustomerGatePassNavigation />}
        />
        <Route path="pricelist/*" element={<PriceListNavigation />} />
        <Route
          path="dailyproductionprofit/*"
          element={<DailyProductionProfit />}
        />
        <Route path="productionprofit/*" element={<ProductionProfit />} />
        <Route
          path="detailedoutwardgatepass2/*"
          element={<DetailedOutwardGatePass2 />}
        />
        <Route
          path="invoicepricecomparison/*"
          element={<InvoicePriceComparison />}
        />
        <Route
          path="itemcustomergatepassleveled/*"
          element={<ItemCustomerGatePass />}
        />
        <Route path="orderstatuses/*" element={<OrderStatuses />} />
        <Route path="pricecomparison/*" element={<PriceComparison />} />

        <Route
          path="/"
          element={
            <Navigate
              to="/grader/reports/sales/pricelist"
              replace
            />
          }
        />
      </Routes>
    </>
  );
}
