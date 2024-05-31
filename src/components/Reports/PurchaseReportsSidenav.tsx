import Sidebar from "shared/Components/Sidebar/Sidebar";
interface Props {
  type: number;
}
export default function PurchaseReportsSideNav({ type }: Props) {
  return (
    <>
      <Sidebar
        title="Purchase"
        type={type}
        navigations={[
          {
            type: 1,
            name: "Container in Transit",
            route: "/grader/reports/purchase/containerintransit",
          },
          // {
          //   type: 4,
          //   name: "Container in Transit(Leveled)",
          //   route: "/grader/reports/purchase/containerintransitleveled",
          // },
          {
            type: 2,
            name: "Detailed Inward Gate Pass",
            route: "/grader/reports/purchase/detailedinwardgatepass",
          },
          {
            type: 3,
            name: "Raw Material",
            route: "/grader/reports/purchase/rawmaterial",
          },
          // {
          //   type: 5,
          //   name: "Raw Material(Leveled)",
          //   route: "/grader/reports/purchase/rawmaterialleveled",
          // },
          // {
          //   type: 6,
          //   name: "Stock Ledger",
          //   route: "/grader/reports/purchase/stockledger",
          // },
          // {
          //   type: 7,
          //   name: "Stock Ledger(Single Item)",
          //   route: "/grader/reports/purchase/stockledgersingleitem",
          // },
          {
            type: 8,
            name: "Issued Material",
            route: "/grader/reports/purchase/issuedmaterial",
          },
          {
            type: 9,
            name: "Item Supplier Inward Gate Pass",
            route: "/grader/reports/purchase/itemsupplierinwardgatepasses",
          },
          {
            type: 10,
            name: "Item Supplier Invoices",
            route: "/grader/reports/purchase/itemsupplierinvoices",
          },
          {
            type: 11,
            name: "Freight Invoices",
            route: "/grader/reports/purchase/freightinvoices",
          },
          // {
          //   type: 12,
          //   name: "Delivery Order Invoices",
          //   route: "/grader/reports/purchase/deliveryorderinvoices",
          // },
          {
            type: 13,
            name: "Clearing Invoices",
            route: "/grader/reports/purchase/clearinginvoices",
          },
          {
            type: 14,
            name: "Stock Room Items",
            route: "/grader/reports/purchase/stockroomitems",
          },
          // {
          //   type: 15,
          //   name: "Raw Vs Balances",
          //   route: "/grader/reports/purchase/rawbalances",
          // },
          {
            type: 16,
            name: "Containers Costs",
            route: "/grader/reports/purchase/containerscosts",
          },
        ]}
      />
    </>
  );
}
