export interface Belt {
  beltId: number;
  name:string;
}
export interface BeltRequest extends Record<string, number | string > {
  beltId: number;
  name: string;
}
