import { Account } from "redux/types/Finance/PrimaryData/account";
export interface BankAccount {
  accountId?: number;
  account?: Account;
  address?: string;
  bankAccountCode?: string;
  bankAccountId?: number;
  bankAccountTitle?: string;
  bankIbanNumber?: string;
  bankName?: string;
  emailAddress?: string;
  faxNumber?: string;
  nameOfBranch?: string;
  payableAccount?: Account;
  receivableAccount?: Account;
  linkedAccountTitle?: string;
  payableAccountId?: number;
  phoneNumber?: string;
  receivableAccountId?: number;
}
