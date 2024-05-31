import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const accountsettingproductionResolver = yupResolver(
  Yup.object().shape({
    finishedGoods: Yup.number()
      .required("")
      .min(1, "Finished Good is Required"),

    workProgress: Yup.number().required("").min(1, "Work Progress is Required"),
    accusedProductionExpense: Yup.number()
      .required("")
      .min(1, "Accused Production Expense is Required"),
    production: Yup.number().required("").min(1, "Production is Required"),

    workInProgress: Yup.number()
      .required("")
      .min(1, "Work in Progress is Required"),

    productionRawMaterial: Yup.number()
      .required("")
      .min(1, "Production Raw Material is Required"),
    productionAccuredExpense: Yup.number()
      .required("")
      .min(1, "Production Accused Expense is Required"),
    debitWorkinProgress: Yup.number()
      .required("")
      .min(1, "Debit Working Progress is Required"),
    creditFinishedGoods: Yup.number()
      .required("")
      .min(1, "Credit Finished Goods is Required"),
    creditProductionAccureExpense: Yup.number()
      .required("")
      .min(1, "Credit Production Accure Expense is Required"),
    wipWorkInProgress: Yup.number()
      .required("")
      .min(1, "Wip Work in Progress is Required"),
    retainedEarnings: Yup.number()
      .required("")
      .min(1, "Retained Earnings is Required"),
    impairedStockAccount: Yup.number()
      .required("")
      .min(1, "Impaired Stock Account is Required"),
    wipFinishedGoods: Yup.number()
      .required("")
      .min(1, "Wip Finished Goods is Required"),
  })
);
export const accountsettingpurchaseResolver = yupResolver(
  Yup.object().shape({
    debitRawMaterials: Yup.number()
      .required("")
      .min(1, "Debit Raw Material is Required"),
    creditFreightPaymentAccounts: Yup.number()
      .required("")
      .min(1, "Credit Freight Payment Account is Required"),
    clearingPaymentAccounts: Yup.number()
      .required("")
      .min(1, "Clearing Payment Account is Required"),
    deliveryOrderprePaymentAcounts: Yup.number()
      .required("")
      .min(1, "Delivery Order Prepayment Account is Required"),
    comissionPrePaymentAccounts: Yup.number()
      .required("")
      .min(1, "Comission Prepayment Account is Required"),
    freightBillAccounts: Yup.number()
      .required("")
      .min(1, "Freight Bill Account is Required"),
    clearingBillAccounts: Yup.number()
      .required("")
      .min(1, "Clearing Bill Account is Required"),
    deliveryOrderBillAccounts: Yup.number()
      .required("")
      .min(1, "Delivery Order Bill Account is Required"),
  })
);
export const accountsettingsaleResolver = yupResolver(
  Yup.object().shape({
    debitCostofGoods: Yup.number()
      .required("")
      .min(1, "Debit Cost of Goods is Required"),
    creditRawMaterial: Yup.number()
      .required("")
      .min(1, "Credit Raw Material is Required"),
    creditFinishedGoods: Yup.number()
      .required("")
      .min(1, "Credit Finished Goods is Required"),
    saleIncomeAccount: Yup.number()
      .required("")
      .min(1, "Sale Income Account is Required"),
    taxAccount: Yup.number().required("").min(1, "Tax Account is Required"),
    saleInvoiceDiscount: Yup.number()
      .required("")
      .min(1, "Sale Invoice Discount is Required"),
    freightExpertise: Yup.number()
      .required("")
      .min(1, "Freight Expertise is Required"),
    cleaningExpense: Yup.number()
      .required("")
      .min(1, "Cleaning Expense is Required"),
    cncExpense: Yup.number().required("").min(1, "CNC Expense is Required"),
    otherInvoice: Yup.number().required("").min(1, "Other Invoice is Required"),
    freightInvoice: Yup.number()
      .required("")
      .min(1, "Freight Invoice is Required"),
    clearBillInvoice: Yup.number()
      .required("")
      .min(1, "Clear Bill Invoice is Required"),
    otherBill: Yup.number().required("").min(1, "Other Bill is Required"),
  })
);
export const accountsettingcommonResolver = yupResolver(
  Yup.object().shape({
    purchaseAccount: Yup.number()
      .required("")
      .min(1, "Purchase Account is Required"),
  })
);
