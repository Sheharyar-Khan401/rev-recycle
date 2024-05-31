import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const ClientsResolver = yupResolver(
  Yup.object().shape({
    clientName: Yup.string().required("Client Name is Required"),
    code: Yup.string().required("Client Code is Required"),
    // address: Yup.string().required("Client Address is Required"),
    // phoneNo: Yup.string().required("Client Phone number is Required"),
    // email: Yup.string().email().required("Client Email is Required"),
    // color: Yup.string().required("Color is Required"),
    // salesAccountId: Yup.number().required("").min(1, "Sales Account is Required"),
    // payableAccountId: Yup.number().required("").min(1, "Payable Account is Required"),
  })
);
