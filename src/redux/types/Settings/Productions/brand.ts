import { WeightUnit } from "redux/types/common/weightUnit";

export interface Brand {
  code: string;
  logo: string;
  logoUrl: string;
  printableWeightUnit?: number;
  weightUnit?: WeightUnit;
  brandId: number;
  name: string;
  brandCode: number;
  weightInKgs: number;
  printableName: string;
  weightLimit: number;
  weightOnPrint: boolean;
}

export interface BrandRequest {
  brandId: number;
  code: string;
  logo?: File | null;
  logoUrl: string;
  name: string;
  printableName: string;
  weightInKgs: number;
  weightLimit: number;
  weightOnPrint: boolean;
  weightUnitId: number;
}

export interface BrandItemsResponse {
  brandItemId: number;
  item?: BrandItemsRequest;
}
export interface BrandItemsRequest extends Record<string, number | string> {
  brandItemId: number;
  itemId: number;
  itemCode: number;
  unitPieces: number;
  weightKgs: number;
}

