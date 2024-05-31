import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
export const overviewGatePassesResolver = yupResolver(
    Yup.object().shape({
      passingDate: Yup.string().required("Date is Required"),
      containerNo: Yup.string().required("Container Number is Required"),
      purchaseMethodId: Yup.number().required("Purchase Method is Required").min(1,"Purchase Method is Required"),
      kantaWeightUnit:Yup.number().required("Weight Unit is required").min(1,"Weight Unit is Required"),
      totalWeightKgs:Yup.number().required("Weight Kgs Is Required"),
      totalWeightLbs:Yup.number().required("Weight Kgs Is Required"),
    })
  );