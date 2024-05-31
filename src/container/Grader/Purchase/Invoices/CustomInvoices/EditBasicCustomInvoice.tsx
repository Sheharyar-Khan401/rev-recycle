import React, { useEffect, useState } from "react";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import EditBasicCustomInvoiceForm from "components/Purchase/Invoices/EditBasicCustomInvoiceForm";
import {
  useEditBasicPurchaseInvoiceMutation,
  useLazyGetByIdPurchaseInvoiceQuery,
} from "redux/features/purchase/Invoices/InvoicesApiSlice";
import { InvoicesRequest } from "redux/types/Invoices/Invoices";
import { useForm } from "react-hook-form";
import { editBasicCustomInvoiceResolver } from "validators/graderValidator/Purchase/invoiceResolver";
import {
  ChargeType,
  ChargeTypeRequest,
} from "redux/types/Settings/Purchase/chargetype";
import { useNavigate, useParams } from "react-router-dom";
import { getDateFromMillis } from "helper/utility";

export default function EditBasicCustomInvoice({
  systemInvoiceId,
}: {
  systemInvoiceId: number;
}) {
  const defaultValues: InvoicesRequest = {
    invoiceId: 0,
    invoiceDate: "",
    volume: 0,
    containerNo: "",
    placeOfReceipt: "",
    invoiceNo: "",
    paid: false,
    budgetAmount: 0,
    billToSupplier: false,
    clientId: 0,
    currencyId: 0,
    // shippingLineId: 0,
    systemInvoiceId,
    bill: false,
  };
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [rowData, setRowData] = useState<ChargeTypeRequest[]>([]);

  const [editBasicInvoice, { isLoading: BasicLoading }] =
    useEditBasicPurchaseInvoiceMutation();
  const [getInvoiceById, result] = useLazyGetByIdPurchaseInvoiceQuery();

  const {
    handleSubmit: handleBasicSubmit,
    control: basicControl,
    setValue: setBasicValue,
    formState: { errors: basicErrors },
  } = useForm<InvoicesRequest, null>({
    defaultValues: defaultValues,
    resolver: editBasicCustomInvoiceResolver,
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = params.id;

    if (id) {
      getInvoiceById(id);
    }
  }, [getInvoiceById, params.id]);
  useEffect(() => {
    if (result?.data) {
      setBasicValue(
        "invoiceId",
        result?.data?.invoiceId ? result?.data?.invoiceId : 0
      );
      setBasicValue(
        "invoiceDate",
        result?.data?.invoiceDate
          ? getDateFromMillis(result?.data?.invoiceDate)
          : ""
      );
      setBasicValue(
        "containerNo",
        result?.data?.containerNo ? result?.data?.containerNo : ""
      );
      setBasicValue(
        "placeOfReceipt",
        result?.data?.placeOfReceipt ? result?.data?.placeOfReceipt : ""
      );
      setBasicValue(
        "clientId",
        result?.data?.client?.clientId ? result?.data?.client?.clientId : 0
      );
      setBasicValue("volume", result?.data?.volume ? result?.data?.volume : 0);
      setBasicValue(
        "invoiceNo",
        result?.data?.invoiceNo ? result?.data?.invoiceNo : ""
      );
      setBasicValue("paid", result?.data?.paid ? result?.data?.paid : false);
      setBasicValue(
        "currencyId",
        result?.data?.businessCurrency?.businesscurrencyId
          ? result?.data?.businessCurrency?.businesscurrencyId
          : 0
      );
      // setBasicValue("shippingLineId", result?.data?.shippingLineId ?? 0);
      setBasicValue(
        "budgetAmount",
        result?.data?.budgetAmount ? result?.data?.budgetAmount : 0
      );
      setBasicValue(
        "billToSupplier",
        result?.data?.billToSupplier ? result?.data?.billToSupplier : false
      );
      setRowData(
        result?.data?.chargeTypes?.map((item: ChargeType) => {
          return {
            amount: item?.amount ? item?.amount : 0,
            chargeTypeId: item?.chargeType ? item?.chargeType?.chargeTypeId : 0,
            invoiceChargeTypeId: item?.invoiceChargeTypeId
              ? item?.invoiceChargeTypeId
              : 0,
          };
        })??[]
      );
    }
  }, [result?.data, setBasicValue]);
  const getTitle = () => {
    return systemInvoiceId === 2
      ? "Freight Invoices"
      : systemInvoiceId === 3
      ? "Clearing Invoices"
      : systemInvoiceId === 4
      ? "Delivery Order Invoices"
      : "";
  };
  const onSubmitBasic = async (values: InvoicesRequest) => {
    const chargeTypes = rowData;
    const result = await editBasicInvoice({
      ...values,
      chargeTypes,
    });

    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };
  return (
    <div>
      <ActionBarAddEdit
        title={"Basic " + getTitle()}
        mode={!result.data?.posted && !result.isLoading ? "EDIT" : ""}
        isLoading={BasicLoading}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onSubmit={handleBasicSubmit(onSubmitBasic)}
      />
      <EditBasicCustomInvoiceForm
        isEdit={isEdit}
        control={basicControl}
        errors={basicErrors}
        rowData={rowData}
        setRowData={setRowData}
      />
    </div>
  );
}
