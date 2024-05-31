import { Account } from "redux/types/Finance/PrimaryData/account";
export interface SurplusRequest
  extends Record<string, number | string | boolean> {
  surplusAccountId: number;
  accountId: number;
}
export interface SurplusData {
  surplusAccountId: number;
  account?: Account;
}
