import { StockroomsData } from "redux/types/Settings/Productions/Stockroom";
import { PurchaseMethodData } from "redux/types/common/purchaseMethod";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { RateOn } from "redux/types/common/rateOn";
import { WeightUnit } from "redux/types/common/weightUnit";
import { PurchaseOrderItemsData } from "redux/types/Orders/orders";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { InvoicesTableData } from "redux/types/Invoices/Invoices";
import { Client } from "redux/types/Clients/Clients/client";
import { Grade } from "redux/types/common/grade";
import { Item } from "../Settings/Productions/items";
export interface overViewGatePasses {
  gatePassId?: number;
  passingDate: string;
  weightUnitId?: number;
  purchaseOrderId?: number;
  posted: boolean;
  containerNo: string;
  arrivalTime: string;
  departureTime: string;
  purchaseInvoiceId: number;
  vehicleNo: string;
  referenceNumber: string;
  invoiceTypeId: number;
  clientId: number;
  invoiceNo: string;
  stockRoomId: number;
  purchaseMethodId: number;
  gradeId?: number;
  rateOnId?: number;
  currencyId?: number;
  totalWeightKgs: number;
  totalWeightLbs: number;
  kantaWeight: number;
  kantaWeightUnit?: number;
  weightDifference: number;
}
export interface PurchaseGatePassesReponse {
  gatePassId: number;
  passingDate: number;
  arrivalTime: number;
  departureTime: number;
  containerNo: string;
  referenceNumber: string;
  stockroom?: StockroomsData;
  supplier?: Client;
  client?: Client;
  grade?: Grade;
  purchaseMethod?: PurchaseMethodData;
  posted: boolean | string;
  vehicleNo: string;
  rateOn?: RateOn;
  totalWeightKgs: number;
  totalWeightLbs: number;
  weightDiff: number;
  invoiceType?: InvoiceType;
  invoice?: InvoicesTableData;
  currencyId?: BusinessCurrency;
  purchaseOrder?: purchaseOrder;
  purchaseInvoice?: InvoicesTableData;
  weightUnit?: WeightUnit;
  currency?: BusinessCurrency;
  kantaWeight: number;
  kantaWeightUnit?: WeightUnit;
  purchaseMethodId: number;
}
export interface purchaseOrder {
  purchaseOrderId: number;
  listofPurchaseOrderItems?: PurchaseOrderItemsData[];
}
export interface purchaseOrderItemsResponse {
  item?: Item;
  invoiceQuantity?: number;
  gatePassQuantity?: number;
  purchaseOrder?: PurchaseGatePassesReponse;
  unitWeight?: number;
  weightKg: number;
  weightLbs: number;
  rateOn?: RateOn;
  rate?: number;
  amount?: number;
  quantity?: number;
  gatePassId?: number;
  weightUnit?: WeightUnit;
}

export interface purchaseOrderItemsRequest
  extends Record<string, number | string> {
  gatePassId: number;
  gatePassQuantity: number;
}
export interface PurchaseReports {
  gatePassId: number;
  referenceNumber: string;
  date: number;
  invoiceDate: number;
  invoiceNo: string;
  vesselNo: string;
  origin: string;
  containerNo: string;
  fullName: string;
  type: string;
  term: string;
  currency: string;
  amount: number;
  exRate: number;
  freightCost: number;
  clearingCost: number;
  doCost: number;
  netCommission: number;
  netAmount: number;
  units: number;
  weightKGS: number;
  weightLBS: number;
  kantaWeight: number;
  diffWeight: number;
  costKgs: number;
  freightAgent: string;
  clearingAgent: string;
  doAgent: string;
  voucherId: number;
  supplierName: string;
}
export interface ItemSupplierInwardGP {
  itemName: string;
  categoryName: string;
  supplier: string;
  origin: string;
  referenceNumber: string;
  currency: string;
  unitPrice: number;
  units: number;
  weightKgs: number;
  weightLbs: number;
  invoiceNo: string;
}

export interface QualityReportItems extends Record<string, number | string> {
  qualityAnalysisId: number;
  stationName: string;
  grade1Field: string;
  grade2Field: string;
  grade3Field: string;
  grade1Value: number;
  grade2Value: number;
  grade3Value: number;
  totalWeightLbs: number;
  weightUnit: number;
}
export interface QualityReportItemsResponse {
  qualityAnalysisId: number;
  stationName: string;
  grade1Field: string;
  grade2Field: string;
  grade3Field: string;
  grade1Value: number;
  grade2Value: number;
  grade3Value: number;
  weightUnit?: WeightUnit;
}
