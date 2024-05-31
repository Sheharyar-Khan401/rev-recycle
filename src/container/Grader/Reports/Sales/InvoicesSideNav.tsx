import Sidebar from "shared/Components/Sidebar/Sidebar"
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
            type: 1,
            name: "Freight Invoices",
            route: "/grader/sales/invoices/freightinvoices",
          },
          {
            type: 2,
            name: "Clearing Invoices",
            route: "/grader/sales/invoices/clearinginvoices",
          },
          {
            type: 3,
            name: "Delivery Order Invoices",
            route: "/grader/sales/invoices/deliveryorderinvoices",
          },
          {
            type: 4,
            name: "Invoice Defaults",
            route: "/grader/sales/invoices/invoicedefaults",
          },
        ]}
      />
    </>
  );
}
