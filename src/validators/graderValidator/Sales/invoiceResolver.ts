import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


export const saleInvoiceResolver = yupResolver(
  Yup.object().shape({
    referenceNumber: Yup.string().required("Reference No. is Required"),
    invoiceDate: Yup.string().required("Date is Required"),
    clientId: Yup.number().min(1, "Customer is Required"),
    paymentTermId: Yup.number().min(1, "Payment Term is Required"),
    orderStatusId: Yup.number().min(1, "Order Status is Required"),
    exRate: Yup.number()
    .moreThan(0, "Exchange Rate should be greater than zero")
    .required("Exchange Rate is Required")
    .typeError("Exchange Rate must be Number"),
    currencyId: Yup.number().required("Currency is Required").min(1, "Currency is Required"),
    invoiceTypeId: Yup.number().min(1, "Invoice Type is Required"),
    // containerNo: Yup.string().required("Container No. is Required"),
    shipViaId: Yup.number().min(1, "Ship Via is Required"),
    tax: Yup.number().required("Tax% is Required").min(1,"Tax is Required").typeError("Tax must be Number"),
    rateDecimalPlaces: Yup.number().required("Rate Decimal is Required").min(1,"Rate Decimal should be greater than zero").typeError("Rate Decimal Must be Number"),
    // branchBankAccountId: Yup.number().min(1, "Bank Account is Required"),
    // currencyId: Yup.number().min(1, "Currency is Required"),
    // exRate: Yup.number().required("Ex. Rate is Required"),
    // originLocationId: Yup.number().min(1, "Origin is Required"),
    // destinationLocationId: Yup.number().min(1, "Destination is Required"),
    // loadingPortId: Yup.number().min(1, "Loading Port is Required"),
    // dischargePortId: Yup.number().min(1, "Discharge Port is Required"),
    // eta: Yup.string().required("ETA is Required"),
    // etd: Yup.string().required("ETD is Required"),
    // sealNo: Yup.string().required("Seal No. is Required"),
    // invoiceNo: Yup.string().required("Invoice No. is Required"),
    // bolNo: Yup.number().required("B.O.L is Required"),
    // bolDate: Yup.string().required("B.O.L Date is Required"),
    // vesselNo: Yup.number().required("Vessel No is Required"),
    // bookingNumber: Yup.string().required("Booking No. is Required"),
  })
);
export const addInvoiceResolver = yupResolver(
  Yup.object().shape({
    invoiceDate: Yup.string().required("Date is Required"),
    containerNo: Yup.string().required("Container No. is Required"),
    invoiceNo: Yup.string().required("Invoice No. is Required"),
    clientId: Yup.string().required("Agent is Required")

  })
);
export const editBasicInvoiceResolver = yupResolver(
  Yup.object().shape({
    invoiceDate: Yup.string().required("Date is Required"),
    containerNo: Yup.string().required("Container No. is Required"),
    invoiceNo: Yup.string().required("Invoice No. is Required"),
    clientId: Yup.string().required("Agent is Required")
  })
);
export const editBillInvoiceResolver = yupResolver(
  Yup.object().shape({
    bill: Yup.string().required("Bill is Required"),
  })
);
