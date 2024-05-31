export interface ShippingLineData {
  name: string;
  shippingLineId: number;
  
}
export interface ShippingLineRequest
  extends Record<string, number | string | number> {
  name: string;
  shippingLineId: number;
}
