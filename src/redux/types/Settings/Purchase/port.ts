export interface Port {
  displayOrder: number;
  name: string;
  portId: number;
}
export interface PortRequest extends Record<string, number | string | number> {
  displayOrder: number;
  name: string;
  portId: number;
}

