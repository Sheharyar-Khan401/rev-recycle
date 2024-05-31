import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const issuanceResolver = yupResolver(
  Yup.object().shape({
    issuanceDate: Yup.string().required("Date is required"),
  })
);
export const barcodeResolver = yupResolver(
  Yup.object().shape({
    barcode: Yup.string().required("Barcode is required")
  })
);
