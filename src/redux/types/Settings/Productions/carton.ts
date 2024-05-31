export interface CartonsData {
  cartonId: number;
  name: string;
}
export interface CartonsRequest {
  cartonId: number;
  name?: string;
}
export interface CartonTableRequest extends Record<string, number | string> {
  cartonId: number;
  name: string;
}
