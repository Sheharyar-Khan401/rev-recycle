import { SaleOrdersTableData } from "redux/types/Orders/saleOrders";
import { StockroomsData } from "redux/types/Settings/Productions/Stockroom";
import { Floors } from "redux/types/common/floor";
import { StationsData } from "redux/types/Settings/Productions/station";
import { UserData } from "redux/types/Settings/user";
import { CartonsData } from "redux/types/Settings/Productions/carton";
import { Codes } from "redux/types/Productions/codes";
export interface dailyProductionRequest {
  date: string;
  cartonId?: number;
  floorId?: number;
  dailyProductionId?: number;
  stationId?: number;
}
export interface dailyProductionResponse {
  dailyProductionId: number;
  units: number;
  weight: number;
  date: number;
  floor?: Floors;
  station?: StationsData;
  carton?: CartonsData;
  items?: ScanItems[];
  code?: Codes;
  kgs?: number;
  stockRoomSummary?: summaryData[];
  saleOrderSummmary?: summaryData[];
  workerSummary?: summaryData[];
  labelTypeSummary?: summaryData[];
  departmentSummary?: summaryData[];
  floorSummary?: summaryData[];
}
export interface productionDepartment {
  productionDepartmentId: number;
  name: string;
}
export interface ScannedItemsData extends Record<string, number | string> {
  codeId: number;
  name: string;
  code: number;
  uom: string;
  units: number;
  weightKg: number;
  weightLb: number;
  saleOrderId: number;
  stockRoomId: number;
  workerId: number;
  floorId: number;
  itemId: number;
  productionDepartmentId: number;
}
export interface CodesAgainstItmesData extends Record<string, number | string> {
  codeId: number;
  stockRoomName: string;
  weightKgs: number;
  weightLbs: number;
  saleOrderName: string;
  workerName: string;
  dailyProductionItemId: number;
  floorName: string;
}
export interface ScannedItemsDataTable {
  codeId: number;
  name: string;
  code: number;
  uom: string;
  units: number;
  weightKg: number;
  weightLb: number;
  saleOrder?: string;
  stockRoom?: string;
  worker?: string;
  floor?: Floors;
  productionDepartment?: string;
  saleOrderId: number;
  stockRoomId: number;
  workerId: number;
  productionDepartmentId: number;
  itemId: number;
}
export interface ScanItems {
  codes?: Codes;
  stockRoom?: StockroomsData;
  saleOrder?: SaleOrdersTableData;
  worker?: UserData;
  productionDepartment?: productionDepartment;
  floor?: Floors;
  units: number;
  weight: number;
  dailyProductionItemId: number;
}
export interface summaryData {
  name?: string;
  quantity: number;
  weightKg: number;
  reference?: string;
  fullName?: string;
}
export interface CodesAgainstItems {
  codes?: Codes;
  saleOrder?: SaleOrdersTableData;
  stockRoom?: StockroomsData;
  worker?: UserData;
  floor?: Floors;
  weightkgs: number;
  dailyProductionItemId: number;
}
export interface dailyProductionGraphResponse {
  dailyProductionDate: number;
  itemWeightKgs: number;
  itemWeightLbs: number;
  units: number;
  itemTotalWeightKgs: number;
  itemTotalWeightLbs: number;
  totalWeightKgs: number;
  totalWeightLbs: number;
  itemName: string;
  categoryName: string;
  labelType: string;
  amount: number;
}
export interface issuedMaterialGraphResponse {
  categoryName: string;
  issuanceDate: number;
  itemName: string;
  supplier?: string;
  itemWeightKgs: number;
  itemWeightLbs: number;
  units: number;
  itemTotalWeightKgs: number;
  itemTotalWeightLbs: number;
  totalWeightKgs: number;
  totalWeightLbs: number;
  labelTypeName: string;
  amount: number;
}
