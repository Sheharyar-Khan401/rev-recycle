import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const itemResolver = yupResolver(
  Yup.object().shape({
    name: Yup.string().required("Item Name is Required"),
    categoryId: Yup.number().required().min(1, "Category is Required"),
    gradeId: Yup.number().required("").min(1, "Grade is Required"),
  })
);

