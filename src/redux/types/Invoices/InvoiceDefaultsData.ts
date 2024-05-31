import { StockroomsData } from "redux/types/Settings/Productions/Stockroom";
import { Location } from "redux/types/Settings/Purchase/location";
import { Port } from "redux/types/Settings/Purchase/port";
import { RateOn } from "redux/types/common/rateOn";
import { ShipVia } from "redux/types/common/shipvia";
import { OrderStatus } from "redux/types/common/orderStatus";

export interface InvoiceDefaultsData {
  invoiceDefaultId: number;
  origin?: Location;
  originLocationId: number;
  destination?: Location;
  destinationLocationId: number;
  loadingPort?: Port;
  loadingPortId: number;
  dischargePort?: Port;
  dischargePortId: number;
  shipVia?: ShipVia;
  shipViaId: number;
  stockRoom?: StockroomsData;
  stockRoomId: number;
  rateOn?: RateOn;
  rateOnId: number;
  crossTradeInvoice: boolean;
  orderStatusId:number;
  orderStatus?:OrderStatus
}
