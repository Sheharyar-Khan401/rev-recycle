export default interface Issuance {
  issuanceId: number;
  itemName: string;
  supplierName: string;
  quantity: number;
  weightKg: number;
  weightLbs: number;
  amount: number;
  percentage: number;
  amtPerKg: number;
  amtPerLbs: number;
  gradeName: string;
  floorName: string;
  date:number;
  issuanceTypeId:number;
  locationName: string,
  beltName:string
  containerNo:string
  reference:string
  categoryName:string
  unitCode: number
}
