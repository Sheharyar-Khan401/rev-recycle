import PurchaseReportsSideNav from "components/Reports/PurchaseReportsSidenav";
import Filters from "shared/Components/Filters";
import { useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
const materialData = [
  {
    id: 1,
    name: "material",
    quantity: 1,
  },
  {
    id: 2,
    name: "material1",
    quantity: 1,
  },
  {
    id: 3,
    name: "material2",
    quantity: 1,
  },
  {
    id: 4,
    name: "material3",
    quantity: 1,
  },
];
export default function StockLedger() {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div className="d-lg-flex">
      <div>
        <PurchaseReportsSideNav type={6} />
      </div>
      <div className="table-container">
        <Filters
          componentRef={ref}
          printAble={(materialData && materialData.length > 0) ?? false}
          exportAble={(materialData && materialData.length > 0) ?? false}
        />
        <DataTable
          ref={ref}
          isLoading={false}
          columns={[
            { label: "Id", field: "id" },
            { label: "Name", field: "name" },
            { label: "Quantity", field: "quantity" },
          ]}
          rows={
            materialData
              ? materialData?.map((item) => {
                  return {
                    id: item?.id,
                    name: item?.name,
                    quantity: item?.quantity,
                  };
                })
              : []
          }
        />
      </div>
    </div>
  );
}
