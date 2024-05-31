import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const yearEndProcessResolver = yupResolver(
  Yup.object().shape({
    fiscalYear: Yup.number().required("Fiscal Year is Required"),
    account: Yup.string().required("Account is Required")
  })
);