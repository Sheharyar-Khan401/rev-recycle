import Sidebar from "shared/Components/Sidebar/Sidebar";
interface Props {
  type: number;
  subtype?: number;
}
export default function ProductionReportsSidenav({ type, subtype }: Props) {
  return (
    <>
      <Sidebar
        title="Production"
        type={type}
        subtype={subtype}
        navigations={[
          {
            type: 5,
            name: "Stock Room Balance",
            route: "/grader/reports/production/stockroombalance",
          },
          // {
          //   type: 2,
          //   name: "Stock Room Ledger",
          //   route: "/grader/reports/production/stockroomledger",
          // },
          {
            type: 7,
            name: "Transfer Sale Order Units",
            route: "/grader/reports/production/transfersaleorderunits",
          },
          {
            type: 6,
            name: "Daily Production",
            route: "/grader/reports/production/dailyproduction",
          },
          // {
          //   type: 4,
          //   name: "Issuance",
          //   route: "/grader/reports/production/issuance",
          // },
          {
            type: 3,
            name: "Wiper Issuance",
            route: "/grader/reports/production/wiper",
          },
          {
            type: 1,
            name: "Production Issuance",
            route: "/grader/reports/production/production",
          },
          {
            type: 2,
            name: "Reproduction Issuance",
            route: "/grader/reports/production/reproduction",
          },
          {
            type: 4,
            name: "Mutility Issuance",
            route: "/grader/reports/production/mutility",
          },
          {
            type: 8,
            name: "Ledger",
            route: "/grader/reports/production/ledger",
          },
          {
            type: 9,
            name: "Issuance By Supplier",
            route: "/grader/reports/production/issuancebysupplier",
          },
          {
            type: 10,
            name: "Production By LabelType",
            route: "/grader/reports/production/productionbylabel",
          },
        ]}
      />
    </>
  );
}
