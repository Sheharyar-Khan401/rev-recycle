import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import SaleOrderForm from "components/Sales/SaleOrderForm/SaleOrderForm";
import { saleOrderBasicResolver } from "validators/graderValidator/Sales/orderResolver";
import { SaleOrderRequest } from "redux/types/Orders/saleOrders";
import { useNavigate } from "react-router-dom";
import { useAddSaleOrderMutation } from "redux/features/sales/Orders/saleOrdersApiSlice";
import { useState } from "react";

const defaultValues: SaleOrderRequest = {
  saleOrderId: 0,
  orderDate: "",
  description: "",
  eta: "",
  maxShipmentWeight: 0,
  maxweightUnitId: 0,
  weightDifference: 0,
  reference: "",
  showinDP: false,
  proPriority: 1,
  ps: 0,
  running: false,
  finalized: false,
  arrivalTo: "",
  arrivalFrom: "",
  quantity: 0,
  orderStatusId: 0,
  invoiceTypeId: 0,
  production: true,
  stockroomId: 0,
  brandId: 0,
  saleOrderTemplateId: 0,
  clientId: 0,
  weightDiff: 0,
  businessCurrencyId: 0,
};
export default function AddSaleOrder() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SaleOrderRequest, null>({
    defaultValues,
    resolver: saleOrderBasicResolver,
  });
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [addOrder, { isLoading: AddLoading }] = useAddSaleOrderMutation();
  const onSubmit = async (values: SaleOrderRequest) => {
    const result = await addOrder(values);
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  return (
    <>
      <div className="mt-3" style={{ overflow: "hidden" }}>
        <ActionBarAddEdit
          title="Orders"
          mode={"ADD"}
          isLoading={AddLoading}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={handleSubmit(onSubmit)}
        />

        <div>
          <SaleOrderForm
            mode={"ADD"}
            isEdit
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        </div>
      </div>
    </>
  );
}
