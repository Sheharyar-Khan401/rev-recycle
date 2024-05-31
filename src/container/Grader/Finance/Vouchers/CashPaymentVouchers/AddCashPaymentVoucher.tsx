import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { bankReceiptVoucherResolver } from "validators/graderValidator/Finance/bankReceiptVoucherResolver";
import {
  VoucherRequest,
  listOfVoucherRequest,
} from "redux/types/Finance/PrimaryData/bankreceiptvoucher";
import { useGetBusinessCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { useGetAllCostGroupQuery } from "redux/features/finance/primarydata/costgroupApiSlice";
import { useGetCashAccountQuery } from "redux/features/finance/primarydata/cashaccountApiSlice";
import { useGetAllAccountsQuery } from "redux/features/finance/primarydata/accountApiSlice";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { CostGroup } from "redux/types/Finance/PrimaryData/costgroup";
import { CashAccount } from "redux/types/Finance/PrimaryData/cashaccount";
import { Account } from "redux/types/Finance/PrimaryData/account";
import { useNavigate } from "react-router-dom";
import { useAddVoucherMutation } from "redux/features/finance/primarydata/bankreceiptvoucherApiSlice";
import CashPaymentVoucherForm from "components/Finance/CashPaymentVoucherForm/CashPaymentVoucherForm";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import Loader from "shared/Components/Loader/Loader";
import { useGetOrderStatusQuery } from "redux/features/purchase/Order/OrderStatusApiSlice";
import { OrderStatus } from "redux/types/common/orderStatus";
const defaultValues: VoucherRequest = {
  vochrd: "",
  voucherId: 0,
  particulars: "",
  voucherStatusId: 0,
  currencyId: 0,
  voucherExchangeRate: 1,
  voucherTypeId: 1,
};
export default function AddCashPaymentVoucher() {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VoucherRequest, null>({
    defaultValues,
    resolver: bankReceiptVoucherResolver,
  });

  const [isEdit, setIsEdit] = useState<boolean>(true);
  const navigate = useNavigate();

  const { data: getCostGroup } = useGetAllCostGroupQuery(null);
  const { data: getAccount } = useGetAllAccountsQuery(null);
  const [costGroupData, setCostGroupData] = useState<CostGroup[]>([]);
  const { data: getBusinessCurrency, isLoading: accountsLoading } =
    useGetBusinessCurrrencyQuery(null);
  const { data: getCashAccount, isLoading: cashAccountLoading } =
    useGetCashAccountQuery(null);
  const { data: getOrderStatus, isLoading: getOrderStatusLoading } =
    useGetOrderStatusQuery(null);
  const [currencyData, setCurrencyData] = useState<BusinessCurrency[]>([]);
  const [cashData, setCashData] = useState<CashAccount[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<OrderStatus[]>([]);
  const [rowData, setRowData] = useState<listOfVoucherRequest[]>([]);
  const [addVoucher, { isLoading: AddLoading }] = useAddVoucherMutation();

  const columns: column<"voucherAccountId", listOfVoucherRequest>[] = [
    {
      label: "Account",
      field: "accountId",
      sort: false,
      inputType: "select",
      options: getAccount?.length
        ? getAccount?.map((item: Account) => {
            return {
              text: item?.accountTitle ? item?.accountTitle : "",
              value: item?.accountId ? item?.accountId : 0,
            };
          })
        : [],
    },
    {
      label: "Narration",
      field: "narration",
      inputType: "text",
      sort: false,
    },
    {
      label: "Debit",
      field: "debit",
      inputType: "number",
      sort: false,
    },
    {
      label: "Cost Group",
      field: "costGroupId",
      sort: false,
      inputType: "select",
      options: costGroupData?.length
        ? costGroupData?.map((item: CostGroup) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.costGroupId ? item?.costGroupId : 0,
            };
          })
        : [],
    },
  ];
  const onSubmit = async (values: VoucherRequest) => {
    const newObj = rowData.map((item) => ({
      ...item, // Spread the properties of the original object
      credit: typeof item.credit === "string" ? +item.credit : item.credit, // Convert "credit" to a number using parseInt()
    }));
    const updated = { ...values, listOfVoucher: newObj };
    const result = await addVoucher(updated);
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  useEffect(() => {
    if (getBusinessCurrency && getBusinessCurrency?.length > 0) {
      setCurrencyData(
        getBusinessCurrency?.map((item: BusinessCurrency) => {
          return {
            currencyName: item.currency?.name,
            businesscurrencyId: item?.businesscurrencyId,
            currencyId: item?.currency?.currencyId,
          };
        })
      );
      setValue("currencyId", getBusinessCurrency[0]?.businesscurrencyId ?? 0);
    }
  }, [getBusinessCurrency]);

  useEffect(() => {
    if (getOrderStatus && getOrderStatus?.length > 0) {
      setOrderStatusData(
        getOrderStatus?.map((item: OrderStatus) => {
          return {
            orderStatusId: item?.orderStatusId,
            name: item?.name,
          };
        })
      );
      setValue(
        "voucherStatusId",
        getOrderStatus && getOrderStatus?.length > 0
          ? getOrderStatus[0]?.orderStatusId
          : 0
      );
    }
  }, [getOrderStatus]);

  useEffect(() => {
    if (getCashAccount && getCashAccount?.length > 0) {
      setCashData(
        getCashAccount?.map((item: CashAccount) => {
          return {
            cashAccountId: item?.cashAccountId,
            accountTitle: item?.cashAccountTitle,
          };
        })
      );
    }
  }, [getCashAccount]);

  useEffect(() => {
    if (getCostGroup && getCostGroup?.length > 0) {
      setCostGroupData(
        getCostGroup?.map((item: CostGroup) => {
          return {
            costGroupId: item?.costGroupId,
            name: item?.name,
          };
        })
      );
    }
  }, [getCostGroup]);

  return (
    <>
      <ActionBarAddEdit
        title="Cash Payment Vouchers"
        mode={"ADD"}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={AddLoading}
      />
      {accountsLoading || cashAccountLoading ? (
        <div style={{ margin: "5rem" }}>
          <Loader />
        </div>
      ) : (
        <>
          <CashPaymentVoucherForm
            mode={"ADD"}
            isEdit={isEdit}
            setValue={setValue}
            control={control}
            errors={errors}
            currencyData={currencyData}
            cashData={cashData}
            orderStatusData={orderStatusData}
          />
          <EditableDataTable
            identifier="voucherAccountId"
            addText="Add Cash Payment Voucher"
            columns={columns}
            rows={rowData}
            showSerialNumbers
            setRows={setRowData}
            isLoading={false}
            defaultEditable={isEdit}
          />
        </>
      )}
    </>
  );
}
