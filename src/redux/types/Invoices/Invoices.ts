import { Client } from "redux/types/Clients/Clients/client";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { Grade } from "redux/types/common/grade";
import {
  ChargeType,
  ChargeTypeRequest,
} from "redux/types/Settings/Purchase/chargetype";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { DocumentType } from "redux/types/common/document";
import { PaymentTerm } from "redux/types/common/paymentTerm";
import { RateOn } from "redux/types/common/rateOn";
import { OrderStatus } from "redux/types/common/orderStatus";
import { ShippingLineData } from "redux/types/Invoices/shippingLine";
import { Location } from "redux/types/Settings/Purchase/location";
import { Port } from "redux/types/Settings/Purchase/port";
import { BranchBankAccount } from "redux/types/common/branch";
import { UserData } from "redux/types/Settings/user";
import { Account } from "../Finance/PrimaryData/account";

export interface InvoicesTableData {
  invoiceId: number;
  invoiceDate: number;
  volume: number;
  containerNo: string;
  consignee: string;
  invoiceNo: string;
  referenceNumber: string;
  paid: boolean;
  budgetAmount: number;
  sumCharges: number;
  billToSupplier: boolean;
  bill: boolean;
  agentId: number;
  currencyId: number;
  shippingLineId: number;
  systemInvoiceId: number;
  billVoucherId: number;
  client?: Client;
  agentDTO?: Client;
  paymentTerm?: PaymentTerm;
  exRate: number;
  rateOn?: RateOn;
  invoiceType?: InvoiceType;
  grade?: Grade;
  orderStatus?: OrderStatus;
  businessCurrency?: BusinessCurrency;
  chargeTypes?: ChargeTypeRequest[];
  shippingLine?: ShippingLineData;
  totalCharges?: number;
  bookingNumber?: string;
  arrivalDate?: number;
  origin?: Location;
  destination?: Location;
  loading?: Port;
  discharge?: Port;
  orderStatusId?: number;
  shipViaId?: number;
  bolNo?: number;
  bolDate?: number;
  expectedOffLoading?: number;
  vesselNo?: number;
  stockroomId?: number;
  gradeId?: number;
  crossTrade?: boolean;
  rateOnId?: number;
  paymentTermId?: number;
  freightInvoiceId?: number;
  clearingInvoiceId?: number;
  deliveryOrderInvoiceId?: number;
  cncInvoiceId?: number;
  otherInvoiceId?: number;
  posted?: boolean;
  totalQuantity?: number;
  netAmount?: number;
  purchaseAmount?: number;
  productionAmount?: number;
  recordProfit?: boolean;
  description?: string;
  rateDecimalPlaces?: number;
  branchBankAccount?: BranchBankAccount;
  tax?: number;
  discount?: number;
  eta?: number;
  etd?: number;
  sealNo: string;
  gatePassId?: number;
  purchaseOrderId?: number;
  saleOrderId?: number;
  agent1?: Client;
  agent2?: Client;
  agent3?: Client;
  billAgentId?: number;
  billAgentId2?: number;
  billAgentId3?: number;
  billAmount?: number;
  billAmount2?: number;
  billAmount3?: number;
  billDate?: number;
  billNarration?: string;
  billCurrency?: BusinessCurrency;
  placeOfReceipt: string;
  freightInvoice?: InvoicesTableData;
  clearingInvoice?: InvoicesTableData;
  cncInvoice?: InvoicesTableData;
  otherInvoice?: InvoicesTableData;
  gatePassAlert: boolean;
  limitAlert: boolean;
}
export interface InvoicesRequest {
  bill: boolean;
  invoiceId: number;
  invoiceDate: string;
  volume: number;
  containerNo: string;
  invoiceNo: string;
  paid: boolean;
  budgetAmount: number;
  billToSupplier: boolean;
  clientId?: number;
  currencyId: number;
  shippingLineId?: number;
  systemInvoiceId: number;
  placeOfReceipt: string;
  basicInvoiceId?: number;
}
export interface PurchaseInvoicesRequest {
  arrivalDate?: string;
  bolDate: string;
  bolNo?: number;
  bookingNumber?: string;
  branchBankAccountId?: number;
  brandName?: string;
  clearingInvoiceId?: number;
  clientId?: number;
  cncInvoiceId?: number;
  containerNo: string;
  crossTrade?: boolean;
  currencyId?: number;
  deliveryOrderInvoiceId?: number;
  description?: string;
  destinationLocationId?: number;
  dischargePortId?: number;
  discount?: number;
  eta?: string;
  etd?: string;
  exRate?: number;
  expectedOffLoading?: string;
  freightInvoiceId?: number;
  gatePassId?: number;
  gradeId?: number;
  invoiceDate: string;
  invoiceId?: string;
  invoiceNo: string;
  invoiceTypeId?: number;
  loadingPortId?: number;
  orderStatusId?: number;
  originLocationId?: number;
  otherInvoiceId?: number;
  paymentTermId?: number;
  purchaseOrderId?: number;
  rateDecimalPlaces?: number;
  rateOnId?: number;
  recordProfit?: boolean;
  referenceNumber?: string;
  sealNo?: string;
  shipViaId?: number;
  shippingLineId?: number;
  stockroomId?: number;
  systemInvoiceId: number;
  tax?: number;
  amount?: number;
  vesselNo?: number;
  basicInvoiceId?: number;
  gatePassAlert: boolean;
  limitAlert: boolean;
}
export interface SaleInvoicesBillRequest {
  invoiceId: number;
  bill: boolean;
  billDate?: string;
  billNarration?: string;
  billAmount?: number;
  billAgentId?: number;
  billCurrencyId?: number;
}
export interface PurchaseInvoicesBillRequest {
  invoiceId: number;
  bill: boolean;
  billDate?: string;
  billNarration?: string;
  billAmount?: number;
  billAmount2?: number;
  billAmount3?: number;
  billAgentId?: number;
  billAgentId2?: number;
  billAgentId3?: number;
  billCurrencyId?: number;
}
export interface invoiceCommissionsRequest
  extends Record<string, number | string | boolean> {
  invoiceCommissionId: number;
  amount: number;
  agentId: number;
}

