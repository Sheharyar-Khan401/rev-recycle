import { Belt } from "redux/types/Settings/Productions/belt";
import {
  CartonsData,
  CartonsRequest,
} from "redux/types/Settings/Productions/carton";
import { Floors } from "redux/types/common/floor";
import { Codes } from "redux/types/Productions/codes";

export interface issuanceRequest {
  issuanceDate?: string;
  cartonId?: number;
  remarks?: string;
  floorId?: number;
  barcode?: number;
  somp?: boolean;
  productionIssuanceId?: number;
  units?: number;
  kgs?: number;
  lbs?: number;
  issuanceType?: issuancetype;
  carton?: CartonsRequest;
}
export interface IssuanceResponse {
  productionIssuanceId: number;
  issuanceType: { issuanceTypeId: number };
  issuanceDate: number;
  carton?: CartonsData;
  remarks: string;
  units: number;
  kgs: number;
  lbs: number;
  items?: dailyProductionItem[];
  amount?: number;
  rate?: number;
}
export interface dailyProductionItem {
  code?: Codes;
  kgs: number;
  units: number;
  floor?: Floors;
  belt?: Belt;
  productionIssuanceItemsId: number;
  createdOn: number;
  manualLBS: number;
  supplierName: string;
}
export interface IssuanceItemsAgainstCodeDataTable {
  itemId: number;
  itemName: string;
  productionIssuanceItemsId?: number;
  units: number;
  unitOfMeasurement: string;
  weightKgs: number;
  weightLbs: number;
  floorName: string;
  floorId?: number;
  beltName: string;
  beltId?: number;
  code?: Codes;
}
export interface IssuanceItemsAgainstCodeEditableDataTable
  extends Record<string, number | string | boolean> {
  codeId: number;
  itemName: string;
  units: number;
  unitOfMeasurement: string;
  weightKgs: number;
  weightLbs: number;
  floorId: number;
  beltId: number;
  code: number;
  itemId: number;
}
export interface issuancetype {
  issuanceTypeId?: number;
}
export interface IssuedMaterialReports {
  itemName: string;
  categoryName: string;
  supplierName: string;
  type: string;
  term: number;
  currency: string;
  date: number;
  rate: number;
  code: number;
  quantity: number;
  weightKg: number;
  weightLbs: number;
  amount: number;
  costPerKg: number;
  costPerLbs: number;
  origin: string;
  container: string;
  reference: string;
  rateIC: number;
}
export interface IssuanceGraph {
  noOfIssuances: number;
  weightKg: number;
  weightLbs: number;
  amount: number;
  amtPerKg: number;
  amtPerLbs: number;
  month: string;
}
