import { InvoicesTableData } from "redux/types/Invoices/Invoices";
import { SaleOrderItems } from "redux/types/Orders/saleOrders";
import { ProductionItemsResponse } from "redux/types/Settings/Productions/items";
interface Invoice extends InvoicesTableData {
  items?: SaleOrderItems[];
}
export interface InvoicePriceComparison {
  invoices?: Invoice[];
  items?: ProductionItemsResponse[];
}
