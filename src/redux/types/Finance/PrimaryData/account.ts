import { Group } from "redux/types/common/group";
import { ReportGroup } from "redux/types/common/reportGroup";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { AccountType } from "redux/types/common/accountType";

export interface Account {
  accountCode?: string;
  accountId: number;
  accountLevel?: number;
  accountTitle: string;
  accountType?: AccountType;
  currency?: BusinessCurrency;
  depth?: number;
  group?: Group;
  parentAccountId?: number;
  reportGroup?: ReportGroup;
  totalTxns?: number;
  controlAccountRef: string;
}
export interface AccountRequest {
  accountId?: number;
  accountCode: string;
  accountLevel?: number;
  accountTitle: string;
  accountType?: string;
  accountTypeId: number;
  currencyId?: number;
  depth?: number;
  groupId?: number;
  parentAccountId: number;
  reportGroupId?: number;
  totalTxns?: number;
  controlAccountRef: string;
}
