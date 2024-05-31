import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const addCurrencyResolver = yupResolver(
  Yup.object().shape({
    currency: Yup.string().required("Currency is required"),
    currencyInitials: Yup.string().required("Currency Initials is required"),
  })
);
export const editPurchaseCurrencyResolver = yupResolver(
  Yup.object().shape({
    purchaseCurrency: Yup.string().required("Purchase Currency is required"),
    salesCurrency: Yup.string().required("Sales Currency is required"),
    gp: Yup.string().required("Calculation Unit is required"),
  })
);
export const editAccountsResolver = yupResolver(
  Yup.object().shape({
    purchaseClearing: Yup.string().required(
      "Purchase Clearing Advance Debit Payment is Required"
    ),
    purchaseFreight: Yup.string().required(
      "Purchase Freight Invoice Debit Account is Required"
    ),
    goodsCost: Yup.string().required("Cost of Goods is Required"),
    inventoryAccount: Yup.string().required("Inventory Account is Required"),
    localSales: Yup.string().required("Local Sales Account is Required"),
    salesInvoice: Yup.string().required(
      "Sales Invoice Discount Account is Required"
    ),
  })
);
export const addTypeResolver = yupResolver(
  Yup.object().shape({
    name: Yup.string().required("Invoice Type Name is required"),
  })
);
export const addPortResolver = yupResolver(
  Yup.object().shape({
    portName: Yup.string().required("Port Name is required"),
  })
);
export const addLocationResolver = yupResolver(
  Yup.object().shape({
    locationName: Yup.string().required("Location Name is required"),
  })
);
export const addChargeTypeResolver = yupResolver(
  Yup.object().shape({
    chargeType: Yup.string().required("Charge Type is required"),
  })
);
export const addCategoryResolver = yupResolver(
  Yup.object().shape({
    categoryname: Yup.string().required("Category Name is required"),
  })
);
export const editCategoryResolver = yupResolver(
  Yup.object().shape({
    categoryname: Yup.string().required("Root Category Name is required"),
    subCategory: Yup.string().required("Sub Category Name is required"),
    weightKgs: Yup.string().required("Weight(Kgs) is required"),
    weightLbs: Yup.string().required("Weight(Lbs) is required"),
  })
);
