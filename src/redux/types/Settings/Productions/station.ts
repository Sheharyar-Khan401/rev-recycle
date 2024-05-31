export interface StationsData {
  name: string;
  discription: string;
  stationId: number;
}
export interface StationsRequest extends Record<string, number | string | boolean > {
  name: string;
  stationId: number;
}
