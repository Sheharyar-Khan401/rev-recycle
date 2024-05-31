import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const bulkPostResolver = yupResolver(
  Yup.object().shape({
    date: Yup.string().required("Date is Required"),
    customer: Yup.string().required("Customer is Required"),
    reference: Yup.string().required("Reference is Required"),
    terms: Yup.string().required("Terms is Required"),
    currency: Yup.string().required("Currency is Required"),
    exrate: Yup.string().required("Exchange Rate is Required"),
    type: Yup.string().required("Type is Required"),
    stockRoom: Yup.string().required("Stockroom is Required"),
  })
);