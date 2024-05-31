import { Client } from "redux/types/Clients/Clients/client";
import { Brand } from "redux/types/Settings/Productions/brand";
import { Item } from "../Settings/Productions/items";
export interface ItemRate {
  saleOrderTemplateId: number;
  saleOrderName: string;
  brandId: number;
  clientId: number;
  brand?: Brand;
  client?: Client;
  items?: Item[];
}
export interface ItemRateRequest {
  clientItemRateId: number;
  printName: string;
  unitRate: number;
  item?: Item;
  client?: Client;
}
