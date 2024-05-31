import { SaleOrderItems, SaleOrdersTableData } from "redux/types/Orders/saleOrders";
import { StockroomsData } from "redux/types/Settings/Productions/Stockroom";
import { Codes } from "redux/types/Productions/codes";
import { Item } from "../Settings/Productions/items";

export interface transferSaleOrderUnitRequest {
  transferDate?: string;
  description?: string;
  saleOrderId?: number,
  stockRoomId?: number,
  barcode?: number,
  smop?: boolean,
  soitems?: boolean,
  print?: boolean,
}
export interface transferSaleOrderUnitResponse {
  transferId: number;
  transferDate: number;
  description: string;
  transferredQty: number;
  transferLogs?: TransferredSaleOrderItems[];
}
export interface TransferredSaleOrderItems {
  code?: Codes;
  saleOrderTransferLogId: number;
  date: number | Date;
  orderFrom?: SaleOrdersTableData;
  orderTo?: SaleOrdersTableData;
  creationDate: number | Date;
  saleOrderItem?: SaleOrderItems;
  roomFrom?: StockroomsData;
  itemCode:number
  roomTo?: StockroomsData;
}
export interface TransferSaleOrderUnitsAgainstCode {
  codes?: Codes;
  item: Item;
  code:number
  creationDate: number;
  saleOrderItemId:number
}
export interface SummaryItems {
  itemId?: number;
  units: number;
  itemName: string;
}
