import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { Account } from "redux/types/Finance/PrimaryData/account";
import { CostGroup } from "redux/types/Finance/PrimaryData/costgroup";
export interface Voucher {
  voucherId: number;
  voucherExchangeRate?: number;
  vochrd: number;
  transaction?: number;
  creditAmount?: number;
  debitAmount?: number;
  particulars?: string;
  cashaccountId?: number;
  currencyId?: number;
  currencyName?: string;
  businessCurrency?: BusinessCurrency;
  voucherType?: VoucherType;
  voucherStatus?: VoucherStatus;
  voucherStatusId?:number
  listOfVoucher?: listOfVoucher[];
  voucherStatusName?: string;
}
export interface VoucherRequest {
  vochrd: string;
  voucherId: number;
  particulars: string;
  cashaccountId?: number;
  currencyId: number;
  voucherTypeId?: number;
  voucherExchangeRate: number;
  listOfVoucher?: listOfVoucherRequest[];
  voucherStatusId?: number;
  voucherType?: string;
}
export interface listOfVoucher {
  voucherAccId?: number;
  vochrAccDesc?: string;
  narration: string;
  credit?: number;
  accountId: number;
  cgroup?: CostGroup;
  voucherAccountId: number;
  acc?: Account;
  costGroupId: number;
  debit: number;
  costgrupname?: string;
  accountTitle?: string;
  chqDate?: number;
  chqClearanceDate?: number;
  chqNo: number;
}
export interface listOfVoucherRequest
  extends Record<string, number | string | boolean> {
  narration: string;
  credit: number;
  accountId: number;
  voucherAccountId: number;
  costGroupId: number;
  debit: number;
}
export interface VoucherType {
  voucherTypeId: number;
  voucherTypeName: string;
}
export interface VoucherStatus {
  voucherStatusId: number;
  voucherStatusName: string;
}
