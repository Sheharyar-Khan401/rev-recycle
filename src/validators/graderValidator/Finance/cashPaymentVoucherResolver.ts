import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const cashPaymentVoucherResolver = yupResolver(
  Yup.object().shape({
    date: Yup.string().required("Date is Required"),
    voucherId: Yup.string().required("Voucher ID is Required"),
    status: Yup.string().required("Status is Required"),
    cashAccounts: Yup.string().required("Cash Account is Required"),
    currencyType: Yup.string().required("Currency Type is Required"),
    currency: Yup.string().required("Currency is Required"),
    accountTitle: Yup.string().required("Account Title is Required"),
    narration: Yup.string().required("Narration is Required"),
    credit: Yup.string().required("Credit is Required"),
    costGroup: Yup.string().required("Cost Group is Required"),
    total: Yup.number().required("Total is Required"),
  })
);