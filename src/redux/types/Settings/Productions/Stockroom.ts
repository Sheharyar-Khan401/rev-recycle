export interface StockroomsData {
  name: string;
  stockRoomId: number;
  units?: number;
  weightKgs?: number;
  weightLbs?: number;
}
export interface StockroomRequest extends Record<string, number | string> {
  name: string;
  stockRoomId: number;
}
