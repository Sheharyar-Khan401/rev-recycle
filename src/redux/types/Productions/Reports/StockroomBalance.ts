export interface StockroomBalance {
  itemCode: string;
  itemName: string;
  unitOfMeasurement: string;
  unitPieces: number;
  units: number;
  weightKgs: number;
  weightLbs: number;
  prodRate: number;
  grade: string;
  amount: number;
  brandCode?: number | string;
  brand: string;
  unitWeight: number;
  brandItemCode: number | string;
  category: string;
  bundleReference: string;
  productionDate: number;
  bundleNumber: number | string;
  unitCode: number | string;
  labelType: string;
  labelTypeItem: string;
  orderReference: string;
  bundle: number;
  balance: number;
  soQuantity: number;
  stockRoom: string;
  department: string;
  unitName: string;
  departmentItem: string;
  brandItem: string;
}