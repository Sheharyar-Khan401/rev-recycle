import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const bankReceiptVoucherResolver = yupResolver(
  Yup.object().shape({
    vochrd: Yup.string()
    .required("Date is Required")
    .matches(
      /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
      "Inavlid Date Format"
    ),
    voucherId: Yup.number().required("Voucher ID is Required"),
    voucherStatusId:Yup.number().required("Status is Required"),
    currencyId: Yup.number().required("Currency is Required").min(1,"Currency is Required"),
    voucherExchangeRate:Yup.number().required("Excahnge Rate is Required").moreThan(0,"Exchange Rate should be greater than zero"),
    
  })
);