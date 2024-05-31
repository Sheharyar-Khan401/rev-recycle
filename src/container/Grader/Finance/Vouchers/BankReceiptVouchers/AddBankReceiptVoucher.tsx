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
import CashPaymentVoucherForm from "components/Finance/CashPaymentVoucherForm/CashPaymentVoucherForm";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { useAddVoucherMutation } from "redux/features/finance/primarydata/bankreceiptvoucherApiSlice";
import { useGetOrderStatusQuery } from "redux/features/purchase/Order/OrderStatusApiSlice";
import { OrderStatus } from "redux/types/common/orderStatus";
const defaultValues: VoucherRequest = {
  vochrd: "",
  voucherId: 0,
  particulars: "",
  voucherStatusId: 0,
  currencyId: 0,
  voucherExchangeRate: 1,
  voucherTypeId: 3,
};
export default function AddBankReceiptVoucher() {
  const {
    handleSubmit,
    control,
    setValue,
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
  const { data: getBusinessCurrency } = useGetBusinessCurrrencyQuery(null);
  const { data: getOrderStatus, isLoading: getOrderStatusLoading } =
    useGetOrderStatusQuery(null);
  const { data: getCashAccount } = useGetCashAccountQuery(null);
  const [currencyData, setCurrencyData] = useState<BusinessCurrency[]>([]);
  const [cashData, setCashData] = useState<CashAccount[]>([]);
  const [rowData, setRowData] = useState<listOfVoucherRequest[]>([]);
  const [addVoucher, { isLoading: AddLoading }] = useAddVoucherMutation();
  const [orderStatusData, setOrderStatusData] = useState<OrderStatus[]>([]);

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
      label: "Credit",
      field: "credit",
      inputType: "number",
      sort: false,
    },
    {
      label: "Chq. No.",
      field: "chqNo",
      inputType: "text",
      sort: false,
    },
    {
      label: "Chq. Date",
      field: "chqDate",
      inputType: "date",
      sort: false,
    },
    {
      label: "Chq. Cl. Date",
      field: "chqClearanceDate",
      inputType: "date",
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

  return (
    <>
      <ActionBarAddEdit
        title="Bank Receipt Vouchers"
        mode={"ADD"}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={AddLoading}
      />
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
        addText="Add Bank Receipt Voucher"
        columns={columns}
        rows={rowData}
        showSerialNumbers
        setRows={setRowData}
        isLoading={false}
        defaultEditable={isEdit}
      />
    </>
  );
}
