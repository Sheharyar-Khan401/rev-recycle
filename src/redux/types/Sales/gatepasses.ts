import { InvoicesTableData } from "redux/types/Invoices/Invoices";
import { OrderStatus } from "redux/types/common/orderStatus";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { WeightUnit } from "redux/types/common/weightUnit";
import { SaleOrdersTableData } from "redux/types/Orders/saleOrders";
import { CustomerData } from "redux/types/common/customer";
import { Client } from "redux/types/Clients/Clients/client";

export interface BasicSaleGP {
  customerId: number;
  invoiceTypeId: number;
  date: string;
  arrivalTime: string;
  containerNo: string;
  referenceNumber: string;
  vehicleNo: string;
  weightUnitId: number;
  remarks: string;
  departureTime: string;
  containerSerial: string;
  orderStatusId?: number;
  weightDifference: number;
  kantaWeight: number;
  barcode?:number;
  kantaWeightUnitId?:number
}
export interface BasicSaleGPEditRequest {
  customerId: number;
  gatePassId: number;
  passingDate: string;
  arrivalTime: string;
  containerNo: string;
  containerSerial: string;
  departureTime: string;
  invoiceTypeId: number;
  referenceNumber: string;
  remarks: string;
  vehicleNo: string;
  weightUnitId: number;
  orderSaleId: number;
  orderStatusId: number;
  saleInvoiceId: number;
  weightDifference: number;
  kantaWeight: number;
  kantaWeightUnitId?:number
}

export interface GatePassesResponse {
  gatePassId: number;
  passingDate: number;
  customer?: CustomerData;
  referenceNumber: string;
  vehicleNo: string;
  remarks?: string;
  weightUnit?: WeightUnit;
  invoiceType?: InvoiceType;
  orderSaleId: number;
  containerSerial?: string;
  arrivalTime: number;
  departureTime: number;
  containerNo: string;
  posted: boolean;
  finalized: boolean;
  totalUnits: number;
  totalAmount: number;
  orderStatus?: OrderStatus;
  orderSaleInvoiceId: number;
  saleOrder?: SaleOrdersTableData;
  supplier?: Client;
  weightDifference: number;
  kantaWeight: number;
  invoice?: InvoicesTableData;
  invoiceId?:number;
  items?: SaleOrdersTableData[];
  totalWeightLbs?: number;
  totalWeightKgs?:number;
  units?: number;
  kantaWeightUnit?:WeightUnit
}
export interface DetailedOutwardGatePassReport {
  gatePassId: number;
  referenceNumber: string;
  gpDate: number;
  invoiceDate: number;
  invoiceNo: string;
  containerNo: string;
  customer: string;
  invoiceType: string;
  currency: string;
  exRate: number;
  fobDollar: number;
  fob: number;
  amount: number;
  taxAmount: number;
  discAmount: number;
  freightCost: number;
  clearingCost: number;
  cnocCost: number;
  otherCost: number;
  adjProfit: number;
  units: number;
  weightKgs: number;
  weightLbs: number;
  weightDiff: number;
  invVoucherId: number;
  currencySign: string;
  surCharges: number;
  weightlbs: number;
  amountPerKgs: number;
  amountPerLbs: number;
  kantaWeight: number;
  chargesExp: number;
  cogs: number;
  netPl: number;
  cogsPerKgs: number;
  netPlPerKgs: number;
  chargeFob: number;
  chargeAmount: number;
}
export interface GatePassItemsCodes{
barcode:number
}