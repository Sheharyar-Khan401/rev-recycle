import { useForm } from "react-hook-form";
import { addInvoiceResolver } from "validators/graderValidator/Sales/invoiceResolver";
import { useEffect, useState } from "react";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import CustomInvoiceForm from "components/Sales/Invoices/CustomInvoiceForm";
import { InvoicesRequest } from "redux/types/Invoices/Invoices";
import { useAddSaleInvoiceMutation } from "redux/features/sales/saleInvoicesApiSlice";
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
    currencyId: 0,
    shippingLineId: 0,
    systemInvoiceId,
  };
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<InvoicesRequest, null>({
    defaultValues,
    resolver: addInvoiceResolver,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [addInvoice, { isLoading }] = useAddSaleInvoiceMutation();
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
    <>
      <div className="mt-3">
        <ActionBarAddEdit
          title={getTitle()}
          mode={"ADD"}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={handleSubmit(onSubmit)}
          isLoading={isLoading}
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
