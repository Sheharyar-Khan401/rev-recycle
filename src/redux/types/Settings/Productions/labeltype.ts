import { Department } from "redux/types/Settings/Productions/department";
import { StockroomsData } from "redux/types/Settings/Productions/Stockroom";

export interface LabelTypesData {
  department?: Department;
  departmentId: number;
  departmentName?: string;
  displayOrder: number;
  labelTypeId: number;
  name: string;
  productionGraph: boolean;
  saleInvoiceGraph: boolean;
  stockRoom?: StockroomsData;
}
export interface LabelTypesRequest
  extends Record<string, number | string | boolean> {
  departmentId: number;
  displayOrder: number;
  labelTypeId: number;
  name: string;
  productionGraph: boolean;
  saleInvoiceGraph: boolean;
  stockRoomId: number;
}
