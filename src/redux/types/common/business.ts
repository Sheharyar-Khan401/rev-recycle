
export interface Business {
  businessId: number;
  companyName: string;
  size: number;
  monthlyBilling: boolean;
  annualBilling: boolean;
}
export interface BusinessType {
  businessTypeId: number;
  name: string;
  description: string;
  businessList?: Array<Business>;
}
export interface BusinessRequest {
  companyName: string;
  size: number;
  businesstype: number[];
}
