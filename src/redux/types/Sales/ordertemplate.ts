import { Client } from "redux/types/Clients/Clients/client";
import { UnitOfMeasurement } from "redux/types/common/uom";
import { QuantityUnit } from "redux/types/common/quantityUnit";
import { Brand } from "redux/types/Settings/Productions/brand";
import { Item } from "../Settings/Productions/items";
export interface OrderTemplate {
  saleOrderTemplateId: number;
  name: string;
  brandId: number;
  clientId: number;
  items?: Item[];
}
export interface OrderTemplateData {
  name: string;
  brandId: number;
  clientId: number;
  saleOrderTemplateItemId: number;
  quantity: number;
  itemName: string;
  unitName: string;
  unitId: number;
  itemId: number;
  code: string;
  unitOfMeasurementId: number;
  uweight: number;
  clientName: string;
}
export interface OrderTemplateItemsData
  extends Record<string, number | string | boolean> {
  quantity: number;
  unitPieces: number;
  weightKgs: number;
  weightLbs: number;
  code: string;
  unitId: number;
  saleOrderTemplateItemId: number;
  itemId: number;
  quantityUnitId: number;
  uweight: number;
}
export interface EditOrderTemplateData {
  serialNumber: number;
  items?: itemtableData[];
}
export interface itemtableData {
  quantity: number;
  uweight: number;
  code: string;
  clientItemRateId?: number;
  uom?: UnitOfMeasurement;
  unitOfMeasurementId?: number;
  unitName: string;
  itemName?: string;
  quantityUnitName?: string;
  qunit?: QuantityUnit;
  quantityUnitId?: number;
  itemRates?: itemRates;
  weightKgs: number;
  weightLbs: number;
  unitPieces: number;
  saleOrderTemplateItemId?: number;
  item?: Item;
}
export interface itemRates {
  item?: Item;
}

export interface itemTableDataResponse {
  saleOrderTemplateId: number;
  name: string;
  brand?: Brand;
  client?: Client;
}
export interface OrderTemplateRequest {
  saleOrderTemplateId?: number;
  name: string;
  brandId: number;
  clientId: number;
}
export interface OrderTemplateById {
  saleOrderTemplateId: number;
  name: string;
  brandId: number;
  clientId: number;
  brand?: Brand;
  client?: Client;
  items?: itemtableData[];
}
