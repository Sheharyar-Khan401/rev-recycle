import { Account } from "redux/types/Finance/PrimaryData/account";
export interface ProductionFOHValues {
  account?: Account;
  accountId: number;
  fohDate: number;
  fohValue: number;
  fohValueId?: number;
}
export interface ProductionFOHValuesRequest extends Record<string, number | string | boolean> {
  accountId: number;
  fohDate: string;
  fohValue: number;
  fohValueId: number;
}

export interface OpeningBalanceData {
  openingBalanceId: number;
  wipOpeningAmount: number;
  wipOpeningDate: number;
  wipOpeningIBS: number;
}

export interface OpeningBalanceRequest {
  openingBalanceId: number;
  wipOpeningAmount: number;
  wipOpeningDate: string;
  wipOpeningIBS: number;
}

