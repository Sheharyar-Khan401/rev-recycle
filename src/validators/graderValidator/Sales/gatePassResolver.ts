import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
export const basicGPResolver = yupResolver(
    Yup.object().shape({
      invoiceTypeId: Yup.number().required("").min(1, "Invoice Type is required"),
      date: Yup.string()
      .required("Date is Required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Inavlid Date Format"
      ),
      

    })
  );