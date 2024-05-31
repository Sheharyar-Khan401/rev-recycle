import { RateOn } from "redux/types/common/rateOn";
export interface Department {
  applyFOHPurchase: boolean;
  applyFOHProduction: boolean;
  departmentId: number;
  displayOrder: number;
  hasBelt: boolean;
  name: string;
  rateDepartment?: RateOn;
  rateDepartmentId?: number;
  rateDepartmentName?: string;
  scanCodeProduction: boolean;
  scanCodePurchase: boolean;
}

