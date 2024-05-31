import PurchaseReportsSideNav from "components/Reports/PurchaseReportsSidenav";
import Filters from "shared/Components/Filters";
import { useRef, useState } from "react";
import DataTable from "shared/Components/DataTable";
const transitData = [
  {
    id: 1,
    name: "Transit",
    quantity: 1,
  },
  {
    id: 1,
    name: "Transit",
    quantity: 1,
  },
  {
    id: 1,
    name: "Transit",
    quantity: 1,
  },
  {
    id: 1,
    name: "Transit",
    quantity: 1,
  },
];

export default function TransitLeveled() {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div className="d-lg-flex">
      <div>
        <PurchaseReportsSideNav type={4} />
      </div>
      <div className="table-container">
        <Filters
          componentRef={ref}
          printAble={(transitData && transitData.length > 0) ?? false}
          exportAble={(transitData && transitData.length > 0) ?? false}
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
            transitData
              ? transitData?.map((item) => {
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
