export interface SaleOrderBasic {
  date: string;
  reference: string;
  statusId: number;
  customerId: number;
  typeId: number;
  currencyId: number;
  categoryId: number;
  showInDp: boolean;
  finalized: boolean;
  running: boolean;
  stockRoomId: number;
  brandId: number;
  proPriority: number;
  eta: string;
  maxShipmentWeight: number;
  weightDiff: number;
  description: string;
  orderTemplateId?: number;
}
