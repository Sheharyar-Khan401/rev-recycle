import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const SettingsFOHValueResolver = yupResolver(
  Yup.object().shape({
    fohDate: Yup.string().required("Date is required"),
    fohValue: Yup.number().required("FOH Values is required"),
    accountId: Yup.number().required("Account is required"),
  })
);

export const SettingsOpeningBalanceResolver = yupResolver(
  Yup.object().shape({
    wipOpeningDate: Yup.string().required("Opening Date is required"),
    wipOpeningAmount: Yup.number()
      .required("Opening Amount is required")
      .moreThan(0),
    wipOpeningIBS: Yup.number().required("Opening IBS is required").moreThan(0),
  })
);
