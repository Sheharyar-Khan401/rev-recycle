import { Account } from "redux/types/Finance/PrimaryData/account";

export interface ExpenseRequest
  extends Record<string, number | string | boolean> {
  expenseAccountId: number;
  accountId: number;
}
export interface ExpenseData {
  expenseAccountId: number;
  account?: Account;
}
