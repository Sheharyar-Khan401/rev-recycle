import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { editBillInvoiceResolver } from "validators/graderValidator/Sales/invoiceResolver";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import EditBillCustomInvoiceForm from "components/Sales/Invoices/EditBillCustomInvoiceForm";
import { useParams } from "react-router-dom";
import {
  useEditBillSaleInvoiceMutation,
  useLazyGetSaleInvoiceByIdQuery,
} from "redux/features/sales/saleInvoicesApiSlice";
import { SaleInvoicesBillRequest } from "redux/types/Invoices/Invoices";
import { getDateFromMillis } from "helper/utility";
const billDefaultValues: SaleInvoicesBillRequest = {
  invoiceId: 0,
  bill: false,
  billAgentId: 0,
  billAmount: 0,
  billCurrencyId: 0,
  billDate: "",
  billNarration: "",
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
  } = useForm<SaleInvoicesBillRequest, null>({
    defaultValues: billDefaultValues,
    resolver: editBillInvoiceResolver,
  });
  const params = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [getInvoiceById, result] = useLazyGetSaleInvoiceByIdQuery();

  const [editBillInvoice, { isLoading: editBillLoading }] =
    useEditBillSaleInvoiceMutation();
  useEffect(() => {
    const id = params.id;

    if (id) {
      getInvoiceById(id);
    }
  }, [getInvoiceById, params.id]);
  useEffect(() => {
    if (result?.data) {
      setBillValue("billAmount", result?.data?.billAmount??0);
      setBillValue("billAgentId", result?.data?.billAgentId??0);
      setBillValue(
        "billCurrencyId",
        result?.data?.billCurrency?.businesscurrencyId??0
      );
      setBillValue("billNarration", result?.data?.billNarration??"");
      setBillValue("bill", result?.data?.bill ? result?.data?.bill : false);
      setBillValue(
        "billDate",
        result?.data?.billDate
          ? getDateFromMillis(result?.data?.billDate)
          : ""
      );
    }
  }, [result?.data, setBillValue]);

  const onSubmitBill = async (values: SaleInvoicesBillRequest) => {
    values.invoiceId = params?.id ? +params?.id : 0;
    const result = await editBillInvoice(values);

    if ("data" in result && result.data.status === "SUCCESS") {
      setIsEdit(false);
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
          title={"Bill " + getTitle()}
          mode={"EDIT"}
          isLoading={editBillLoading}
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
