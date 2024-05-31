import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const purchaseInvoiceResolver = yupResolver(
  Yup.object().shape({
    invoiceDate: Yup.string().required("Date is Required"),
    invoiceNo: Yup.string().required("Invoice No. is Required"),
    paymentTermId: Yup.number().required().min(1, "Payment Term is Required"),
    clientId: Yup.number()
      .required("Supplier is Required")
      .min(1, "Supplier is Required"),
    invoiceTypeId: Yup.number().required().min(1, "Invoice Type is Required"),
    exRate: Yup.number()
      .moreThan(0, "Exchange Rate should be greater than zero")
      .required("Exchange Rate is Required")
      .typeError("Exchange Rate must be a number"),
    currencyId: Yup.number().required().min(1, "Currency is Required"),
    // rateOnId: Yup.number().required().min(1, "Rate On is Required"),
    originLocationId: Yup.number().required().min(1, "Origin is Required"),
    destinationLocationId: Yup.number()
      .required()
      .min(1, "Destination is Required"),
    loadingPortId: Yup.number().required().min(1, "Loading Port is Required"),
    stockroomId: Yup.number().required().min(1, "Stock Room is required"),
    dischargePortId: Yup.number()
      .required()
      .min(1, "Discharge Port is Required"),
    orderStatusId: Yup.number().required().min(1, "Order Status is Required"),
    shipViaId: Yup.number().required().min(1, "Ship Via is Required"),
    containerNo: Yup.string().required("Container No. is Required"),
  })
);

export const customInvoiceResolver = yupResolver(
  Yup.object().shape({
    invoiceDate: Yup.string().required("Date is Required"),
    containerNo: Yup.string().required("Container No. is Required"),
    invoiceNo: Yup.string().required("Invoice Number is Required"),
    clientId: Yup.number().required("").min(1, "Agent is required"),
    currencyId: Yup.number().required("").min(1, "Currency is required"),
  })
);
export const editBasicCustomInvoiceResolver = yupResolver(
  Yup.object().shape({
    invoiceDate: Yup.string().required("Date is Required"),
    containerNo: Yup.string().required("Container No. is Required"),
    invoiceNo: Yup.string().required("Invoice No. is Required"),
    //clientId: Yup.number().required("").min(1, "Agent is required"),
    // currencyId: Yup.number().required("").min(1, "Currency is required"),
  })
);
export const editBillCustomInvoiceResolver = yupResolver(
  Yup.object().shape({
    bill: Yup.string().required("Bill is Required"),
  })
);
