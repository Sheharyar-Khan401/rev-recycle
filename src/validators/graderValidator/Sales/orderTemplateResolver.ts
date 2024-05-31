import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const orderTemplateResolver = yupResolver(
  Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    brandId: Yup.number().required("Brand is Required").min(1,"Brand is Required"),
    clientId: Yup.number().required("Client is Required").min(1,"Client is Required"),
  })
);
