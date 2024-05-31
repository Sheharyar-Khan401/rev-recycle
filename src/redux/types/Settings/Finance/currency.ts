export interface BusinessCurrency {
  businesscurrencyId?: number;
  currencyId?: number;
  currencyName?: string;
  currency?: CurrencyRequest;
  name?:string
  locked?:boolean
}
export interface CurrencyRequest extends Record<string, number | string | boolean> {
  businesscurrencyId: number;
  currencyId: number;
  name: string;
  locked:boolean
}

