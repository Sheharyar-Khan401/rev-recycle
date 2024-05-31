import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { PurchaseInvoicesRequest } from "redux/types/Invoices/Invoices";
import { useLocation, useNavigate } from "react-router-dom";
import { saleInvoiceResolver } from "validators/graderValidator/Sales/invoiceResolver";
import { useAddInvoiceMutation } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import SalesInvoiceForm from "components/Sales/Invoices/SalesInvoiceForm";
import { useAppDispatch } from "redux/hooks";
import { setErrorMessage } from "redux/features/common/commonSlice";

const defaultValues: PurchaseInvoicesRequest = {
  arrivalDate: "",
  bolDate: "",
  bolNo: 0,
  bookingNumber: "",
  branchBankAccountId: 0,
  clearingInvoiceId: 0,
  clientId: 0,
  containerNo: "",
  currencyId: 0,
  deliveryOrderInvoiceId: 0,
  destinationLocationId: 0,
  dischargePortId: 0,
  eta: "",
  etd: "",
  exRate: 1,
  freightInvoiceId: 0,
  gatePassId: 0,
  invoiceDate: "",
  invoiceId: "",
  invoiceNo: "",
  invoiceTypeId: 0,
  loadingPortId: 0,
  orderStatusId: 0,
  originLocationId: 0,
  paymentTermId: 3,
  rateDecimalPlaces: 0,
  recordProfit: false,
  referenceNumber: "",
  sealNo: "",
  shipViaId: 0,
  systemInvoiceId: 5,
  tax: 0,
  vesselNo: 0,
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
    resolver: saleInvoiceResolver,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [addInvoice, { isLoading: AddLoading }] = useAddInvoiceMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const onSubmit = async (values: PurchaseInvoicesRequest) => {
    const result = await addInvoice(values);
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate("/grader/sales/invoices");
      }, 2000);
    }
  };
  useEffect(() => {
    if (location) {
      if (location && !location?.state?.gatePassId) {
        dispatch(setErrorMessage("Can not create Invoice Directly!"));
        navigate(-1);
      } else {
        setValue("gatePassId", location.state.gatePassId);
        setValue("invoiceDate", location.state.date);
        setValue("clientId", location.state.customerId);
        setValue("invoiceTypeId", location.state.invoiceTypeId);
        setValue("containerNo", location.state.containerNo);
        setValue("referenceNumber", location.state.referenceNumber);
      }
    }
  }, [location, dispatch, navigate, setValue]);

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
        <SalesInvoiceForm
          isEdit
          control={control}
          errors={errors}
          mode="ADD"
          watch={watch}
          setValue={setValue}
          basicInvoiceId={0}
        />
      </div>
    </>
  );
}
