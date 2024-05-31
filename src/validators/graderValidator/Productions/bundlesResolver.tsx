import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const bundlesResolver = yupResolver(
  Yup.object().shape({
    barcode: Yup.string().required("Barcode is required"),
  })
);
