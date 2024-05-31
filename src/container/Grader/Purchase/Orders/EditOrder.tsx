import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OrderForm from "components/Purchase/OrderForm/OrderForm";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import {
  OrderRequest,
  listofPurchaseOrderItems,
  PurchaseOrderItemsData,
} from "redux/types/Orders/orders";
import {
  useAddPurchaseOrderMutation,
  useLazyGetByIdPurchaseOrderQuery,
} from "redux/features/purchase/Order/OrderApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { purchaseOrderResolver } from "validators/graderValidator/Purchase/orderResolver";
import Loader from "shared/Components/Loader/Loader";
import { getDateFromMillis, roundValue } from "helper/utility";
import CustomButton from "shared/Components/CustomButton";

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
export default function EditOrder() {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    setValue,
    reset,
  } = useForm<OrderRequest, null>({
    defaultValues,
    resolver: purchaseOrderResolver,
  });
  const params = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [rowData, setRowData] = useState<listofPurchaseOrderItems[]>([]);
  const [editOrder, { isLoading: AddLoading }] = useAddPurchaseOrderMutation();
  const [getOrderById, result] = useLazyGetByIdPurchaseOrderQuery();

  useEffect(() => {
    const id = params.id;

    if (id) {
      getOrderById(id);
    }
  }, [params.id, getOrderById]);

  useEffect(() => {
    if (result?.data) {
      reset({
        orderDate: result?.data?.orderDate
          ? getDateFromMillis(result?.data?.orderDate)
          : "",
        purchaseOrderId: result?.data?.purchaseOrderId
          ? result?.data?.purchaseOrderId
          : 0,
        invoiceNumber: result?.data?.invoiceNumber
          ? result?.data?.invoiceNumber
          : "",
        clientId: result?.data?.client?.clientId
          ? result?.data?.client?.clientId
          : 0,
        invoiceTypeId: result?.data?.invoiceType
          ? result?.data?.invoiceType?.invoiceTypeId
          : 0,
        businessCurrencyId: result?.data?.currency?.businesscurrencyId
          ? result?.data?.currency?.businesscurrencyId
          : 0,
        referenceNumber: result?.data?.referenceNumber
          ? result?.data?.referenceNumber
          : "",
        orderStatusId: result?.data?.orderStatus?.orderStatusId
          ? result?.data?.orderStatus?.orderStatusId
          : 0,
        description: result?.data?.description ? result?.data?.description : "",
      });

      setRowData(
        result?.data?.listofPurchaseOrderItems
          ? result?.data?.listofPurchaseOrderItems?.map(
              (item: PurchaseOrderItemsData) => {
                return {
                  itemId: item?.item ? item?.item?.itemId : 0,
                  purchaseOrderItemId: item?.purchaseOrderItemId
                    ? item?.purchaseOrderItemId
                    : 0,
                  quantity: item?.quantity ? item?.quantity : 0,
                  unitWeight: item?.unitWeight
                    ? roundValue(item?.unitWeight)
                    : 0,
                  unitKg: item?.unitKg ? roundValue(item?.unitKg) : 0,
                  weightKg: item?.weightKg ? roundValue(item?.weightKg) : 0,
                  weightLbs: item?.weightLbs ? roundValue(item?.weightLbs) : 0,
                  amount: item?.amount ? roundValue(item?.amount) : 0,
                  rate: item?.rate ? roundValue(item?.rate) : 0,
                  quantityUnitId: item?.quantityUnit
                    ? item?.quantityUnit?.quantityUnitId
                    : 0,
                  rateOnId: item?.rateOn ? item?.rateOn?.rateOnId : 0,
                  weightUnitId: item?.weightUnit
                    ? item?.weightUnit?.weightUnitId
                    : 0,
                };
              }
            )
          : []
      );
    }
  }, [result, setValue]);
  const onSubmit = async (values: OrderRequest) => {
    const purchaseOrderItems = rowData;
    const result = await editOrder({ ...values, purchaseOrderItems });

    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  return (
    <>
      {result?.isLoading ? (
        <div style={{ margin: "5rem" }}>
          <Loader />
        </div>
      ) : (
        <>
          <ActionBarAddEdit
            title="Purchase Orders"
            mode={result?.data?.invoiceId ? "" : "EDIT"}
            isEdit={isEdit}
            isLoading={AddLoading}
            setIsEdit={setIsEdit}
            onSubmit={handleSubmit(onSubmit)}
          >
            {result?.data?.invoiceId === 0 ? (
              <CustomButton
                size="sm"
                type="hollow"
                className="mb-2"
                onClick={() =>
                  navigate(`/grader/purchase/invoices/add`, {
                    state: {
                      orderId: params.id,
                      orderDate: getValues("orderDate"),
                      invoiceNumber: getValues("invoiceNumber"),
                      clientId: getValues("clientId"),
                      invoiceTypeId: getValues("invoiceTypeId"),
                      businessCurrencyId: getValues("businessCurrencyId"),
                      referenceNumber: getValues("referenceNumber"),
                    },
                  })
                }
                title="Convert to Invoice"
              />
            ) : (
              <></>
            )}
          </ActionBarAddEdit>
          <OrderForm
            isEdit={isEdit}
            control={control}
            errors={errors}
            rowData={rowData}
            setRowData={setRowData}
          />
        </>
      )}
    </>
  );
}
