import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import PurchaseInvoiceForm from "components/Purchase/Invoices/PurchaseInvoiceForm";
import { PurchaseInvoicesRequest } from "redux/types/Invoices/Invoices";
import { purchaseInvoiceResolver } from "validators/graderValidator/Purchase/invoiceResolver";
import {
  useEditInvoiceMutation,
  useLazyConvertToGatePassQuery,
  useLazyGetInvoiceByIdQuery,
  useUpdateInvoicePostStatusMutation,
} from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "shared/Components/Loader/Loader";
import { getDateFromMillis } from "helper/utility";
import { useAppDispatch } from "redux/hooks";
import CustomButton from "shared/Components/CustomButton";
const defaultValues: PurchaseInvoicesRequest = {
  systemInvoiceId: 1,
  freightInvoiceId: 0,
  clearingInvoiceId: 0,
  deliveryOrderInvoiceId: 0,
  invoiceDate: "",
  invoiceNo: "",
  paymentTermId: 3,
  bookingNumber: "",
  arrivalDate: "",
  referenceNumber: "",
  clientId: 0,
  invoiceTypeId: 0,
  currencyId: 0,
  exRate: 1,
  rateOnId: 0,
  originLocationId: 0,
  destinationLocationId: 0,
  loadingPortId: 0,
  dischargePortId: 0,
  orderStatusId: 0,
  shipViaId: 0,
  bolNo: 0,
  bolDate: "",
  expectedOffLoading: "",
  vesselNo: 0,
  shippingLineId: 0,
  containerNo: "",
  stockroomId: 0,
  crossTrade: false,
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
    resolver: purchaseInvoiceResolver,
  });
  const [editBasicInvoice, { isLoading: BasicLoading }] =
    useEditInvoiceMutation();
  const [updatePostStatus, { isLoading: PostLoading }] =
    useUpdateInvoicePostStatusMutation();
  const [
    convertToGatePass,
    { isLoading: convertToGatePassLoading, data: convertedGatePass },
  ] = useLazyConvertToGatePassQuery();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    const id = params.id;
    if (id) {
      getInvoiceById(+id);
    }
  }, [params.id, getInvoiceById]);

  useEffect(() => {
    if (convertedGatePass?.gatePassId)
      navigate(
        "/grader/purchase/gatepasses/edit/" + convertedGatePass.gatePassId
      );
  }, [convertedGatePass, navigate]);

  const handleConvertToGatePass = () => {
    const id = params.id;
    if (id) {
      convertToGatePass(+id);
    }
  };
  useEffect(() => {
    if (result?.data) {
      reset({
        systemInvoiceId: 1,
        freightInvoiceId: result?.data?.freightInvoiceId ?? 0,
        clearingInvoiceId: result?.data?.clearingInvoiceId ?? 0,
        deliveryOrderInvoiceId: result.data?.deliveryOrderInvoiceId ?? 0,
        invoiceDate: result?.data?.invoiceDate
          ? getDateFromMillis(result?.data?.invoiceDate)
          : "",
        invoiceNo: result?.data?.invoiceNo ?? "",
        paymentTermId: result?.data?.paymentTermId ?? 0,
        bookingNumber: result?.data?.bookingNumber ?? "",
        arrivalDate: result?.data?.arrivalDate
          ? getDateFromMillis(result.data?.arrivalDate)
          : "",
        referenceNumber: result?.data?.referenceNumber ?? "",
        clientId: result.data?.client?.clientId ?? 0,
        invoiceTypeId: result.data?.invoiceType?.invoiceTypeId ?? 0,
        currencyId: result.data?.businessCurrency?.businesscurrencyId ?? 0,
        exRate: result?.data?.exRate ?? 0,
        rateOnId: result.data?.rateOnId ?? 0,
        originLocationId: result.data?.origin?.locationId ?? 0,
        destinationLocationId: result.data?.destination?.locationId ?? 0,
        loadingPortId: result.data?.loading?.portId ?? 0,
        dischargePortId: result.data?.discharge?.portId ?? 0,
        orderStatusId: result.data?.orderStatusId ?? 0,
        shipViaId: result.data?.shipViaId ?? 0,
        bolNo: result.data?.bolNo ?? 0,
        bolDate: result?.data?.bolDate
          ? getDateFromMillis(result?.data?.bolDate)
          : "",
        expectedOffLoading: result?.data?.expectedOffLoading
          ? getDateFromMillis(result?.data?.expectedOffLoading)
          : "",
        vesselNo: result.data?.vesselNo ? result.data?.vesselNo : 0,
        shippingLineId: result.data?.shippingLine?.shippingLineId ?? 0,
        containerNo: result?.data?.containerNo ?? "",
        stockroomId: result?.data?.stockroomId ?? 0,
        crossTrade: result.data?.crossTrade,
        gatePassAlert: result.data?.gatePassAlert,
        limitAlert: result.data?.limitAlert,
      });
    }
  }, [result?.data, reset]);
  const onSubmitBasic = async (values: PurchaseInvoicesRequest) => {
    const result = await editBasicInvoice({ invoiceId: params.id, ...values });

    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate("/grader/purchase/invoices");
      }, 2000);
    }
  };

  return (
    <div>
      {result?.isLoading ? (
        <div style={{ margin: "5rem" }}>
          <Loader />
        </div>
      ) : (
        <>
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
                className="mb-2"
                onClick={handleSubmit(() => {
                  updatePostStatus({
                    invoiceId: params?.id,
                    posted: true,
                  });
                })}
                disabled={PostLoading}
                title={PostLoading ? "Posting..." : "Post"}
              />
            ) : result?.data?.gatePassId ? (
              <></>
            ) : (
              <div className="d-flex">
                <CustomButton
                  size="sm"
                  type="hollow"
                  className="mb-2 mx-2"
                  onClick={() =>
                    updatePostStatus({ invoiceId: params?.id, posted: false })
                  }
                  disabled={PostLoading}
                  title={PostLoading ? "Unpostig..." : "Unpost"}
                />
                <CustomButton
                  size="sm"
                  type="hollow"
                  className="mb-2 mx-2"
                  onClick={handleConvertToGatePass}
                  disabled={convertToGatePassLoading}
                  title={
                    convertToGatePassLoading
                      ? "Converting..."
                      : "Convert to Gate Pass"
                  }
                />
              </div>
            )}
          </ActionBarAddEdit>
          <PurchaseInvoiceForm
            mode="EDIT"
            watch={watch}
            isEdit={isEdit}
            control={control}
            errors={errors}
            basicInvoiceId={params.id ? +params?.id : 0}
            result={result?.data && result?.data}
          />
        </>
      )}
    </div>
  );
}
