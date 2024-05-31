export interface SortedRoomsData {
  name: string;
  sortedRoomId: number;
}
export interface SortedRoomRequest extends Record<string, number | string > {
  name: string;
  sortedRoomId: number;
}
