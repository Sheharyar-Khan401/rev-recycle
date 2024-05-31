import Filters from "shared/Components/Filters";
import { useRef, useState } from "react";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import ProductionReportsSidenav from "components/Reports/ProductionReporsSidenav";
const stockRoomData = [
  {
    id: 1,
    name: "stockroom1",
    quantity: 1,
  },
  {
    id: 2,
    name: "stockroom2",
    quantity: 1,
  },
  {
    id: 3,
    name: "stockroom3",
    quantity: 1,
  },
  {
    id: 4,
    name: "stockroom4",
    quantity: 1,
  },
];

export default function StockRoomLedger() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
  });
  return (
    <>
      <div>
        <div className="d-lg-flex">
          <ProductionReportsSidenav type={2} />
          <div className="table-container">
            <Filters
              componentRef={ref}
              printAble={(stockRoomData && stockRoomData.length > 0) ?? false}
              exportAble={(stockRoomData && stockRoomData.length > 0) ?? false}
            />
            <DataTable
              ref={ref}
              isLoading={false}
              totalItems={10}
              setOffset={(offset, limit) => {
                setQueryParams({
                  ...queryParams,
                  pageNumber: offset,
                  pageSize: limit ? limit : globalVariables.ItemsPerPageLimit,
                });
              }}
              columns={[
                { label: "Item", field: "item" },
                { label: "Category", field: "category" },
                { label: "Opening Units", field: "openingUnits" },
                { label: "Opening KGS", field: "openingKgs" },
                { label: "Production Units", field: "productionUnits" },
                { label: "Production KGS", field: "productionKgs" },
                { label: "Issuance Units", field: "issuanceUnits" },
                { label: "Issuance KGS", field: "issuanceKgs" },
                { label: "Sale Units", field: "saleUnits" },
                { label: "Sale KGS", field: "saleKgs" },
                { label: "Sale Retun Units", field: "saleReturnUnits" },
                { label: "Sale Return KGS", field: "saleReturnKgs" },
                { label: "Closing Units", field: "closingUnits" },
                { label: "Closing KGS", field: "closingKgs" },
              ]}
              rows={
                stockRoomData
                  ? stockRoomData?.map((item) => {
                      return {
                        item: "Item",
                        category: "Category",
                        openingUnits: 1,
                        openingKgs: 1,
                        productionUnits: 1,
                        productionKgs: 1,
                        issuanceUnits: 1,
                        issuanceKgs: 1,
                        saleUnits: 1,
                        saleKgs: 1,
                        saleReturnUnits: 1,
                        saleReturnKgs: 1,
                        closingUnits: 1,
                        closingKgs: 1,
                      };
                    })
                  : []
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
