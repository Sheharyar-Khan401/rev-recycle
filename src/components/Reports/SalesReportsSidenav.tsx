import Sidebar from "shared/Components/Sidebar/Sidebar";
interface Props {
  type: number;
}
export default function SalesReportsSideNav({ type }: Props) {
  return (
      <Sidebar
        title="Sales"
        type={type}
        navigations={[
          {
            type: 3,
            name: "Price List",
            route: "/grader/reports/sales/pricelist",
          },
          {
            type: 1,
            name: "Detailed Outward Gate Pass",
            route: "/grader/reports/sales/detailedoutwardgatepass",
          },
          {
            type: 2,
            name: "Item / Customer Gate Pass",
            route: "/grader/reports/sales/customergatepass",
          },
          {
            type: 4,
            name: "Daily Production Profit",
            route: "/grader/reports/sales/dailyproductionprofit",
          },
          {
            type: 5,
            name: "Production Profit",
            route: "/grader/reports/sales/productionprofit",
          },
          {
            type: 6,
            name: "Detailed Outward Gate Pass(2)",
            route: "/grader/reports/sales/detailedoutwardgatepass2",
          },
          {
            type: 7,
            name: "Invoice Price Comparison",
            route: "/grader/reports/sales/invoicepricecomparison",
          },
          {
            type: 8,
            name: "Item Cusomer Gate Pass Leveled",
            route: "/grader/reports/sales/itemcustomergatepassleveled",
          },
          {
            type: 9,
            name: "Order Statuses",
            route: "/grader/reports/sales/orderstatuses",
          },
          {
            type: 10,
            name: "Price Comparison",
            route: "/grader/reports/sales/pricecomparison",
          },
        ]}
      />
  );
}
