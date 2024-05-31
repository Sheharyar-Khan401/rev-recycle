import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const departmentsResolver = yupResolver(
  Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    displayOrder: Yup.number().required("Display Order is Required"),
  })
);
