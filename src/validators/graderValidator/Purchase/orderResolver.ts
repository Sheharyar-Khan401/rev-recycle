import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const purchaseOrderResolver = yupResolver(
  Yup.object().shape({
    orderDate: Yup.string()
      .required("Date is Required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Inavlid Date Format"
      ),
    clientId: Yup.number().required("").min(1, "Select Supplier"),
    invoiceTypeId: Yup.number().required("Invoice Type is Required").min(1, "Invoice Type is Required"),
    orderStatusId: Yup.number().required("").min(1, "Select Order Status"),
    businessCurrencyId: Yup.number().required("").min(1, "Select Currency"),
  })
);
