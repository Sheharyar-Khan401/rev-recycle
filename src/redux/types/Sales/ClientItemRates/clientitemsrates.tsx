import { Item } from "redux/types/Settings/Productions/items";
export interface ClienItemRates {
  amountPerLbs: number;
  clientId: number;
  clientItemRateId: number;
  clientName: string;
  printName: string;
  masterUnitRate: number;
  clientUnitRate: number;
  ratePerLbs: number;
  item?: Item;
}
export interface ClienItemRatesView
  extends Record<string, number | string | boolean> {
  amountPerLbs: number;
  clientId: number;
  clientItemRateId: number;
  clientName: string;
  printName: string;
  masterUnitRate: number;
  clientUnitRate: number;
  ratePerLbs: number;
}
export interface PriceComparisonReports {
  itemName: string;
  customerName: string;
  price: number;
}
