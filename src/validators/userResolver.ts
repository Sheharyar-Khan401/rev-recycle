import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const SignupResolver = yupResolver(
  Yup.object().shape({
    // username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Please Enter correct email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    phone: Yup.string().required("Phone number is required"),
    confirmPwd: Yup.string()
      .required("Password is Required")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  })
);
export const LoginResolver = yupResolver(
  Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  })
);
export const ForgotPasswordResolver = yupResolver(
  Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPwd: Yup.string()
      .required("Password is Required")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  })
);
export const BusinessSetupResolver = yupResolver(
  Yup.object().shape({
    businessType: Yup.string().required("Business Type is required"),
    companyName: Yup.string().required("Company Name is required"),
    size: Yup.string().required("Company Size is required"),
  })
);
export const newUserResolver = yupResolver(
  Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    confirmPwd: Yup.string()
      .required("Password is Required")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
    email: Yup.string()
      .required("Email is Required")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Invalid Email"
      ),
    phoneNo: Yup.string().required("Phone no is required"),
    expiryDate: Yup.string()
      .required("Expiry Date is Required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Inavlid Date Format"
      ),
    userStatus: Yup.string().required("Status is required"),
  })
);
export const editUserResolver = yupResolver(
  Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
    userName: Yup.string().required("Username is required"),
    email: Yup.string()
      .required("Email is Required")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Invalid Email"
      ),
    phoneNo: Yup.string().required("Phone no is required"),
    expiryDate: Yup.string()
      .required("Expiry Date is Required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Inavlid Date Format"
      ),
    userStatus: Yup.string().required("Status is required"),
  })
);
