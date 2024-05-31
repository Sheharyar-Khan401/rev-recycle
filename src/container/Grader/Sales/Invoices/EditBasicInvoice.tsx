import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { PurchaseInvoicesRequest } from "redux/types/Invoices/Invoices";
import { saleInvoiceResolver } from "validators/graderValidator/Sales/invoiceResolver";
import {
  useEditInvoiceMutation,
  useLazyGetInvoiceByIdQuery,
  useUpdateInvoicePostStatusMutation,
} from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import SalesInvoiceForm from "components/Sales/Invoices/SalesInvoiceForm";
import { getDateFromMillis } from "helper/utility";
import CustomButton from "shared/Components/CustomButton";
const defaultValues: PurchaseInvoicesRequest = {
  bolDate: "",
  bolNo: 0,
  bookingNumber: "",
  branchBankAccountId: 0,
  brandName: "",
  clearingInvoiceId: 0,
  clientId: 0,
  cncInvoiceId: 0,
  containerNo: "",
  currencyId: 0,
  description: "",
  destinationLocationId: 0,
  dischargePortId: 0,
  discount: 0,
  eta: "",
  etd: "",
  exRate: 1,
  freightInvoiceId: 0,
  invoiceDate: "",
  invoiceId: "",
  invoiceNo: "",
  invoiceTypeId: 0,
  loadingPortId: 0,
  orderStatusId: 0,
  originLocationId: 0,
  otherInvoiceId: 0,
  paymentTermId: 3,
  rateDecimalPlaces: 0,
  recordProfit: false,
  referenceNumber: "",
  sealNo: "",
  shipViaId: 0,
  systemInvoiceId: 5,
  tax: 0,
  vesselNo: 0,
  basicInvoiceId: 0,
  gatePassAlert: false,
  limitAlert: false,
};
export default function EditBasicInvoice() {
  const navigate = useNavigate();
  const params = useParams();
  const [getInvoiceById, result] = useLazyGetInvoiceByIdQuery();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<PurchaseInvoicesRequest, null>({
    defaultValues,
    resolver: saleInvoiceResolver,
  });
  const [editBasicInvoice, { isLoading: BasicLoading }] =
    useEditInvoiceMutation();
  const [updatePostStatus, { isLoading: PostLoading }] =
    useUpdateInvoicePostStatusMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    const id = params.id;
    if (id) {
      getInvoiceById(+id);
    }
  }, [getInvoiceById, params.id]);

  useEffect(() => {
    if (result?.data) {
      reset({
        systemInvoiceId: 5,
        freightInvoiceId: result.data.freightInvoiceId,
        clearingInvoiceId: result.data.clearingInvoiceId,
        cncInvoiceId: result.data.cncInvoiceId,
        otherInvoiceId: result.data.otherInvoiceId,
        invoiceDate: result?.data?.invoiceDate
          ? getDateFromMillis(result?.data?.invoiceDate)
          : "",
        eta: result?.data?.eta ? getDateFromMillis(result?.data?.eta) : "",
        etd: result?.data?.etd ? getDateFromMillis(result?.data?.etd) : "",
        sealNo: result?.data?.sealNo ?? "",
        invoiceNo: result.data.invoiceNo ?? "",
        paymentTermId: result.data?.paymentTermId,
        bookingNumber: result.data.bookingNumber ?? "",
        referenceNumber: result.data.referenceNumber ?? "",
        clientId: result.data?.client ? result?.data?.client?.clientId : 0,
        invoiceTypeId: result.data?.invoiceType?.invoiceTypeId??0,
        currencyId: result.data?.businessCurrency?.businesscurrencyId,
        exRate: result.data.exRate ?? "0",
        originLocationId: result.data.origin?.locationId,
        destinationLocationId: result.data?.destination?.locationId,
        loadingPortId: result.data?.loading?.portId,
        dischargePortId: result.data?.discharge?.portId,
        orderStatusId: result.data?.orderStatusId,
        shipViaId: result.data?.shipViaId,
        bolNo: result.data?.bolNo,
        bolDate: result?.data?.bolDate
          ? getDateFromMillis(result?.data?.bolDate)
          : "",
        vesselNo: result.data?.vesselNo ?? 0,
        containerNo: result.data?.containerNo ?? "",
        recordProfit: result.data?.recordProfit,
        description: result.data?.description ?? "",
        tax: result.data.tax ?? 0,
        discount: result.data?.discount ?? 0,
        rateDecimalPlaces: result.data?.rateDecimalPlaces,
        branchBankAccountId:
          result.data?.branchBankAccount?.branchBankAccountId,
        brandName: "",
      });
    }
  }, [result?.data, reset]);
  const onSubmitBasic = async (values: PurchaseInvoicesRequest) => {
    const result = await editBasicInvoice({ invoiceId: params.id, ...values });

    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate("/grader/sales/invoices");
      }, 2000);
    }
  };
  return (
    <div>
      <ActionBarAddEdit
        title="Basic Invoices"
        mode={result?.data?.posted ? "" : "EDIT"}
        isLoading={BasicLoading}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onSubmit={handleSubmit(onSubmitBasic)}
      >
        {!result?.data?.posted ? (
          <CustomButton
            size="sm"
            type="hollow"
            className="mx-2"
            onClick={() =>
              updatePostStatus({
                invoiceId: params?.id,
                posted: true,
              })
            }
            disabled={PostLoading}
            title={PostLoading ? "Posting..." : "Post"}
          />
        ) : (
          <CustomButton
            size="sm"
            type="hollow"
            className="mx-2"
            onClick={() =>
              updatePostStatus({
                invoiceId: params?.id,
                posted: false,
              })
            }
            disabled={PostLoading}
            title={PostLoading ? "Unposting..." : "Unpost"}
          />
        )}
      </ActionBarAddEdit>
      <SalesInvoiceForm
        mode="EDIT"
        watch={watch}
        isEdit={isEdit}
        control={control}
        errors={errors}
        basicInvoiceId={params.id ? +params.id : 0}
        result={result?.data && result?.data}
      />
    </div>
  );
}
