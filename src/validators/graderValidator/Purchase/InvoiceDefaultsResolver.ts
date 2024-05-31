import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const invoiceDefaultsResolver = yupResolver(
  Yup.object().shape({
    originLocationId: Yup.number()
      .required("")
      .min(1, "Select Origin Location"),
    destinationLocationId: Yup.number()
      .required("")
      .min(1, "Select Destination Location"),
    loadingPortId: Yup.number().required("").min(1, "Select Loading Port"),
    dischargePortId: Yup.number().required("").min(1, "Select Discharge Port"),
    shipViaId: Yup.number().required("").min(1, "Select Ship Via"),
    stockRoomId: Yup.number().required("").min(1, "Select Stockroom"),
    rateOnId: Yup.number().required("").min(1, "Select Rate On"),
    orderStatusId: Yup.number().required("").min(1, "Select Status"),
  })
);
