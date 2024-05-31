import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const transferSaleOrderUnitResolver = yupResolver(
  Yup.object().shape({
    transferDate: Yup.string().required("Date is required"),
  })
);

