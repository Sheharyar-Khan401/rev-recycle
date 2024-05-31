import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const taxTypeResolver = yupResolver(
  Yup.object().shape({
    taxType: Yup.string().required("Tax Type Name is Required"),
    account: Yup.string().required("Account is Required"),
    rate: Yup.string().required("Rate is Required"),
    deductPercentage: Yup.number().required("Deduct Percentage is Required")
  })
);