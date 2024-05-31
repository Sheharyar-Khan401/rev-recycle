import { Account } from "redux/types/Finance/PrimaryData/account";
import { BankAccount } from "redux/types/Finance/PrimaryData/bankAccount";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { UserData } from "redux/types/Settings/user";

export interface Client {
  payableAccount?: Account;
  salesAccount?: Account;
  user?: UserData;
  active?: boolean;
  bankAccount?: BankAccount;
  currency?: BusinessCurrency;
  businessCurrency?: BusinessCurrency;
  clientId: number;
  code?: string;
  address?: string;
  color?: string;
  clientName?: string;
  email?: string;
  phoneNo?: string;
  payableAccountId?: number;
  salesAccountId?: number;
  gitAccountId?: number;
  freightAcc?: number;
  cleaningAcc?: number;
  gitAccount?: Account;
  freightAccount?: Account;
  cleaningAccount?:Account;
  status?: string;
  supplier?: boolean;
  client?: boolean;
  agent?: boolean;
  otherAccount?: Account;
  otherAccountId?: number;
  recordFinanceSeparately?: boolean;
  businessCurrencyId?: number;
}
export interface ClientRequest {
  clientId?: number;
  clientName: string;
  code: string;
  address: string;
  phoneNo: string;
  email: string;
  color: string;
  salesAccountId?: number;
  payableAccountId: number;
  accountId?: number;
  isClient: boolean;
  isSupplier: boolean;
  isAgent: boolean;
  businessCurrencyId: number;
  active: boolean;
  bankAccountId?: number;
  gitAccountId?: number;
  otherAccountId?: number;
  recordFinanceSeparately?: boolean;
}
