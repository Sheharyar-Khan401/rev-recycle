import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
export const ClientItemRatesResolver = yupResolver(
  Yup.object().shape({
    clientItemRateId: Yup.number().required().positive().integer().moreThan(0),
    oldUnitRate: Yup.number().required().positive().integer().moreThan(0),
    newUnitRate: Yup.number().required().positive().integer().moreThan(0),
  })
);
