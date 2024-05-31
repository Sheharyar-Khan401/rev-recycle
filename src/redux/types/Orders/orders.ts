import { Client } from "redux/types/Clients/Clients/client";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { QuantityUnit } from "redux/types/common/quantityUnit";
import { RateOn } from "redux/types/common/rateOn";
import { WeightUnit } from "redux/types/common/weightUnit";
import { OrderStatus } from "redux/types/common/orderStatus";
import { Item } from "../Settings/Productions/items";

export interface OrderTableData {
  purchaseOrderId: number;
  purchaseOrderName: string;
  purchaseOrderDescription: string;
  description: string;
  referenceNumber: string;
  invoiceNumber: string;
  orderDate: number;
  businessCurrencyId: number;
  businessCurrency?: BusinessCurrency;
  currency?: BusinessCurrency;
  orderStatusId: number;
  orderStatus?: OrderStatus;
  invoiceTypeId: number;
  invoiceType?: InvoiceType;
  invoiceId?: number;
  gatepassId?: number;
  client?: Client;
  clientId?: number;
  listofPurchaseOrderItems?: listofPurchaseOrderItems[];
}

export interface OrderRequest {
  purchaseOrderId?: number;
  purchaseOrderName: string;
  description?: string;
  purchaseOrderDescription?: string;
  referenceNumber: string;
  invoiceNumber: string;
  orderDate: string;
  client?: Client;
  invoiceType?: InvoiceType;
  businessCurrency?: BusinessCurrency;
  currency?: BusinessCurrency;
  orderStatus?: OrderStatus;
  businessCurrencyId: number;
  orderStatusId: number;
  invoiceTypeId: number;
  invoiceId?: number;
  clientId: number;
  listofPurchaseOrderItems?: listofPurchaseOrderItems[];
}
export interface listofPurchaseOrderItems
  extends Record<string, number | string> {
  purchaseOrderItemId: number;
  quantity: number;
  unitWeight: number;
  unitKg: number;
  weightKg: number;
  weightLbs: number;
  amount: number;
  rate: number;
  itemId: number;
  quantityUnitId: number;
  rateOnId: number;
  weightUnitId: number;
}
export interface listofImportOrderItems
  {
  itemName: string;
  quantity: number;
  packagingUnit: string,
  weightUnit: string;
  weightLbs: number;
  rate: number;
  rateOn: string;
}
export interface PurchaseOrderItemsData {
  purchaseOrderItemId?: number;
  quantity?: number;
  unitWeight?: number;
  unitKg?: number;
  weightKg?: number;
  weightLbs?: number;
  gatePassQuantity?: number;
  amount?: number;
  rate?: number;
  itemId?: number;
  item?: Item;
  quantityUnit?: QuantityUnit;
  quantityUnitId?: number;
  rateOnId?: number;
  rateOn?: RateOn;
  weightUnit?: WeightUnit;
  weightUnitId?: number;
}
export interface PurchaseOrderReports {
  itemName: string;
  quantity: number;
  kgs: number;
  amount: number;
  costKgs: number;
  category: string,
  supplier: string,
  type: string,
  container: string,
  origin: string,
  term: string,
  currency: string,
  date: number,
  month: string,
  rate: number,
  rateIc:number
  issuedUnit: string,
  issuedTo: number,
  issuedDate: number,
  issQuantity: number,
  issKgs: number,
  issAmount:  number,
  issLbs: number,
  lbs: number,
  costLbs: number,
  reference: string,
  stockroom: string
  code: number;
  lastIssued: string,

}
export interface SupplierInvoicesReports {
  item: string;
  category: string;
  supplier: string;
  origin: string;
  referenceNo: string;
  currency: string;
  unitPrice: number;
  units: number;
  weightKgs: number;
}
export interface StockRoomItemsReports {
  item: string;
  code: number;
  category: string;
  supplier: string;
  type: string;
  containerNo: string;
  referenceNo: string;
  quantity: number;
  weightKgs: number;
  stockRoom: string;
  itemId: number;
}
