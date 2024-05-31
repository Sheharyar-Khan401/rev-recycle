import { useState } from "react";
import { useForm } from "react-hook-form";
import OrderForm from "components/Purchase/OrderForm/OrderForm";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { purchaseOrderResolver } from "validators/graderValidator/Purchase/orderResolver";
import {
  OrderRequest,
  listofPurchaseOrderItems,
} from "redux/types/Orders/orders";
import { useAddPurchaseOrderMutation } from "redux/features/purchase/Order/OrderApiSlice";
import { useNavigate } from "react-router-dom";

const defaultValues: OrderRequest = {
  purchaseOrderName: "",
  description: "",
  purchaseOrderDescription: "",
  referenceNumber: "",
  invoiceNumber: "",
  orderDate: "",
  businessCurrencyId: 0,
  orderStatusId: 0,
  invoiceTypeId: 0,
  clientId: 0,
};
export default function AddOrder() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<OrderRequest, null>({
    defaultValues,
    resolver: purchaseOrderResolver,
  });
  const navigate = useNavigate();
  const [purchaseOrderItems, setPurchaseOrderItems] = useState<
    listofPurchaseOrderItems[]
  >([]);
  const [addOrder, { isLoading: AddLoading }] = useAddPurchaseOrderMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onSubmit = async (values: OrderRequest) => {
    const result = await addOrder({ ...values, purchaseOrderItems });

    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  return (
    <>
      <ActionBarAddEdit
        title="Purchase Orders"
        mode={"ADD"}
        isEdit={isEdit}
        isLoading={AddLoading}
        setIsEdit={setIsEdit}
        onSubmit={handleSubmit(onSubmit)}
      />
      <OrderForm
        isEdit
        watch={watch}
        setValue={setValue}
        control={control}
        errors={errors}
        rowData={purchaseOrderItems}
        setRowData={setPurchaseOrderItems}
      />
    </>
  );
}
