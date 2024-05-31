import { BusinessCurrency } from "redux/types/Settings/Finance/currency";

export interface Branch {
  branchId: number;
  name: string;
  description: string;
  creationDate: number;
  modificationDate: number;
  status: string;
}

export interface BranchBankAccount {
  branchBankAccountId: number;
  swiftCode: string;
  name: string;
  bankName: string;
  active: boolean;
  creationDate: string;
  modificationDate: string;
  status: string;
  branch: Branch;
  bankAccountCurrency?: BankAccountCurrency;
}
export interface BankAccountCurrency {
  bankAccountCurrencyId: number;
  accountCode: string;
  creationDate: number;
  modificationDate: number;
  status: string;
  currency?: BusinessCurrency;
  iban: string;
}
