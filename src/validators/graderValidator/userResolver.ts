import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const SignupResolver = yupResolver(
  Yup.object().shape({
    // username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    phone: Yup.string().required("Phone number is required"),
  })
);
export const LoginResolver = yupResolver(
  Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  })
);
export const BusinessSetupResolver = yupResolver(
  Yup.object().shape({
    businessType: Yup.string().required("Business Type is required"),
    companyName: Yup.string().required("Company Name is required"),
    companySize: Yup.string().required("Company Size is required"),
  })
);
export const newUserResolver = yupResolver(
  Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone no is required"),
    expiry: Yup.string().required("Expiry Date is required"),
    status: Yup.string().required("Status is required"),
  })
);
