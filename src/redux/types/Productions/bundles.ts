export interface bundlesRequest {
  barcode: string;
  smop: boolean;
  print?: boolean;
}
export interface scannedBundles {
  items?: bundlesitems[];
}
export interface bundlesitems {
  name: string;
  id: number;
}
export interface Bundle {
  bundleId: number;
  bundleRef: string;
  orderRef: string;
  size: number;
  bundleNo: number;
  scannedOn: number;
  scanned: boolean;
}
