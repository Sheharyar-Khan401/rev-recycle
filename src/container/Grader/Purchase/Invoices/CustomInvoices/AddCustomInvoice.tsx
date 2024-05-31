import { useForm } from "react-hook-form";
import { customInvoiceResolver } from "validators/graderValidator/Purchase/invoiceResolver";
import { useEffect, useState } from "react";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import CustomInvoiceForm from "components/Purchase/Invoices/CustomInvoiceForm";
import { InvoicesRequest } from "redux/types/Invoices/Invoices";
import { useAddPurchaseInvoiceMutation } from "redux/features/purchase/Invoices/InvoicesApiSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddCustomInvoice({
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
    bill: false,
    clientId: 0,
    currencyId: 0,
    systemInvoiceId,
    basicInvoiceId: 0,
  };
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<InvoicesRequest, null>({
    defaultValues,
    resolver: customInvoiceResolver,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const [addInvoice, { isLoading: AddLoading }] =
    useAddPurchaseInvoiceMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    if (location) {
      
      if (location && location?.state?.basicInvoiceId) {
        setValue("basicInvoiceId", location?.state.basicInvoiceId);
        setValue("currencyId", location?.state.currencyId ?? 0);
        setValue("containerNo", location?.state.containerNo ?? "");
        setValue("invoiceNo", location?.state.invoiceNo ?? "");
      }
    }
  }, [location]);

  const onSubmit = async (values: InvoicesRequest) => {
    const result = await addInvoice(values);

    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  const getTitle = () => {
    return systemInvoiceId === 2
      ? "Freight Invoices"
      : systemInvoiceId === 3
      ? "Clearing Invoices"
      : systemInvoiceId === 4
      ? "Delivery Order Invoices"
      : "";
  };

  return (
    <>
      <div className="mt-3">
        <ActionBarAddEdit
          title={getTitle()}
          mode={"ADD"}
          isEdit={isEdit}
          isLoading={AddLoading}
          setIsEdit={setIsEdit}
          onSubmit={handleSubmit(onSubmit)}
        />
      </div>
      <div>
        <CustomInvoiceForm
          mode={"ADD"}
          isEdit
          control={control}
          errors={errors}
        />
      </div>
    </>
  );
}
