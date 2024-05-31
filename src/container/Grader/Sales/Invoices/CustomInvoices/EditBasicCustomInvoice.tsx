import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  editBasicInvoiceResolver,
} from "validators/graderValidator/Sales/invoiceResolver";
import EditBasicCustomInvoiceForm from "components/Sales/Invoices/EditBasicCustomInvoiceForm";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditBasicSaleInvoiceMutation,
  useLazyGetSaleInvoiceByIdQuery,
} from "redux/features/sales/saleInvoicesApiSlice";
import {
  InvoicesRequest,
} from "redux/types/Invoices/Invoices";
import {
  ChargeType,
  ChargeTypeRequest,
} from "redux/types/Settings/Purchase/chargetype";
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
    clientId: 1,
    currencyId: 0,
    shippingLineId: 0,
    systemInvoiceId,
    bill: false,
  };
  const {
    handleSubmit: handleBasicSubmit,
    control: basicControl,
    setValue: setBasicValue,
    formState: { errors: basicErrors },
  } = useForm<InvoicesRequest, null>({
    defaultValues: defaultValues,
    resolver: editBasicInvoiceResolver,
  });

  const params = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [getInvoiceById, result] = useLazyGetSaleInvoiceByIdQuery();
  const [rowData, setRowData] = useState<ChargeTypeRequest[]>([]);
  const [editBasicInvoice, { isLoading: editLoading }] =
    useEditBasicSaleInvoiceMutation();

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
        result?.data?.businessCurrency?.currency?.currencyId
          ? result?.data?.businessCurrency?.currency?.currencyId
          : 0
      );
      setBasicValue(
        "shippingLineId",
        result?.data?.shippingLine?.shippingLineId
          ? result?.data?.shippingLine?.shippingLineId
          : 0
      );

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

  const getTitle = () => {
    return systemInvoiceId === 7
      ? "Freight Invoices"
      : systemInvoiceId === 9
      ? "Other Invoices"
      : systemInvoiceId === 6
      ? "Clearing Invoices"
      : systemInvoiceId === 8
      ? "CNC/COC Invoices"
      : "";
  };

  return (
    <div>
        <ActionBarAddEdit
          title={"Basic " + getTitle()}
          mode={"EDIT"}
          isLoading={editLoading}
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
