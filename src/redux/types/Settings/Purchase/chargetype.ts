export interface ChargeType {
  name?:string;
  invoiceChargeTypeId: number;
  amount?: number;
  chargeTypeId: number;
  chargeType?: ChargeType;
}
export interface ChargeTypeRequest extends Record<string, number | string> {
  invoiceChargeTypeId: number;
  amount: number;
  chargeTypeId: number;
}
export interface ChargeTypeRequests extends Record<string, number | string> {
  name:string
  chargeTypeId: number;

}
