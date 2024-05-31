import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const invoicingResolver = yupResolver(
  Yup.object().shape({
    invoiceDate: Yup.string().required("Invoice Date is Required"),
    invoiceNo: Yup.string().required("Invoice No is Required"),
    dueDate: Yup.string().required("Due Date is Required"),
    client: Yup.string().required("Client is Required"),
    currency: Yup.string().required("Currency is Required"),
    exchangeRate: Yup.string().required("Exchange Rate is Required"),
    invoiceType: Yup.string().required("Invoice Type is Required")
  })
);