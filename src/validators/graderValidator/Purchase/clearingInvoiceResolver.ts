import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const addClearingInvoiceResolver = yupResolver(
  Yup.object().shape({
    date: Yup.string().required("Date is Required"),
    containerNo: Yup.string().required("Container No is Required"),
    volume: Yup.string().required("Volume is Required"),
    agent: Yup.string().required("Agent is Required"),
    consignee: Yup.string().required("Consignee is Required"),
    invoiceNo: Yup.string().required("Invoice No is Required")
  })
);
export const editClearingInvoiceResolver = yupResolver(
  Yup.object().shape({
    date: Yup.string().required("Date is Required"),
    containerNo: Yup.string().required("Container No is Required"),
    volume: Yup.string().required("Volume is Required"),
    agent: Yup.string().required("Agent is Required"),
    consignee: Yup.string().required("Consignee is Required"),
    invoiceNo: Yup.string().required("Invoice No is Required"),
    chargeType: Yup.string().required("Charge Type is Required"),
    amount: Yup.number().required("Amount is Required"),
  })
);