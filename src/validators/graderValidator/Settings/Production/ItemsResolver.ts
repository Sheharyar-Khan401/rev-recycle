import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const itemsResolver = yupResolver(
  Yup.object().shape({
    name: Yup.string().required("Item Name is Required"),
    labelTypeId: Yup.number().required().min(1, "Label Type is Required"),
    categoryId: Yup.number().required("").min(1, "Category is Required"),
    expProQty: Yup.number().required("Exp is Required"),
    expProKgs: Yup.number().required("Exp is Required"),
    // unitWeight: Yup.number().required("").min(1, "Unit Weight is Required"),
    quantityUnitId:Yup.number().required("").min(1, "Pro Q-Unit is Required"),
    weightUnitId: Yup.number().required("").min(1, "Weight Unit is Required"),
    // unitRate: Yup.number().required("").min(1, "Unit Rate is Required"),
    rateOnId: Yup.number().required("").min(1, "Rate On is Required"),
    unitOfMeasurementId: Yup.number().required("").min(1, "UOM is Required"),
  })
);
