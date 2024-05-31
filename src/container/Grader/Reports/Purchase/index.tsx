import { Navigate, Route, Routes } from "react-router-dom";
import RawMaterial from "container/Grader/Reports/Purchase/RawMaterial/index";
import DetailedInwardNavigation from "container/Grader/Reports/Purchase/DetailedInwardGatePass/index";
import TransitNavigation from "container/Grader/Reports/Purchase/Transit/index";
import TransitLeveledNavigation from "container/Grader/Reports/Purchase/TransitLeveled/index";
import RawMaterialLeveled from "container/Grader/Reports/Purchase/RawmaterialLeveled/index";
import StockLedger from "container/Grader/Reports/Purchase/StockLedger/index"
import StockLedgerSingleItem from "container/Grader/Reports/Purchase/StockLedgerSingleItem/index"
import IssuedMaterial from "container/Grader/Reports/Purchase/IssuedMaterial/index"
import ItemSupplierInvoices from "container/Grader/Reports/Purchase/ItemSupplierInvoices/index"
import FreightInvoices from "container/Grader/Reports/Purchase/FreightInvoices/index"
import DeliveryOrderInvoices from "container/Grader/Reports/Purchase/DeliveryOrderInvoices/index"
import ClearingInvoices from "container/Grader/Reports/Purchase/ClearingInvoices/index"
import StockRoomItems from "container/Grader/Reports/Purchase/StockRoomItems/index"
import RawBalances from "container/Grader/Reports/Purchase/RawBalances/index"
import ItemSupplierInwardGatePassesNavigation from "container/Grader/Reports/Purchase/ItemSupplierInwardGatePasses/index";
import ContainersCosts from "./ContainersCosts/ContainersCosts";


export default function ReportsPurchaseNavigation() {
  return (
    <>
      <Routes>
        <Route path="rawmaterial/*" element={<RawMaterial />} />
        <Route path="containerscosts/*" element={<ContainersCosts />} />
        <Route path="detailedinwardgatepass/*" element={<DetailedInwardNavigation />} />
        <Route path="containerintransit/*" element={<TransitNavigation />} />
        <Route path="containerintransitleveled/*" element={<TransitLeveledNavigation />} />
        <Route path="rawmaterialleveled/*" element={<RawMaterialLeveled />} />
        <Route path="stockledger/*" element={<StockLedger />} />
        <Route path="stockledgersingleitem/*" element={<StockLedgerSingleItem />} />
        <Route path="issuedmaterial/*" element={<IssuedMaterial />} />
        <Route path="itemsupplierinwardgatepasses/*" element={<ItemSupplierInwardGatePassesNavigation />} />
        <Route path="itemsupplierinvoices/*" element={<ItemSupplierInvoices />} />
        <Route path="freightinvoices/*" element={<FreightInvoices />} />
        <Route path="deliveryorderinvoices/*" element={<DeliveryOrderInvoices />} />
        <Route path="clearinginvoices/*" element={<ClearingInvoices />} />
        <Route path="stockroomitems/*" element={<StockRoomItems />} />
        <Route path="rawbalances/*" element={<RawBalances />} />
        <Route
          path="/"
          element={<Navigate to="/grader/reports/purchase/containerintransit" replace />}
        />
      </Routes>
    </>
  );
}
