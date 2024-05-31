import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const BrandsResolver = yupResolver(
  Yup.object().shape({
    name: Yup.string().required("Brand Name is Required"),
    code: Yup.string().required("Brand Code is Required"),
    weightInKgs: Yup.number()
      .min(0, "Weight cannot be less than 0")
      .required("Weight(Kgs) is Required"),
    weightUnitId: Yup.number()
      .required("Select Printable Weight Unit")
      .min(1, "Select Printable Weight Unit"),
    weightLimit: Yup.number()
      .min(0, "Weight Limit cannot be less than 0")
      .required("Weight Limit is Required"),
  })
);