export interface invoiceCommissionResponse {
  invoiceCommissionId: number;
  amount: number;
  agent?: Client;
}
export interface invoiceDocumentsRequest
  extends Record<string, number | string | boolean> {
  invoiceDocumentId: number;
  documentTypeId: number;
  remarks: string;
  receivedOn: string;
  file: string;
  fileUrl: string;
}
export interface invoiceDocumentsResponse {
  invoiceDocumentId: number;
  documentType?: DocumentType;
  documentTypeId: number;
  remarks: string;
  receivedOn: number;
  fileUrl: string;
}
export interface invoiceSummary {
  baleWeightKgs: number;
  baleWeightLbs: number;
  clearingCharges?: ChargeType[];
  clearingCost: number;
  commissionCost: number;
  commissions?: invoiceCommissionResponse[];
  currency: string;
  deliveryOrderCharges?: ChargeType[];
  deliveryOrderCost: number;
  exchangeRate: number;
  freightCharges?: ChargeType[];
  freightCost: number;
  otherCharges?: ChargeType[];
  otherCost: number;
  purchaseCost: number;
  quantity: number;
  ratePerKgs: number;
  ratePerLbs: number;
  ratePerPackage: number;
  totalCost: number;
  totalWeightKgs: number;
  totalWeightLbs: number;
  totalPackages: number;
}

export interface ContainerInTransitReports {
  referenceNo: string;
  invoiceDate: number;
  invoiceNo: string;
  vesselNo: string;
  containerNo: string;
  supplier: string;
  origin: string;
  portOfLoading: string;
  paymentTerms: string;
  arrivalDate: number;
  expectedOffLoadingDate: number;
  invoiceType: string;
  freightAgent: string;
  clearingAgent: string;
  deliveryOrderAgent: string;
  quantity: number;
  weightKgs: number;
  weightLbs: number;
  currency: string;
  amount: number;
  costKgs: number;
  costLbs: number;
  freightCost: number;
  clearingCost: number;
  deliveryOrderCost: number;
  commission: number;
  netAmount: number;
  nfKgs: number;
  nfLbs: number;
  totalContainers: number;
  category: string;
  cti: boolean;
}

export interface FreighInvoicesReports {
  invoiceId: number;
  date: number;
  volume: string;
  reference: string;
  container: string;
  invoiceNo: string;
  supplierName: string;
  origin: string;
  destination: string;
  agentName: string;
  dischargePort: string;
  loadingPort: string;
  arrivalDate: number;
  bill: boolean;
  billDate: number;
  billAmount: number;
  billAmountDifference: number;
  currencyName: string;
  amount: number;
  quantity: number;
  weightKg: number;
  weightLbs: number;
  arrivalDays: string;
}
export interface PurchaseFinancialEntries {
  voucherId: number;
  voucherExchangeRate: number;
  vochrd: number;
  transaction: string;
  transactionTime: number;
  creditAmount: number;
  debitAmount: number;
  exRate: number;
  postedOn: number;
  createdBy?: UserData;
  listofvoucherAcc?: ListofvoucherAccount[];
}
export interface ListofvoucherAccount {
  voucherAccountId: number;
  vochrAccTitle: string;
  vochrAccDesc: string;
  narration: string;
  debit: number;
  credit: number;
  chqNo: string;
  chqDate: number;
  chqClearanceDate: number;
  creationDate: number;
  modificationDate: number;
  status: string;
  cgroup: string;
  reportGroup: string;
  acc?: Account;
}
export interface ContainerCostsReport {
  date: number;
  month: string;
  referenceNo: string;
  supplier: string;
  totalContainers: number;
  weightKgs: number;
  weightLbs: number;
  cost: number;
  costPerLbs: number;
  containerNo: string;
  totalCostPerLb: number;
}
