import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { PurchaseInvoicesRequest } from "redux/types/Invoices/Invoices";
import { useLocation, useNavigate } from "react-router-dom";
import PurchaseInvoiceForm from "components/Purchase/Invoices/PurchaseInvoiceForm";
import { purchaseInvoiceResolver } from "validators/graderValidator/Purchase/invoiceResolver";
import { useAddInvoiceMutation } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useAppDispatch } from "redux/hooks";
import { setErrorMessage } from "redux/features/common/commonSlice";

const defaultValues: PurchaseInvoicesRequest = {
  systemInvoiceId: 1,
  purchaseOrderId: 0,
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
  // rateOnId: 0,
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
export default function AddInvoice() {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PurchaseInvoicesRequest, null>({
    defaultValues,
    resolver: purchaseInvoiceResolver,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [addInvoice, { isLoading: AddLoading }] = useAddInvoiceMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  useEffect(() => {
    if (location) {
      if (location && !location?.state?.orderId) {
        dispatch(setErrorMessage("Can not create Invoice Directly!"));
        navigate(-1);
      } else {
        setValue("purchaseOrderId", location.state.orderId);
        setValue("invoiceDate", location.state.orderDate);
        setValue("invoiceNo", location.state.invoiceNumber);
        setValue("clientId", location.state.clientId);
        setValue("invoiceTypeId", location.state.invoiceTypeId);
        setValue("currencyId", location.state.businessCurrencyId);
        setValue("referenceNumber", location.state.referenceNumber);
      }
    }
  }, [location, dispatch, navigate, setValue]);

  const onSubmit = async (values: PurchaseInvoicesRequest) => {
    const result = await addInvoice(values);
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate("/grader/purchase/invoices");
      }, 2000);
    }
  };

  return (
    <>
      <div className="mt-3">
        <ActionBarAddEdit
          title="Invoices"
          mode={"ADD"}
          isEdit={isEdit}
          isLoading={AddLoading}
          setIsEdit={setIsEdit}
          onSubmit={handleSubmit(onSubmit)}
        />
      </div>
      <div>
        <PurchaseInvoiceForm
          isEdit
          control={control}
          errors={errors}
          watch={watch}
          setValue={setValue}
          mode="ADD"
          basicInvoiceId={0}
        />
      </div>
    </>
  );
}
