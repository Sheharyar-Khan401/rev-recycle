import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const requisitionResolver = yupResolver(
  Yup.object().shape({
    date: Yup.string().required("Date is Required"),
    invoiceNo: Yup.string().required("Invoice No is Required"),
    requesteeName: Yup.string().required("Requestee Name is Required"),
    supplier: Yup.string().required("Supplier is Required"),
    currency: Yup.string().required("Currency is Required"),
    reference: Yup.string().required("Reference is Required"),
    particulars: Yup.string().required("Particulars is Required"),
  })
);