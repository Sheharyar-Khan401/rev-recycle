import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const fiscalgroupResolver = yupResolver(
  Yup.object().shape({
    name: Yup.string().required("Fiscal Year is Required"),
    startDate: Yup.string()
      .required("Start Date is Required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Inavlid Date Format"
      ),
    endDate: Yup.string()
      .required("End Date is Required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Invalid Date Format"
      ),
    active: Yup.boolean().required("Status is Required"),
  })
);
export const costgroupResolver = yupResolver(
  Yup.object().shape({
    name: Yup.string().required("Cost Group is Required"),
    costgrouptypeId: Yup.number().required("").min(1, "Select Cost Group Type"),
  })
);
export const accountResolver = yupResolver(
  Yup.object().shape({
    accountTitle: Yup.string().required("Account Title is Required"),
    accountCode: Yup.string().required("Account Code is Required"),
    // currencyId: Yup.number().required("").min(1, "Select Currency"),
  })
);
export const editaccountResolver = yupResolver(
  Yup.object().shape({
    accountTitle: Yup.string().required("Account Title is Required"),
    accountCode: Yup.string().required("Account Code is Required"),
    // currencyId: Yup.number().required("").min(1, "Select Currency"),
    // accountTypeId: Yup.number().required("").min(1, "Select Account Type"),
    reportGroupId: Yup.number().required("").min(1, "Select Report Group"),
    // groupId: Yup.number().required("").min(1, "Select Account Group"),

  })
);
export const addBankAccountResolver = yupResolver(
  Yup.object().shape({
    // accountId: Yup.string().required("id"),
    accountId: Yup.number().required("").min(1, "Select Account"),
  })
);
export const editBankAccountResolver = yupResolver(
  Yup.object().shape({
    bankAccountTitle: Yup.string().required("Account Title is Required"),
  })
);
export const currencyResolver = yupResolver(
  Yup.object().shape({
    currency: Yup.string().required("Currency is Required"),
  })
);
