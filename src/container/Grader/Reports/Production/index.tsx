import { Navigate, Route, Routes } from "react-router-dom";
import StockRoomBalanceNavigation from "container/Grader/Reports/Production/StockRoomBalance/index";
import StockRoomLedgerNavigation from "container/Grader/Reports/Production/StockRoomLedger/index";
import DailyProductionReportsNavigation from "container/Grader/Reports/Production/DailyProduction/index";
import IssuancesReports from "container/Grader/Reports/Production/Issuance/IssuancesReports"
import TransferSaleOrderUnitsReports from "container/Grader/Reports/Production/TransferSaleOrderUnits/TransferSaleOrderUnitsReports"
import LedgerReport from "./Ledger/Ledger";
import IssuanceBySupplier from "./IssuanceBySupplier";
import ProductionByLabel from "./ProductionByLabel";
export default function ReportsProductionNavigation() {
  return (
    <>
      <Routes>
        <Route
          path="stockroombalance/*"
          element={<StockRoomBalanceNavigation />}
        />
        <Route
          path="transfersaleorderunits/*"
          element={<TransferSaleOrderUnitsReports />}
        />
        <Route
          path="stockroomledger/*"
          element={<StockRoomLedgerNavigation />}
        />
        <Route
          path="dailyproduction/*"
          element={<DailyProductionReportsNavigation />}
        />
        <Route path="wiper/*" element={<IssuancesReports issuanceTypeId={3} />} />
        <Route path="production/*" element={<IssuancesReports issuanceTypeId={1} />} />
        <Route
          path="reproduction/*"
          element={<IssuancesReports issuanceTypeId={2} />}
        />
        <Route path="mutility/*" element={<IssuancesReports issuanceTypeId={4} />} />
        <Route path="ledger/*" element={<LedgerReport />} />
        <Route path="issuancebysupplier/*" element={<IssuanceBySupplier />} />
        <Route path="productionbylabel/*" element={<ProductionByLabel />} />

        <Route
          path="/"
          element={
            <Navigate
              to="/grader/reports/production/stockroombalance"
              replace
            />
          }
        />
      </Routes>
    </>
  );
}
