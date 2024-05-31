import { InvoicesTableData } from "redux/types/Invoices/Invoices";
export interface PaymentTerm {
  paymentTermId: number;
  paymentTermDescription: string;
  saleInvoice?: InvoicesTableData;
}
