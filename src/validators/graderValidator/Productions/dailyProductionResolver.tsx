import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const dailyProductionResolver = yupResolver(
  Yup.object().shape({
    date: Yup.string().required("Date is required"),
    stationId: Yup.number().required("").min(1, "Station are required"),
  })
);

export const dailyProductionEditResolver = yupResolver(
    Yup.object().shape({
      stationId: Yup.number().required("").min(1, "Stations are required"),

    })
  );