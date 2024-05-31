import { Codes } from "redux/types/Productions/codes";
import { OrderStatus } from "redux/types/common/orderStatus";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { StockroomsData } from "redux/types/Settings/Productions/Stockroom";
import { Brand } from "redux/types/Settings/Productions/brand";
import { Item } from "redux/types/Settings/Productions/items";
import { Categories } from "redux/types/Settings/Purchase/categories";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { UnitOfMeasurement } from "redux/types/common/uom";
import { QuantityUnit } from "redux/types/common/quantityUnit";
import { RateOn } from "redux/types/common/rateOn";
import { CustomerData } from "redux/types/common/customer";
import { WeightUnit } from "redux/types/common/weightUnit";
import { OrderTemplate } from "redux/types/Sales/ordertemplate";

export interface SaleOrdersTableData {
  saleOrderId: number;
  orderDate: number;
  totalAmount: number;
  totalMasterRate: number;
  description: string;
  eta: number;
  maxShipmentWeight: number;
  weightDifference: number;
  reference: string;
  showinDP: boolean;
  proPriority: number;
  ps: number;
  running: boolean;
  finalized: boolean;
  arrivalTo: string;
  arrivalFrom: string;
  quantity: number;
  totalWeight: number;
  totalAQuantity: number;
  totalPSWeight: number;
  orderStatus?: OrderStatus;
  invoiceType?: InvoiceType;
  category?: Categories;
  brand?: Brand;
  customer?: CustomerData;
  saleOrderTemplate?: OrderTemplate;
  currency?: BusinessCurrency;
  stockroom?: StockroomsData;
  items?: SaleOrderItems[];
  maxweightUnit?: WeightUnit;
  sounitpieces?: number;
  gatePassId: number;
  invoiceId: number;
  production: boolean
}
export interface SaleOrderItems {
  saleOrderItemId: number;
  item?: Item;
  uom?: UnitOfMeasurement;
  quantity: number;
  quantityUnit?: QuantityUnit;
  unitPieces: number;
  unitWeight: number;
  weightKg: number;
  weightLbs: number;
  rate: number;
  masterRate: number;
  rateOn?: RateOn;
  amount: number;
  pro: number;
  bal: number;
  sold: number;
  ps: number;
  pskgs: number;
  pslbs: number;
  description: string;
  code?: Codes;
  weightUnit?: WeightUnit;
  aqty: number;
  codesId?: number;
  saleOrder?: SaleOrdersTableData;
  soUnits: number;
}
export interface SaleOrderItemsRequest
  extends Record<string, number | string | boolean> {
  saleOrderItemId: number;
  itemId: number;
  unitofMeasurementId: number;
  quantity: number;
  quantityUnitId: number;
  unitPieces: number;
  weightKg: number;
  weightLbs: number;
  masterRate: number;
  codesId: string;
  rate: number;
  rateOnId: number;
  amount: number;
  pro: number;
  bal: number;
  sold: number;
  ps: number;
  psKgs: number;
  psLbs: number;
  description: string;
  unitWeight: number;
  aqty: number;
}
export interface SalesImportItemsRequest {
  itemName: string,
  quantity: number
}
export interface SaleOrderRequest
  extends Record<string, number | string | boolean> {
  saleOrderId: number;
  orderDate: string;
  description: string;
  eta: string;
  maxShipmentWeight: number;
  maxweightUnitId: number;
  reference: string;
  showinDP: boolean;
  proPriority: number;
  ps: number;
  running: boolean;
  finalized: boolean;
  arrivalTo: string;
  arrivalFrom: string;
  quantity: number;
  orderStatusId: number;
  invoiceTypeId: number;
  production: boolean;
  stockroomId: number;
  brandId: number;
  saleOrderTemplateId: number;
  clientId: number;
  businessCurrencyId: number;
  weightDifference: number;
}

export interface SaleOrderItemsResponse {
  saleOrderItemId: number;
  itemName?: string;
  unitPieces: number;
  weightKgs?: number;
  weightLbs: number;
  code?: Codes;
  uom: string;
  quantity?: number;
  itemId: number;
  soUnits: number;
}
export interface ItemsBySaleOrderId {
  saleOrderItemId: number;
  item?: Item;
  uom?: UnitOfMeasurement;
  quantity: number;
  quantityUnit?: QuantityUnit;
  unitPieces: number;
  unitWeight: number;
  weightKg: number;
  weightLbs: number;
  rate: number;
  masterRate: number;
  amount: number;
  pro: number;
  bal: number;
  sold: number;
  ps: number;
  pskgs: number;
  pslbs: number;
  description: string;
  weightUnit?: WeightUnit;
  aqty: number;
  code?: Codes;
  rateOn?: RateOn;
}
export interface OrderStatusesReport {
  date: number;
  customer: string;
  reference: string;
  pro: number;
  bal: number;
  sold: number;
  ps: number;
  total: number;
}
export interface ItemCustomerGatePassReport {
  itemName: string;
  units: number;
  weightKgs: number;
  weightLbs: number;
  fobAmount: number;
  itemCode: number;
  cogs: number;
  profitLoss: number;
  categoryName: string,
  customer: string,
  referenceNumber: string,
  containerNumber: string,
  date : number,
  departmentName: string,
  gradeName: string,
  invoiceContainerNumber: string,
  invoiceType: string,
  labelType: string,
  origin: string,
  stockRoom: string,
  rate: number,
  charges: number,
  netAmount: number,
  unitCode: number
}
