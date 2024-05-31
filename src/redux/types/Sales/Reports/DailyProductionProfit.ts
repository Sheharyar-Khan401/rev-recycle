export interface DailyProductionProfit {
  date: number;
  productionWeightKgs: number;
  productionWeightLbs: number;
  productionAmount: number;
  productionIssuanceWeightKgs: number;
  productionIssuanceWeightLbs: number;
  productionIssuanceAmount: number;
  productionProfitLoss: number;
  saleAmount: number;
  saleProductionAmount: number;
  saleProfitLoss: number;
  netProfitLoss: number;
  issuanceNetProfitLoss: number;
}
