export interface FiscalYearRequest {
  fiscalYearId?: number;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
}
export interface FiscalYearResponse {
  fiscalYearId: number;
  name: string;
  startDate: number;
  endDate: number;
  active: boolean;
}
