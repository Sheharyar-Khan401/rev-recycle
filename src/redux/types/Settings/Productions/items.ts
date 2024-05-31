import { UnitOfMeasurement } from "redux/types/common/uom";
import { QuantityUnit } from "redux/types/common/quantityUnit";
import { RateOn } from "redux/types/common/rateOn";
import { WeightUnit } from "redux/types/common/weightUnit";
import { Categories } from "redux/types/Settings/Purchase/categories";
import { Group } from "redux/types/common/group";
import { LabelTypesData } from "redux/types/Settings/Productions/labeltype";
import { Grade } from "redux/types/common/grade";

export interface ProductionItemsRequest {
  active: boolean;
  amount: number;
  categoryId: number;
  expProKgs?: number;
  expProQty?: number;
  gradeId: number;
  groupId: number;
  itemId: number;
  itemCode: string;
  labelTypeId: number;
  name: string;
  quantityUnitId: number;
  rateOnId?: number;
  unitOfMeasurementId: number;
  unitPieces: number;
  unitRate: number;
  unitWeight: number;
  weightKgs: number;
  weightLbs: number;
  weightUnitId: number;
}

export interface ProductionItemsResponse {
  active: boolean;
  amount: number;
  category?: Categories;
  expProKgs: number;
  expProQty: number;
  grade?: Grade;
  group?: Group;
  isProduction: boolean;
  itemCode: string;
  itemId: number;
  labelType?: LabelTypesData;
  name: string;
  quantity: number;
  quantityUnit?: QuantityUnit;
  rateOn?: RateOn;
  uom?: UnitOfMeasurement;
  unitPieces: number;
  unitRate: number;
  unitWeight: number;
  weightKgs: number;
  weightLbs: number;
  weightUnit?: WeightUnit;
}
export interface Item {
  description: string;
  expProKgs: number;
  expProQty: number;
  itemId: number;
  labelType?: LabelTypesData;
  name: string;
  quantityUnit?: QuantityUnit;
  rateOn?: RateOn;
  uom?: UnitOfMeasurement;
  unitRate: number;
  weightKgs: number;
  weightUnit?: WeightUnit;
  active: boolean;
  amount: number;
  category?: Categories;
  grade?: Grade;
  group?: Group;
  lbswt: number;
  status: string;
  unitPieces: number;
  weightKg: number;
  weightLb: number;
  itemName: string;
  code: string;
  weight?: number;
  unitOfMeasurementId?: number;
  itemType: null;
  itemCode: string;
  quantity: number;
  unitWeight: number;
}

export interface ProductionLedger {
  date: number;
  noOfCodes: number;
  itemId: number;
  item: string;
  category: string;
  month: string;
  unitWeight: number;
  weightUnitId: number;
  production?: ProductionLedger[];
}
