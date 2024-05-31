export interface CashAccount {
  accountId?: number;
  account?: CashAccountData;
  cashAccountTitle?: string;
  cashAccountId?: number;
  accountTitle?: string;
}

export interface CashAccountData extends Record<string, number | string> {
  accountId: number;
  accountTitle: string;
  cashAccountTitle: string;
  cashAccountId: number;
}
