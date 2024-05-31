export interface Location {
  displayOrder: number;
  location?: string;
  locationId: number;
  name?: string;
  shortName: string;
}

export interface LocationRequest extends Record<string, number | string | string | number> {
  displayOrder: number;
  locationId: number;
  name: string;
  shortName: string;
}
