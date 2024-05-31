import Sidebar from "shared/Components/Sidebar/Sidebar";
interface Props {
  type: number;
}
export default function InvoicesSideNav({ type }: Props) {
  return (
    <>
      <Sidebar
        title="Invoices"
        type={type}
        navigations={[
          {
            type: 0,
            name: "Invoices",
            route: "/grader/purchase/invoices",
          },
          {
            type: 2,
            name: "Freight Invoices",
            route: "/grader/purchase/invoices/freightinvoices",
          },
          {
            type: 3,
            name: "Clearing Invoices",
            route: "/grader/purchase/invoices/clearinginvoices",
          },
          {
            type: 4,
            name: "Delivery Order Invoices",
            route: "/grader/purchase/invoices/deliveryorderinvoices",
          },
          {
            type: 1,
            name: "Invoice Defaults",
            route: "/grader/purchase/invoices/invoicedefaults",
          },
        ]}
      />
    </>
  );
}
