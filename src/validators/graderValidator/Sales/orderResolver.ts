import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
export const saleOrderBasicResolver = yupResolver(
  Yup.object().shape({
    orderDate: Yup.string()
      .required("Date is Required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Inavlid Date Format"
      ),
    reference: Yup.string().required("Reference is Required"),
    orderStatusId: Yup.number().required("").min(1, "Status is required"),
    clientId: Yup.number().required("").min(1, "Customer is required"),
    stockroomId: Yup.number().min(1).required("Stockroom is required"),
    invoiceTypeId: Yup.number().required("").min(1, "Invoite Type is required"),
    businessCurrencyId: Yup.number()
      .required("")
      .min(1, "Currency is required"),
    production: Yup.boolean().required(""),
    proPriority: Yup.number()
      .required("Pro Priority is Required")
      .min(1, "Pro Priority is required"),
  })
);
