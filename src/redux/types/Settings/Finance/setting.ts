export interface Settings {
  creationDate: number;
  description: string;
  exchangeRateVoucher: boolean;
  financeSettingId: 1;
  misvalue: boolean;
  modificationDate: number;
  status: string;
  tax: number;
}

export interface SettingsRequest {
  exchangeRateVoucher: boolean;
  financeSettingId: number;
  misvalue: boolean;
  tax: number;
}

