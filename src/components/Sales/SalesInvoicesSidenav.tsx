import Sidebar from "shared/Components/Sidebar/Sidebar";
interface Props {
  type: number;
}
export default function SalesInvoicesSideNav({ type }: Props) {
  return (
    <>
      <Sidebar
        title="Invoices"
        type={type}
        navigations={[
          {
            type: 5,
            name: "Invoices",
            route: "/grader/sales/invoices",
          },
          {
            type: 7,
            name: "Freight Invoices",
            route: "/grader/sales/invoices/freightinvoices",
          },
          {
            type: 6,
            name: "Clearing Invoices",
            route: "/grader/sales/invoices/clearinginvoices",
          },
          {
            type: 8,
            name: "CNC/COC Invoices",
            route: "/grader/sales/invoices/cncinvoices",
          },
          {
            type: 9,
            name: "Other Invoices",
            route: "/grader/sales/invoices/otherinvoices",
          },
        ]}
      />
    </>
  );
}
