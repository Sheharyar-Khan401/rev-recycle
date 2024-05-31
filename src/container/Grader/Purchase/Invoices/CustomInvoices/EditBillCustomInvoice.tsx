import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { editBillCustomInvoiceResolver } from "validators/graderValidator/Purchase/invoiceResolver";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import EditBillCustomInvoiceForm from "components/Purchase/Invoices/EditBillCustomInvoiceForm";
import { PurchaseInvoicesBillRequest } from "redux/types/Invoices/Invoices";
import {
  useEditBillPurchaseInvoiceMutation,
  useLazyGetByIdPurchaseInvoiceQuery,
} from "redux/features/purchase/Invoices/InvoicesApiSlice";
import { useParams } from "react-router-dom";
import { getDateFromMillis } from "helper/utility";

const billDefaultValues: PurchaseInvoicesBillRequest = {
  invoiceId: 0,
  bill: false,
  billNarration: "",
  billDate: "",
  billAmount: 0,
  billAgentId: 0,
  billAgentId2: 0,
  billAgentId3: 0,
  billAmount2: 0,
  billAmount3: 0,
  billCurrencyId: 0,
};

export default function EditBillCustomInvoice({
  systemInvoiceId,
}: {
  systemInvoiceId: number;
}) {
  const {
    handleSubmit: handleBillSubmit,
    control: billControl,
    setValue: setBillValue,
    watch,
    formState: { errors: billErrors },
  } = useForm<PurchaseInvoicesBillRequest, null>({
    defaultValues: billDefaultValues,
    resolver: editBillCustomInvoiceResolver,
  });
  const params = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [getInvoiceById, result] = useLazyGetByIdPurchaseInvoiceQuery();

  const [editBillInvoice, { isLoading: BillLoading }] =
    useEditBillPurchaseInvoiceMutation();

  useEffect(() => {
    const id = params.id;

    if (id) {
      getInvoiceById(id);
    }
  }, [getInvoiceById, params.id]);

  useEffect(() => {
    if (result?.data) {
      setBillValue("billAmount", result?.data?.billAmount ?? 0);
      setBillValue("billAmount2", result?.data?.billAmount3 ?? 0);
      setBillValue("billAmount3", result?.data?.billAmount3 ?? 0);
      setBillValue("billAgentId", result?.data?.agent1?.clientId ?? 0);
      setBillValue("billAgentId2", result?.data?.agent2?.clientId ?? 0);
      setBillValue("billAgentId3", result?.data?.agent3?.clientId ?? 0);
      setBillValue(
        "billCurrencyId",
        result?.data?.businessCurrency?.businesscurrencyId ?? 0
      );
      setBillValue("billNarration", result?.data?.billNarration ?? "");

      setBillValue("bill", result?.data?.bill ? result?.data?.bill : false);
      setBillValue(
        "billDate",
        result?.data?.billDate ? getDateFromMillis(result?.data?.billDate) : ""
      );
    }
  }, [result?.data, setBillValue]);

  const onSubmitBill = async (values: PurchaseInvoicesBillRequest) => {
    values.invoiceId = params?.id ? +params?.id : 0;
    const result = await editBillInvoice(values);

    if ("data" in result && result.data.status === "SUCCESS") {
      setIsEdit(false);
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
    <div>
      <ActionBarAddEdit
        title={"Bill " + getTitle()}
        mode={!result.data?.posted && !result.isLoading ? "EDIT" : ""}
        isLoading={BillLoading}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onSubmit={handleBillSubmit(onSubmitBill)}
      />
      <EditBillCustomInvoiceForm
        isEdit={isEdit}
        control={billControl}
        errors={billErrors}
        watch={watch}
      />
    </div>
  );
}
